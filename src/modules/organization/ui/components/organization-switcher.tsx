import Link from "next/link";

import { 
  ChevronDownIcon, 
  MoreHorizontalIcon, 
  PlusIcon, 
  SettingsIcon, 
  UserRoundPlusIcon 
} from "lucide-react";
import { Icon } from "@iconify/react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCreateStore } from "../../store/use-create-modal";

interface Props {
  organizationId: string;
}

export const OrganizationSwitcher = ({ organizationId }: Props) => {
  const trpc = useTRPC();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { onOpen } = useCreateStore();

  const { data: organizations } = useSuspenseQuery(trpc.organizations.getMany.queryOptions());

  const currentOrganization = organizations.filter((f) => f.id === organizationId)[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="item" className="w-full hover:bg-[#00000008] gap-2 text-sm px-2">
          <div className="size-5 rounded-sm flex items-center justify-center bg-[#347ea9] shrink-0">
            <Icon icon="heroicons:building-office-16-solid" className="size-3.5 text-white" />
          </div>
          <span className="text-primary whitespace-nowrap text-ellipsis overflow-hidden">
            {currentOrganization.name}
          </span>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" alignOffset={2} className="w-64 p-0">
        <div className="p-2 flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2.5">
            <div className="size-9 rounded-sm flex items-center justify-center bg-[#347ea9] shrink-0 shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)]">
              <Icon icon="heroicons:building-office-16-solid" className="size-6 text-white" />
            </div>
            <div className="flex flex-col whitespace-nowrap overflow-hidden text-ellipsis">
              <div className="text-sm leading-5 text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                {currentOrganization.name}
              </div>

              {/* TODO: Plan & member of people */}
              <div className="text-xs leading-4 text-[#73726e] whitespace-nowrap overflow-hidden text-ellipsis">
                Free Plan · 1 member
              </div>
            </div>
          </div>
          <div className="inline-flex gap-2">
            <Button variant="outline" size="xs">
              <SettingsIcon className="size-3.5" />
              Settings
            </Button>
            <Button variant="outline" size="xs">
              <UserRoundPlusIcon className="size-3.5" />
              Invite members
            </Button>
          </div>
        </div>
        
        <Separator />
        <div className="flex flex-col">
          <div className="p-2 pb-0 flex items-center justify-between text-[#73726e]">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-xs">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <Button size="xsIcon" variant="ghost">
              <MoreHorizontalIcon className="fill-[#73726e] text-[#73726e]" />
            </Button>
          </div>

          <div className="flex flex-col p-1 gap-px">
            {organizations.map((org) => (
              <Button asChild key={org.id} size="item" variant="item">
                <Link href={`/${org.id}/overviews`}>
                  <div className="size-5 rounded-sm flex items-center justify-center bg-[#347ea9] shrink-0">
                    <Icon icon="heroicons:building-office-16-solid" className="size-3.5 text-white" />
                  </div>
                  {org.name}
                  {org.id === organizationId && (
                    <Icon icon="game-icons:check-mark" className="size-3 ml-auto" />
                  )}
                </Link>
              </Button>
            ))}
            <Button size="item" variant="item" onClick={onOpen}>
              <div className="size-5 rounded-full border border-dashed flex items-center justify-center bg-white">
                <PlusIcon className="size-3 text-primary" />
              </div>
              Create organization
            </Button>
          </div>
        </div>
        
        <Separator />
        <div className="flex flex-col p-1 gap-px">
          <Button size="item" variant="item" onClick={() => signOut()}>
            <Icon icon="hugeicons:door-01" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}