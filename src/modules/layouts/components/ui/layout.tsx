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

interface TableProps<TValue> {
  table: Table<TValue>;
}

function LayoutTable<TValue>({ ...props }: TableProps<TValue>) {
  return (
    <Layout>
      <DataTable {...props} />
    </Layout>
  );
}

export {
  LayoutTable
};