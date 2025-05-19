import { cn } from "@/lib/utils";

import { layouts } from "@/constants/layouts";

import { 
  OptionButton,
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";

import { LayoutType } from "@/modules/layouts/types";

import { useLayoutStore } from "@/modules/layouts/store/use-layout-store";
import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CircleHelpIcon } from "lucide-react";

interface Props {
  onClose: () => void;
}

export const LayoutContent = ({ onClose }: Props) => {
  const { layout, onChangeLayout } = useLayoutStore();
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
          action={<Switch />}
        />
        <OptionButton 
          label="Show page icon"
          action={<Switch />}
        />
        <OptionButton 
          label="Open page in"
          description="Center peek"
        />
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