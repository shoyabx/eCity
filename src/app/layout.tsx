import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "eCity - Connect with Trusted Locals in Delhi NCR",
  description: "Join the community of neighbors helping neighbors. Save money, earn extra, and build trust.",
  keywords: "local services, community, Delhi NCR, neighbors, helping hand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}