import { Table } from "@tanstack/react-table";
import { DataTable } from "../data-table";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full lining-nums pb-[180px] px-24">
        {children}
      </div>
    </section>
  );
}

interface LayoutTableProps<TValue> {
  table: Table<TValue>;
}

Layout.Table = <TValue,>({ ...props }: LayoutTableProps<TValue>) => {
  return (
    <Layout>
      <DataTable {...props} />
    </Layout>
  );
}

export default Layout;