import { LucideIcon } from "lucide-react";

export type LayoutType = "table" | "kanban" | "calendar" | "list" | "gallery" | "chart";

export type PeekType = "side" | "center" | "full";

export type PageViewProps = {
  icon: LucideIcon;
  label: string;
  description: string;
  default?: boolean;
} 