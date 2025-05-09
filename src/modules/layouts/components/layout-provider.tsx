import { Table } from "@tanstack/react-table";
import { LayoutTable } from "./ui/layout";

import { useLayoutStore } from "@/modules/layouts/store/use-layout-store";

interface Props<TValue> {
  table: Table<TValue>
}

export const LayoutProvider = <TValue, >({ ...props }: Props<TValue>) => {
  const { layout } = useLayoutStore();

  switch (layout) {
    case "table":
      return (
        <LayoutTable {...props} />
      );
    case "kanban":
      return (
        <div>
          kanban
        </div>
      );
    default:
      break;
  }
}