import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableAction } from "@/components/ui/table";
import { columnFilterOptions, columnIcons } from "@/types/columns";
import { Group } from "@prisma/client/edge";
import { ColumnDef } from "@tanstack/react-table";
import { GripVerticalIcon } from "lucide-react";

export const columns: ColumnDef<Group>[] = [
  {
    id: "actions",
    header: ({ table }) => (
      <div className="absolute letf-0 top-0 w-full">
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
          <Button className="transition flex items-center justify-center w-[18px] h-6 rounded hover:bg-popover">
            <GripVerticalIcon className="size-4 shrink-0 text-[#636363]" />
          </Button>
        </TableAction>
      </div>
    ),
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
]