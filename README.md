# ホワイトアウト・サバイバル ギルドサイト

Discord風スレッド投稿型のギルド/攻略まとめサイトです。

## 技術スタック

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database/Backend**: Supabase
- **Deployment**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseの設定

1. [Supabase](https://supabase.com/)でプロジェクトを作成
2. `supabase/schema.sql` の内容をSQLエディタで実行してテーブルを作成
3. プロジェクトのURLとAnon Keyを取得

### 3. 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=https://unqjejwfdggtsdvtiaxe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_l57kqF3BDnaYD74oXGwPYQ_3C7zlmpB
```

**重要**: `.env.local` ファイルは `.gitignore` に含まれているため、Gitにコミットされません。Vercelにデプロイする際は、Vercelのダッシュボードで環境変数を設定してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 機能

- **ログイン**: Player IDを入力して外部APIからニックネームを取得
- **カテゴリ別スレッド一覧**: イベント攻略、ギルド連絡、雑談、一般
- **スレッド作成**: タイトルと本文を入力してスレッドを作成
- **コメント機能**: スレッドにコメントを投稿

## デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリにコードをプッシュ
2. [Vercel](https://vercel.com/)にログイン
3. 新しいプロジェクトを作成し、GitHubリポジトリを選択
4. 環境変数を設定:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. デプロイ

## ライセンス

MIT
