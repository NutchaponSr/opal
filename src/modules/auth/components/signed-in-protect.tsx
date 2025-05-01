import { checkRole } from "@/lib/roles";

import { SignedIn } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

export const SignedInProtect = async ({ children }: Props) => {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) return null;
  
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
}