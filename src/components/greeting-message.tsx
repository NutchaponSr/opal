"use client";

import { useEffect, useState } from "react";

import { formatGreeting } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";


export const GreetingMessage = () => {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []); 

  return (
    <div className="gap-6 col-span-3">
      <div className="w-full h-full flex relative flex-col items-center justify-center">
        <div className="mt-8 px-12 w-full h-full">
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="flex items-center text-[30px] leading-[1.2] text-3xl font-bold text-primary">
              {formatGreeting(currentTime)},&nbsp;{user?.firstName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}