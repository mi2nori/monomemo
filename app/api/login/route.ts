import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { playerId } = await request.json()

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player IDが必要です' },
        { status: 400 }
      )
    }

    // 外部APIを呼び出してnicknameを取得
    let nickname: string
    try {
      const apiResponse = await fetch('https://ks-giftcode.centurygame.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player_id: playerId }),
      })

      const apiData = await apiResponse.json()

      // APIのレスポンス構造を確認してnicknameを取得
      // 複数の可能性のあるフィールド名をチェック
      nickname = apiData.nickname || apiData.name || apiData.player_name || apiData.data?.nickname || apiData.data?.name

      if (!nickname) {
        // APIのレスポンス構造が異なる可能性があるため、デバッグ情報をログに出力
        console.error('API response structure:', JSON.stringify(apiData, null, 2))
        console.error('API response status:', apiResponse.status)
        return NextResponse.json(
          { error: 'ニックネームを取得できませんでした。Player IDが正しいか確認してください。' },
          { status: 401 }
        )
      }
    } catch (apiError) {
      console.error('External API error:', apiError)
      return NextResponse.json(
        { error: '外部APIへの接続に失敗しました。しばらく待ってから再度お試しください。' },
        { status: 500 }
      )
    }

    // Supabaseにプロフィールを保存または更新
    const supabase = await createClient()

    // プロフィールを検索または作成
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, nickname')
      .eq('player_id', playerId)
      .single()

    let profileId: string

    if (existingProfile) {
      // 既存のプロフィールを更新
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({ nickname })
        .eq('player_id', playerId)
        .select('id')
        .single()

      if (updateError) throw updateError
      profileId = updatedProfile.id
    } else {
      // 新しいプロフィールを作成
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({ player_id: playerId, nickname })
        .select('id')
        .single()

      if (insertError) throw insertError
      profileId = newProfile.id
    }

    // セッション管理のため、カスタムセッションを作成
    // SupabaseのAuthを使わず、Cookieベースの簡易認証を使用
    const response = NextResponse.json({
      success: true,
      nickname,
      profileId,
    })

    // セッション情報をCookieに保存
    response.cookies.set('player_id', playerId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7日間
    })
    response.cookies.set('nickname', nickname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })
    response.cookies.set('profile_id', profileId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'ログイン処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

