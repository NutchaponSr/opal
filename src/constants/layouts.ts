import { PageViewProps, PeekType } from "@/modules/layouts/types";
import { 
  CalendarDaysIcon,
  ChartPieIcon,
  Columns3Icon, 
  LayoutGridIcon, 
  ListIcon, 
  MinimizeIcon, 
  MaximizeIcon, 
  Table2Icon,
  PanelRightIcon,

} from "lucide-react";

export const layouts = [
  {
    slug: "table",
    icon: Table2Icon,
    label: "Table",
  },
  {
    slug: "kanban",
    icon: Columns3Icon,
    label: "Kanban",
  },
  {
    slug: "calrendar",
    icon: CalendarDaysIcon,
    label: "Calendar",
  },
  {
    slug: "list",
    icon: ListIcon,
    label: "List",
  },
  {
    slug: "gallery",
    icon: LayoutGridIcon,
    label: "Gallery",
  },
  {
    slug: "chart",
    icon: ChartPieIcon,
    label: "Chart",
  },
];

export const peeks: Record<PeekType, PageViewProps> = {
  side: {
    icon: PanelRightIcon,
    label: "Side peek",
    description: "Open pages on the sides. Keeps the view behind interactive.",
    default: true,
  },
  center: {
    icon: MinimizeIcon,
    label: "Center peek",
    description: "Open pages in a focused, centered modal.",
  },
  full: {
    icon: MaximizeIcon,
    label: "Full page",
    description: "Open pages in full page.",
  },
}