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

interface Props {
  children: React.ReactNode;
}

export const EmojiPicker = ({ children } : Props) => {
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
              <Button variant="ghost" size="sm" className="text-sm text-[#787774] hover:text-[#787774]">
                Remove
              </Button>
            </TabMenus>
            <div className="my-2 px-2 flex items-center gap-2 w-full leading-[120%] min-h-7">
              <Input reset variant="search" placeholder="Filter by..." />
              <Button variant="outline" size="smIcon">
                <Icon icon="solar:shuffle-linear" className="text-primary" />
              </Button>
              <Button variant="outline" size="smIcon">
                <div className="size-4 relative overflow-hidden inline-flex rounded-full bg-yellow-400 after:rounded-full after:bg-linear-[at_50%_75%] after:from-[#fff3] after:to-[#0000] after:border after:border-[#000]/80 after:absolute after:inset-0 after:shadow-[inset_0_-2px_3px_0_rgba(0,0,0),inset_0_1px_2px_0_rgba(255,255,255)] after:mix-blend-overlay" />
              </Button>
            </div>
          </div>
          <TabsContent value="emoji">
            <div className="flex flex-col w-full h-full max-h-[calc(208px+45px)]">
              <div className="bg-amber-400 h-full flex-1">
                <div className="w-full grow max-h-52 overflow-x-hidden overflow-y-auto custom-scrollbar pb-1.5">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-stretch">
                      <div className="flex p-2 text-[#37352fa6] text-xs">
                        <p className="self-center whitespace-nowrap overflow-hidden text-ellipsis">
                          {i}
                        </p>
                      </div>
                      <div className="flex flex-row justify-start gap-[6.5px] pl-2">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <button
                            key={i}
                            className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-2xl"
                          >
                            <div className="size-4 relative overflow-hidden inline-flex rounded-full bg-yellow-400 after:rounded-full after:bg-linear-[at_50%_75%] after:from-[#fff3] after:to-[#0000] after:border after:border-[#000]/80 after:absolute after:inset-0 after:shadow-[inset_0_-2px_3px_0_rgba(0,0,0),inset_0_1px_2px_0_rgba(255,255,255)] after:mix-blend-overlay" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className="border-t p-2 flex justify-between min-h-[45px] max-h-[45px]">
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:clock-circle-outline" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:smile-circle-outline" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:cat-outline" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="hugeicons:cheese-cake-01" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:football-outline" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="hugeicons:airplane-02" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:lightbulb-minimalistic-outline" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:check-circle-outline" />
                </Button>
                <Button variant="ghost" size="smIcon">
                  <Icon icon="solar:flag-outline" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}