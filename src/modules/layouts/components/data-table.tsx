import { flexRender, Table as TB } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TValue> {
  table: TB<TValue>;
}
export const DataTable = <TValue,>({ table }: DataTableProps<TValue>) => {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const Icon = header.column.columnDef.meta?.icon;

              return (
                <TableHead key={header.id} className={header.column.columnDef.meta?.width}>
                  <div className="flex items-center gap-2 h-full">
                    {Icon && <Icon className="size-5 stroke-[1.5]" />}
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={cn("relative", row.getIsSelected() && "bg-marine/14 rounded")}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cell.column.columnDef.meta?.width}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className="px-2 py-1">
            <TableCell
              colSpan={table.getColumn.length}
              className="flex items-center text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}