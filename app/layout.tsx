import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "火山数据分析",
  description: "客户数据可视化仪表盘",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
