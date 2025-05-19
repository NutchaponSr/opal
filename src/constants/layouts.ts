import { 
  CalendarDaysIcon,
  ChartPieIcon,
  Columns3Icon, 
  LayoutGridIcon, 
  ListIcon, 
  Table2Icon,

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
]