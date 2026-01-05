import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || 'general'

    const supabase = await createClient()

    // スレッドを取得
    const { data: threads, error } = await supabase
      .from('threads')
      .select(`
        *,
        profiles(nickname)
      `)
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error

    // 各スレッドのコメント数を取得
    const threadsWithCount = await Promise.all(
      (threads || []).map(async (thread) => {
        const { count, error: countError } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('thread_id', thread.id)

        if (countError) {
          console.error('Error counting comments:', countError)
        }

        return {
          ...thread,
          comments_count: count || 0,
        }
      })
    )

    return NextResponse.json(threadsWithCount)
  } catch (error) {
    console.error('Error fetching threads:', error)
    return NextResponse.json(
      { error: 'スレッドの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()
    const { title, content, category } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'タイトルと内容は必須です' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('threads')
      .insert({
        title,
        content,
        category: category || 'general',
        author_id: session.profileId,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating thread:', error)
    return NextResponse.json(
      { error: 'スレッドの作成に失敗しました' },
      { status: 500 }
    )
  }
}

