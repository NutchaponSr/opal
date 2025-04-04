"use client";

import { 
  LogOutIcon, 
  SettingsIcon 
} from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { UserAvatar } from "./user-avatar";

import { logout } from "../actions/logout";

import { useCurrentUser } from "../hooks/use-current-user";

const font = JetBrains_Mono({
  subsets: ["latin"],
});

export const UserButton = () => {
  const { user, status } = useCurrentUser();

  console.log(status);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center min-h-14 space-x-2.5 px-2.5 py-2 rounded-sm cursor-pointer hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] transition">
          <UserAvatar name={user?.name ?? ""} className="size-10" fallbackClassName="text-2xl font-bold" />
          <div className="flex flex-col text-start">
            <h3 className="text-sm text-primary whitespace-nowrap text-ellipsis overflow-hidden font-medium">
              {user.name}
            </h3>
            <p className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-[#787874]">
              {user.email}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={12} className={cn(font.className, "min-w-48")}>
        <DropdownMenuItem className="text-[#787874] focus:text-[#787874] font-medium" onClick={logout}>
          <LogOutIcon className="text-[#787874]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}