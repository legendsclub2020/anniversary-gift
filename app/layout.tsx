import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Anniversary | Saima & Me",
  description: "A romantic sanctuary celebrating our love.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
