"use client";

import { group } from "@/types/workspace";

import { Banner } from "@/modules/layouts/components/banner";
import { Toolbar } from "@/modules/layouts/components/toolbar";

export const GroupView = () => {
  return (
    <div className="flex flex-col grow relative overflow-auto">
      <Banner workspace={group} />
      <Toolbar />
    </div>
  );
}