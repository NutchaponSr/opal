import Layout from "@/modules/layouts/components/ui/layout";

import { useSettings } from "@/stores/use-settings";
import { Table } from "@tanstack/react-table";

interface LayoutProviderProps<TValue> {
  table: Table<TValue>
}

export const LayoutProvider = <TValue,>({ ...props }: LayoutProviderProps<TValue>) => {
  const { layout } = useSettings();
  
  switch (layout) {
    case "table":
      return <Layout.Table {...props} />
  }
}