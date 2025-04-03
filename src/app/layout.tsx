import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opal",
  description: "Individual Development Plan System",
  icons: {
    icon: "/logo-dark.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(font.className, "antialiased")}>
          {children}
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </SessionProvider>
  );
}
