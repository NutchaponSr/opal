import { cn } from "@/lib/utils";
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  image?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export const UserAvatar = ({ 
  name, 
  image, 
  className,
  fallbackClassName 
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(className, "rounded-md")}>
      {image && <AvatarImage src={image} />}
      <AvatarFallback className={cn(
        "text-white font-medium bg-gradient-to-b from-blue-400 from-20% to-blue-500 to-80% rounded-md",
        fallbackClassName,
      )}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}