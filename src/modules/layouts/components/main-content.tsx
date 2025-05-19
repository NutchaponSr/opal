import { 
  ArrowDownIcon, 
  ArrowUpDownIcon, 
  FilterIcon, 
  GalleryVerticalIcon, 
  LinkIcon, 
  ListIcon, 
  LockKeyholeIcon, 
  Trash2Icon, 
  ZapIcon 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { 
  OptionButton,
  ViewSettingsContent, 
  ViewSettingsHeader 
} from "@/modules/layouts/components/ui/view-settings";

import { useViewSettingsStore } from "@/modules/layouts/store/use-view-settings-store";
import { useLayoutStore } from "../store/use-layout-store";
import { layouts } from "@/constants/layouts";
import { LayoutType } from "../types";

interface Props {
  onClose: () => void;
}

export const MainContent = ({ ...props }: Props) => {
  const { layout } = useLayoutStore();
  const { content, onOpen } = useViewSettingsStore();

  const open = content === null;

  if (!open) return null;

  return (
    <>
      <ViewSettingsHeader {...props}>
        View options
      </ViewSettingsHeader>
      <ViewSettingsContent>
        <OptionButton 
          icon={layouts.filter((f) => f.slug === layout as LayoutType)[0].icon}
          label="Layout"
          description={layouts.filter((f) => f.slug === layout as LayoutType)[0].label}
          onClick={() => onOpen("layouts")}
        />
      </ViewSettingsContent>

      <Separator />
      <ViewSettingsContent>
        <OptionButton 
          icon={ListIcon}
          label="Properties"
          description="1 Shown"
          onClick={() => {}}
        />
        <OptionButton 
          icon={FilterIcon}
          label="Filter"
          onClick={() => {}}
        />
        <OptionButton 
          icon={ArrowUpDownIcon}
          label="Sort"
          onClick={() => {}}
        />
        <OptionButton 
          icon={GalleryVerticalIcon}
          label="Grouping"
          onClick={() => {}}
        />
        <OptionButton 
          icon={ZapIcon}
          label="Automations"
          onClick={() => {}}
        />
        <OptionButton 
          icon={ArrowDownIcon}
          label="Load limit"
          description="10"
          onClick={() => {}}
        />
      </ViewSettingsContent>

      <Separator />
      <ViewSettingsContent>
        <Button size="item" variant="item2" onClick={() => {}}>
          <LockKeyholeIcon />
          Lock database
        </Button>
        <Button size="item" variant="item2" onClick={() => {}}>
          <LinkIcon />
          Copy link
        </Button>
        <Button size="item" variant="item2" onClick={() => {}}>
          <Trash2Icon />
          Delete database
        </Button>
      </ViewSettingsContent>
    </>
  );
}