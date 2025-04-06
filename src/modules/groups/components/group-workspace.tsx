import Sidebar from "@/modules/dashboard/components/ui/sidebar";

import { toast } from "sonner";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";

export const GroupWorkspace = () => {
  const utils = trpc.useUtils();
  const create = trpc.groups.create.useMutation();
  const { data } = trpc.groups.getAll.useQuery();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (
    <>
      {years.map((year) => (
        <Sidebar.Sub
          key={year}
          label={year}
          variant="default"
          className="pl-4"
          icon="solar:calendar-date-bold-duotone"
          sub
          action={
            <Button.Icon 
            onClick={() => {
              create.mutate({ year }, {
                onSuccess: () => {
                  toast.success("Group created");
                  utils.groups.getAll.invalidate();
                },
                onError: () => toast.error("Something went wrong"),
              });
            }}
            className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] opacity-0 group-hover/item:opacity-100"
            >
              <PlusIcon className="size-4 text-[#9b9c99]" />
            </Button.Icon>
          }
        >
          {data?.group
            .filter((item) => item.year === year)
            .map((item) => (
              <Sidebar.Sub
                key={item.id}
                className="pl-6"
                label={item.name}
                emoji={item.icon}
                action={
                  <Button.Icon className="size-6 hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] opacity-0 group-hover/item:opacity-100">
                    <MoreHorizontalIcon className="size-4 text-[#9b9c99]" />
                  </Button.Icon>
                }
                sub
              >
                <Sidebar.MenuItem
                  className="pl-8"
                  icon="radix-icons:dot-filled"
                  label="Competency"
                />
                <Sidebar.MenuItem
                  className="pl-8"
                  icon="radix-icons:dot-filled"
                  label="Group"
                />
              </Sidebar.Sub>
            ))
          }
        </Sidebar.Sub>
      ))}
    </>
  );
}