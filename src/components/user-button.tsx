import { JetBrains_Mono } from "next/font/google";
import { useUser, useClerk } from "@clerk/nextjs";
import { ChevronsUpDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { UserAvatar } from "./user-avatar";
import { ThemeSwitcher } from "./theme-switcher";

const font = JetBrains_Mono({
  subsets: ["latin"],
})

export const UserButton = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center min-h-9 h-9 space-x-2.5 px-2.5 py-2 rounded-sm cursor-pointer hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] transition">
          <UserAvatar 
            name={user?.firstName ?? ""} 
            className="size-7 rounded-sm" 
            image={user?.imageUrl}
            fallbackClassName="text-2xl font-bold rounded-sm" 
          />
          <h3 className="text-sm text-primary whitespace-nowrap text-ellipsis overflow-hidden font-medium">
            {user?.firstName}
          </h3>
          <ChevronsUpDownIcon className="size-4 text-[#9b9c99] ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={12} className={cn(font.className, "min-w-[300px]")}>
        <DropdownMenuLabel className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <UserAvatar 
              name={user?.firstName ?? ""} 
              className="size-8 rounded-sm" 
              image={user?.imageUrl}
              fallbackClassName="text-2xl font-bold rounded-sm" 
            />
            <div className="flex flex-col text-start">
              <h3 className="text-sm text-primary whitespace-nowrap text-ellipsis overflow-hidden font-medium">
                {user?.firstName}
              </h3>
              <p className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-[#787874]">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <Button onClick={() => openUserProfile()} variant="outline" size="sm">
              <UserIcon className="stroke-[2.25]" />
              Manage user
            </Button>
            <ThemeSwitcher />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[#787874] focus:text-[#787874] font-medium">
          <SettingsIcon className="text-[#787874]" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="text-[#787874] focus:text-[#787874] font-medium">
          <LogOutIcon className="text-[#787874]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}