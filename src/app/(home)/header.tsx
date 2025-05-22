"use client";

import Link from "next/link";
import Image from "next/image";

import { useParams } from "next/navigation";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const param = useParams<{ organizationId: string; }>();

  return (
    <header className="fixed top-0 z-50 w-full bg-background">
      <div className="flex flex-row h-16 md:h-20 items-center justify-between px-6 mx-auto max-w-5xl">
        <div className="hidden md:flex flex-row gap-6 items-center">
          <Link href={`/${param.organizationId}`} className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="dark:hidden block" />
            <Image src="/logo-dark.svg" alt="Logo" width={32} height={32} className="dark:block hidden" />
            <span className="text-lg font-medium text-primary">Opal</span>
          </Link>
          <SignedIn>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/${param.organizationId}/overviews`}>
                Overview
              </Link>
            </Button>
          </SignedIn>
        </div>
        <SignedIn>
          {/* TODO: Custom user button */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="hidden md:flex flex-row gap-2 items-center">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">
                Sign in
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">
                Get Opal free
              </Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </header>
  );
}