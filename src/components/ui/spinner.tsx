import { cn } from "@/lib/utils/cn";

type SpinnerProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "size-4 border-2",
  md: "size-5 border-2",
  lg: "size-6 border-[3px]",
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Carregando"
      className={cn(
        "inline-block animate-spin rounded-full",
        "border-border border-t-primary",
        sizes[size],
        className,
      )}
    />
  );
}