import { Workspaces } from "@/components/workspaces";
import { GreetingMessage } from "@/components/greeting-message";

const OverviewPage = () => {
  return (
    <div className="pb-40 gap-6 grid grid-cols-[minmax(56px,1fr)_minmax(auto,900px)_minmax(56px,1fr)] w-full">
      <GreetingMessage />
      <Workspaces />
    </div>
  );
}

export default OverviewPage;