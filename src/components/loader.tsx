import { cn } from "@/lib/utils";

import { Spinner } from "@/components/spinner";

type Props = {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode
}

export const Loader = ({
  state,
  className,
  color,
  children
}: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  )
}