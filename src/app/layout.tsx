import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={cn(font.className, "antialiased")}>
          <TRPCProvider>
            {children}
            <Toaster richColors position="top-center" />
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
