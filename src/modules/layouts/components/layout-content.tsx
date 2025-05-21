import { Icon } from "@iconify/react";
import { CircleHelpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { layouts, peeks } from "@/constants/layouts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { 
  OptionButton,
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";

import { LayoutType, PeekType } from "@/modules/layouts/types";

import { useLayoutStore } from "@/modules/layouts/store/use-layout-store";
import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";

interface Props {
  onClose: () => void;
}

export const LayoutContent = ({ onClose }: Props) => {
  const { 
    layout, 
    isShowIcon,
    isShowLine,
    peek,
    onChangeLayout,
    onChangeLine,
    onChangeIcon,
    onChangePeek
  } = useLayoutStore();

  const { isOpen, content, onBack } = useViewSettingsStore(); 

  const open = isOpen && content === "layouts";

  if (!open) return null;

  return (
    <>
      <ViewSettingsHeader onBack={onBack} onClose={onClose}>
        Layout
      </ViewSettingsHeader>
      <ViewSettingsContent>
        <div className="w-full px-2 pt-2">
          <div className="grid grid-cols-4 gap-2">
            {layouts.map(({ slug, label, icon: Icon }) => (
              <button
                key={slug}
                onClick={() => onChangeLayout(slug as LayoutType)}
                className={cn(
                  "flex flex-col items-center w-full text-[10px] rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.09)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.094)] text-muted-foreground p-1.5 hover:bg-accent",
                  layout === slug && "shadow-[inset_0_0_0_1.5px_rgb(35,131,226)] dark:shadow-[inset_0_0_0_1.5px_rgb(35,131,226)] text-marine"
                )}
              >
                <Icon className="size-5 stroke-[1.5] mt-1.5 mb-1" />
                <p>{label}</p>
              </button>
            ))}
          </div>
        </div>
      </ViewSettingsContent>
      <ViewSettingsContent>
        <OptionButton 
          label="Show vertical lines"
          action={<Switch
            checked={isShowLine}
            onCheckedChange={onChangeLine} 
          />}
        />
        <OptionButton 
          label="Show page icon"
          action={<Switch 
            checked={isShowIcon}
            onCheckedChange={onChangeIcon} 
          />}
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <OptionButton 
              label="Open page in"
              description={peeks[peek].label}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            {Object.entries(peeks).map(([key, value]) => (
              <DropdownMenuItem key={key} onClick={() => onChangePeek(key as PeekType)} className="h-auto hover:bg-accent">
                <div className="flex items-center gap-2 leading-[120%] select-none min-h-7 w-full text-sm">
                  <value.icon className="self-start size-4.5 stroke-[1.75]" />
                  <div className="flex-1">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {value.label}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground break-words">
                      {value.description}
                      {value.default && (
                        <div className="mt-0.5 font-medium text-marine">
                          Default for Table
                        </div>
                      )}
                    </div>
                  </div>
                  {key === peek && <Icon icon="game-icons:check-mark" className="ml-auto self-start size-3" />}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </ViewSettingsContent>
      <Separator />
      <ViewSettingsContent>
        <Button size="item" variant="item" onClick={() => {}}>
          <CircleHelpIcon />
          Learn about views
        </Button>
      </ViewSettingsContent>
    </>
  );
}