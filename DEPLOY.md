# GitHub Pagesへのデプロイ手順

## 方法1: GitHub Actionsを使用（推奨）

1. **GitHubでリポジトリを作成**
   - GitHubにログイン
   - 右上の「+」→「New repository」をクリック
   - リポジトリ名を入力（例: `kingshot-rally-sync`）
   - 「Public」を選択
   - 「Create repository」をクリック

2. **リモートリポジトリを追加してプッシュ**
   ```bash
   git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
   git push -u origin main
   ```

3. **GitHub Pagesの設定**
   - リポジトリの「Settings」タブを開く
   - 左メニューの「Pages」をクリック
   - 「Source」で「GitHub Actions」を選択
   - これで自動的にデプロイが開始されます

## 方法2: シンプルな方法（GitHub Actionsを使わない）

1. **GitHubでリポジトリを作成**（上記と同じ）

2. **リモートリポジトリを追加してプッシュ**（上記と同じ）

3. **GitHub Pagesの設定**
   - リポジトリの「Settings」タブを開く
   - 左メニューの「Pages」をクリック
   - 「Source」で「Deploy from a branch」を選択
   - 「Branch」で「main」を選択
   - 「/ (root)」を選択
   - 「Save」をクリック

4. **数分待つと、以下のURLでアクセスできます**
   - `https://あなたのユーザー名.github.io/リポジトリ名/`

## 注意事項

- デプロイには数分かかることがあります
- 初回デプロイ後、URLが表示されます
- ファイルを更新したら、`git push`するだけで自動的に再デプロイされます

