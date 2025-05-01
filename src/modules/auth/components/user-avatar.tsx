"use client";
import { useUser } from "@clerk/nextjs";

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  fallbackClassName?: string;
}

export const UserAvatar = ({ className, fallbackClassName }: Props) => {
  const { user } = useUser();

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback className={cn(fallbackClassName, "bg-blue-400 text-white font-medium")}>
        {user?.firstName?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}