import { CircleCheckIcon, CircleXIcon } from "lucide-react";

export const Form = {
  Success: ({ message }: { message?: string }) => {
    if (!message) return null;

    return (
      <div className="flex items-center justify-between bg-[#dbeddb] rounded-md p-3">
        <div className="flex items-center space-x-2">
          <CircleCheckIcon className="size-5 text-[#dbeddb] fill-[#6c9b7d]" />
          <span className="text-[#1c3829] text-xs">{message}</span>
        </div>
      </div>
    );
  },
  Error: ({ message }: { message?: string }) => {
    if (!message) return null;

    return (
      <div className="flex items-center justify-between bg-[#ffe2dd] rounded-md p-3">
        <div className="flex items-center space-x-2">
          <CircleXIcon className="size-5 text-[#ffe2dd] fill-[#e16f64]" />
          <span className="text-[#5d1715] text-xs">{message}</span>
        </div>
      </div>
    );
  }
}