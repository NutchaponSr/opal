"use client";

import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

export const UserButton = () => {
  const { user } = useUser();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="hover:bg-[#00000008] p-1.5 h-10 w-full justify-start rounded-sm">
          <UserAvatar 
            className="rounded-md size-7"
            fallbackClassName="rounded-md text-lg size-7"
          />
          <span className="text-primary text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {user?.fullName}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="right" sideOffset={10} className="max-w-72 min-w-72 p-0">
        <div className="flex flex-row items-center justify-start gap-2 p-2">
          <UserAvatar className="size-9" />
          <div className="box-border flex flex-col items-stretch justify-center text-left">
            <p className="text-sm font-medium text-primary">{user?.fullName}</p>
            <p className="text-xs text-[#787774]">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <div className="box-border flex flex-col items-stretch ml-[2.5rem] px-3 pb-3">
          <Button variant="outline" size="sm" className="font-normal">
            <UserIcon />
            Manage account
          </Button>
        </div>
        <div className="border-b border-[rgba(55,53,47,0.16)]" />
        <div className="flex flex-col p-1 gap-px">
          <Button variant="item" size="sm">
            <SettingsIcon />
            Settings
          </Button>
          <SignOutButton>
            <Button variant="item" size="sm">
              <LogOutIcon />
              Log out
            </Button>
          </SignOutButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}