import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted transition-colors duration-200", className)}
      {...props}
    />
  )
}

export { Skeleton }
