import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { useCreateStore } from "../../store/use-create-modal";

interface Props {
  organizationId: string;
}

export const OrganizationSwitcher = ({ organizationId }: Props) => {
  const trpc = useTRPC();
  const { onOpen } = useCreateStore();

  const { data: organizations } = useSuspenseQuery(trpc.organizations.getMany.queryOptions());

  const currentOrganization = organizations.filter((f) => f.id === organizationId)[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="md" variant="item" className="w-full hover:bg-[#00000008] px-2">
          <div className="size-5 rounded-sm flex items-center justify-center bg-[#347ea9]">
            <Icon icon="heroicons:building-office-16-solid" className="size-3.5 text-white" />
          </div>
          <span className="text-primary whitespace-nowrap text-ellipsis overflow-hidden">
            {currentOrganization.name}
          </span>
          <ChevronsUpDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc(240px-8px)]">
        {organizations.map((org) => (
          <DropdownMenuItem asChild key={org.id}>
            <Link href={`/${org.id}/overviews`}>
              <div className="size-5 rounded-sm flex items-center justify-center bg-[#347ea9]">
                <Icon icon="heroicons:building-office-16-solid" className="size-3.5 text-white" />
              </div>
              {org.name}
              {org.id === organizationId && (
                <Button 
                  size="xsIcon" 
                  variant="outline" 
                  className="ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Icon icon="solar:settings-bold" className="size-3" />
                </Button>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onOpen}>
          <div className="size-5 rounded-full border border-dashed flex items-center justify-center bg-white">
            <PlusIcon className="size-3 text-primary" />
          </div>
          Create organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}