import { useState } from "react";
import { Icon } from "@iconify/react";

import { DEFAULT_KEY, iconTabs } from "@/types/emoji";

import {
  Popover,
  PopoverContent,
  PopoverTrigger  
} from "@/components/ui/popover";
import { 
  Tabs, 
  TabsContent 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TabMenus } from "@/components/tab-menus";
import { EmojisContent } from "@/components/emojis-content";
import { emojiCategories } from "@/constants/emojis";

interface Props {
  children: React.ReactNode;
  onChange: (icon: string) => void;
}

export const IconsPicker = ({ children, onChange } : Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onRandom = () => {
    const allEmojis = emojiCategories.flatMap((cat) => cat.emojis);

    if (allEmojis.length > 0) {
      const randomIndex = Math.floor(Math.random() * allEmojis.length);
      onChange(allEmojis[randomIndex].icon);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        alignOffset={-4} 
        sideOffset={8}
        className="flex flex-col p-0 w-80 min-w-[180px] max-w-[calc(100vw-24px)] h-[333px]" 
      >
        <Tabs defaultValue={DEFAULT_KEY}>
          <div className="flex flex-col">
            <TabMenus tabs={iconTabs}>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onChange("lucide:file")}
                className="text-sm text-[#787774] hover:text-[#787774]"
              >
                Remove
              </Button>
            </TabMenus>
            <div className="my-2 px-2 flex items-center gap-2 w-full leading-[120%] min-h-7">
              <Input 
                reset
                showSearch
                variant="search" 
                value={searchTerm}
                placeholder="Filter by..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" size="smIcon" onClick={onRandom}>
                <Icon icon="solar:shuffle-linear" className="text-primary" />
              </Button>
              <Button variant="outline" size="smIcon">
                <div className="size-4 relative overflow-hidden inline-flex rounded-full bg-yellow-400 after:rounded-full after:bg-linear-[at_50%_75%] after:from-[#fff3] after:to-[#0000] after:border after:border-[#000]/80 after:absolute after:inset-0 after:shadow-[inset_0_-2px_3px_0_rgba(0,0,0),inset_0_1px_2px_0_rgba(255,255,255)] after:mix-blend-overlay" />
              </Button>
            </div>
          </div>
          <TabsContent value="emoji">
            <EmojisContent onChange={onChange} searchTerm={searchTerm} />
          </TabsContent>
          {/* TODO: Icon content */}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}