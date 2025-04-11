import { format } from "date-fns";
import { GripVerticalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { groups } from "@/db/schema";

import { columnFilterOptions, columnIcons } from "@/types/column";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableAction } from "@/components/ui/table";

type Group = typeof groups.$inferSelect;

export const columns: ColumnDef<Group>[] = [
  {
    id: "actions",
    header: ({ table }) => (
      <div className="absolute left-0 top-0 w-full">
        <TableAction position="-left-8" className="size-8">
          <Checkbox 
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </TableAction>
      </div>
    ),
    cell: ({ row }) => (
      <div className="absolute left-0 top-0 w-full">
        <TableAction position="-left-8" className="size-8">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </TableAction>
        <TableAction position="-left-[50px]" className="w-[18px] h-8">
          <Button.Icon className="transition flex items-center justify-center w-[18px] h-6 rounded hover:bg-popover">
            <GripVerticalIcon className="size-4 shrink-0 text-[#636363]" />
          </Button.Icon>
        </TableAction>
      </div>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        {row.original.icon} {row.original.name}
      </div>
    ),
    filterFn: "custom",
    enableColumnFilter: true,
    meta: {
      width: "w-[256px]",
      icon: columnIcons["text"],
      variant: "text",
      options: columnFilterOptions["text"],
    }
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => (
      <div>
        {row.original.year}
      </div>
    ),
    filterFn: "custom",
    enableColumnFilter: true,
    meta: {
      width: "w-[128px]",
      icon: columnIcons["numeric"],
      variant: "numeric",
      options: columnFilterOptions["numeric"],
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => format(row.getValue("createdAt"), "MMMM d, yyyy"),
    filterFn: "custom",
    enableColumnFilter: true,
    meta: {
      width: "w-[196px]",
      icon: columnIcons["date"],
      variant: "date",
      options: columnFilterOptions["date"],
    }
  },
]