import { Workspaces } from "@/components/workspaces";
import { GreetingMessage } from "@/components/greeting-message";

interface Props {
  params: Promise<{ organizationId: string; }>;
}

const Page = async ({ params }: Props) => {
  const { organizationId } = await params;

  return (
    <div className="pb-40 gap-[26px] grid grid-cols-[[minmax(56px,1fr)_minmax(auto,900px)_minmax(56px,1fr)] w-full">
      <GreetingMessage />
      <Workspaces organizationId={organizationId} />
    </div>
  );
}

export default Page;