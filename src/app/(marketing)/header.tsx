import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full fixed top-0 z-50 py-4 px-8">
      <div className="flex items-center container mx-auto">
        <Link href="/" className="gap-2 flex justify-center items-center">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          <p className="text-2xl text-primary">Opal</p>
        </Link>
        <div className="flex items-center justify-between w-full">
          
        </div>
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="ghost" className="text-primary hover:text-primary" asChild>
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/request">
              Get Opal Free
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}