import type { Metadata } from "next";

import "../css/globals.css";
import "../css/reset.css";
import "../css/normalize.css";

export const metadata: Metadata = {
  title: "pqhaz",
  description: "pqhaz's website",
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
