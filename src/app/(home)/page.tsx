import Image from "next/image";

import { Button } from "@/components/ui/button";

import { LogoBadge } from "@/components/logo-badge";

const Page = () => {
  return (
    <div className="flex flex-col gap-5 items-start mx-auto text-start w-full max-w-5xl tracking-tight">
      <div className="text-sm font-medium left-4 text-gray-500 py-1.5 flex flex-row items-center gap-2">
        <LogoBadge />
        Backed by Opal
      </div>
      <div className="inline-block align-top text-balance"> 
        <h1 className="font-semibold leading-[100%] text-4xl md:text-5xl max-w-4xl !tracking-[-0.03em] text-primary">
          Opal is IDP for human resource
        </h1>
      </div>
      <div className="inline-block align-top text-balance">
        <p className="text-lg md:text-xl lg:text-2xl leading-6 md:leading-7 lg:leading-8 max-w-3xl text-primary"> 
          Empower your organization with tailored strategies and actionable insights.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-1.5">
        <Button size="lg">
          Get Opal free
        </Button>
        <Button variant="ghost" size="lg">
          Sign in
        </Button>
      </div>
      <div className="items-center justify-center flex w-full">
        <Image 
          src="/new-hero.png"
          alt="Hero"
          loading="lazy"
          width={796}
          height={665}
          className="mt-6"
        />
      </div>
    </div>
  );
}

export default Page;