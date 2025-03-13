import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uniswap Axelar Demo",
  description: "A demo application showcasing Uniswap and Axelar integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
