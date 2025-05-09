import React, { type SVGProps } from "react";


export function LucideFile(props: SVGProps<SVGSVGElement>) {
	return (
    <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
      </g>
    </svg>
  );
}