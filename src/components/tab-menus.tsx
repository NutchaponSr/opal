import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  ScrollArea, 
  ScrollBar 
} from "@/components/ui/scroll-area";

interface Props {
  tabs: {
    key: string;
    label: string;
  }[];
  children: React.ReactNode;
}

export const TabMenus = ({ children, tabs }: Props) => {
  return (
    <ScrollArea>
      <TabsList className="flex w-full shadow-[inset_0_-1px_0_0_rgba(55,53,47,0.09)] px-2 text-foreground h-auto rounded-none bg-transparent py-1 justify-between">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
          ))}
        </div>
        {children}
      </TabsList>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}