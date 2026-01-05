import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ホワイトアウト・サバイバル ギルドサイト",
  description: "Discord風スレッド投稿型サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

