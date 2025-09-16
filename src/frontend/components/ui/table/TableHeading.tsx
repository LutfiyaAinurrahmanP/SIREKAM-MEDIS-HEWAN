import { ReactNode } from "react";

interface TableHeadingProps {
  children: ReactNode;
  className?: string;
}
export default function TableHeading({
  children,
  className,
}: TableHeadingProps) {
  return (
    <>
      <h2
        className={`text-xl font-semibold text-gray-800 dark:text-white/90 ${className}`}
      >
        {children}
      </h2>
    </>
  );
}
