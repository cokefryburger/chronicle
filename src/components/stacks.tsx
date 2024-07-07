import { cn } from "@/lib/utils";

const HStack = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex flex-row space-x-2", className)}>{children}</div>;

const VStack = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex flex-col space-y-2", className)}>{children}</div>;

export { HStack, VStack };
