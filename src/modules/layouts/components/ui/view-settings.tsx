import { 
  ArrowLeftIcon,
  ChevronRightIcon, 
  LucideIcon, 
  XIcon 
} from "lucide-react";

import { Button } from "@/components/ui/button";

function ViewSettingsHeader({ 
  children,
  onBack,
  onClose,
}: { 
  children: React.ReactNode;
  onBack?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center gap-2 px-4 pt-3.5 pb-1.5 h-[42px]">
      {onBack && (
        <button onClick={onBack} className="transition inline-flex items-center justify-center shrink-0 rounded-sm h-5.5 w-6 hover:bg-accent">
          <ArrowLeftIcon className="size-4 text-muted-foreground" />
        </button>
      )}
      <span className="grow font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {children}
      </span>
      <button onClick={onClose} className="bg-accent hover:bg-[#ffffff08] size-4.5 rounded-full flex items-center justify-center shrink-0">
        <XIcon className="size-3.5 text-muted-foreground stroke-[2.5]" />
      </button>
    </div>
  );
}

function ViewSettingsContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="gap-px relative p-1 flex flex-col">
      {children}
    </div>
  );
}

function OptionButton({
  icon: Icon,
  label,
  description,
  action,
  onClick
}: {
  icon?: LucideIcon;
  label: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button size="item" variant="item2" onClick={onClick}>
      {Icon && <Icon />}
      {label}

      <div className="ml-auto flex items-center gap-1.5">
        {description && <p className="text-xs text-muted">{description}</p>}
        {action ? action : <ChevronRightIcon className="size-3.5 text-muted" />}
      </div>
    </Button>
  );
}

export {
  OptionButton,
  ViewSettingsHeader,
  ViewSettingsContent
}