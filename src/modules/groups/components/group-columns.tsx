import { Checkbox } from "@/components/ui/checkbox";
import { groups } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

type Group = typeof groups.$inferSelect;

export const columns: ColumnDef<Group>[] = [
  {
    id: "actions",
    header: ({ table }) => (
      <Checkbox 
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    meta: {
      headerClassName: "w-[32px]"
    }
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        {row.original.icon} {row.original.name}
      </div>
    )
  }
]