import { auth } from "@/lib/auth";

interface SignedProps {
  children: React.ReactNode
}

export const Signed = {
  In: async ({ children }: SignedProps) => {
    const session = await auth();

    if (!session) return null;

    return <>{children}</>
  },
  Out: async ({ children }: SignedProps) => {
    const session = await auth();

    if (session) return null;

    return <>{children}</>
  },
  Protect: async ({ children }: SignedProps) => {
    const session = await auth();

    const isAdmin = session?.user.role === "ADMIN";

    if (!isAdmin) return null;

    return <>{children}</>
  }
}

