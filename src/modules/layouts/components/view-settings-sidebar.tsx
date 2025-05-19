"use client";

import { RefObject, useState, useEffect } from "react";

import { MainContent } from "@/modules/layouts/components/main-content";
import { LayoutContent } from "@/modules/layouts/components/layout-content";

interface Props {
  position: {
    top: number;
    left: number;
  };
  ref: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export const ViewSettingsSidebar = ({ ref, position, ...props }: Props) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const topPosition = position.top;
      const maxHeight = windowHeight - topPosition; 
      setHeight(maxHeight);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [position.top]);

  return (
    <div
      ref={ref}
      className="absolute transform -right-24 border-l mr-24 pointer-events-auto z-9999"
      style={{
        top: `${position.top}px`,
        height: `${height - 1}px`,
      }}
    >
      <div className="flex h-full">
        <div className="flex flex-col shadow-[inset_0_1px_0_rgb(233,233,231)] dark:shadow-[inset_0_1px_0_rgb(47,47,47)] max-w-[290px] min-w-[290px] bg-background h-full overflow-y-auto text-primary">
          <MainContent {...props} />
          <LayoutContent {...props} />
        </div>
        <div className="w-24" />  
      </div>
    </div>
  );
}