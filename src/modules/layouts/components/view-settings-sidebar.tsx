"use client";

import { RefObject, useState, useEffect } from "react";

interface Props {
  position: {
    top: number;
    left: number;
  };
  ref: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export const ViewSettingsSidebar = ({ ref, position }: Props) => {
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
      className="absolute transform right-24 border-l"
      style={{
        top: `${position.top}px`,
        height: `${height}px`,
      }}
    >
      <div className="flex flex-col shadow-[inset_0_1px_0_rgb(233,233,231)] max-w-[290px] min-w-[290px] bg-background h-full overflow-y-auto">
        View options
      </div>
    </div>
  );
}