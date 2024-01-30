import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "NextAuth",
  description: "appli test de nextAuth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
