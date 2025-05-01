"use client";

import { group } from "@/types/workspace";

import { Banner } from "@/modules/layouts/components/banner";

export const GroupView = () => {
  return (
    <Banner workspace={group} />
  );
}