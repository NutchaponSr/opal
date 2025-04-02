import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <pre className="text-xs">
        {JSON.stringify(session, null, 2)}
      </pre>
      <SignOut />
    </>
  );
};

export default HomePage;