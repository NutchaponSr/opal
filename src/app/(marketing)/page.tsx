import Link from "next/link";

import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const HomePage = () => {

  return (
    <div className="max-w-[980px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="flex flex-col items-center">
        <div className="relative py-8 md:py-16 overflow-hidden flex flex-col items-center gap-3">
          <Link href="/docs" className="z-10 relative">
            <button className="transition-all duration-150 ease-in-out shadow-[0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] dark:shadow-[0_0_0_1px_#787774] bg-[#fffefc] dark:bg-neutral-800 hover:bg-[#F8F8F6] dark:hover:bg-neutral-700 inline-flex justify-center items-center h-7 rounded-full text-xs px-3 space-x-2">
              <span>🎉</span>
              <Separator orientation="vertical" className="h-2 bg-[#0f0f0f1a] dark:bg-[#787774] rounded-full" />
              <span className="text-primary">Introducing Jotion</span>
              <ChevronRightIcon className="size-4 text-[#787774]" />
            </button>
          </Link>
          <h1 className="bg-gradient-to-t from-primary to-[#787774] dark:from-[#787774] dark:to-primary bg-clip-text text-transparent text-6xl tracking-tighter font-semibold text-balance">
            Drive Success with Precision.
          </h1>
          <p className="tracking-tight text-primary dark:text-stone-300 text-balance mx-auto">
            Empower your organization with tailored strategies and actionable insights.
          </p>
          <div className="flex items-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/overviews">
                Getting Started
              </Link>
            </Button>
          </div>
        </div>
        <div className="py-8 relative">
          <Image src="/hero.png" alt="Hero" width={640} height={240} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;