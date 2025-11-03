import { twJoin } from "tailwind-merge";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={twJoin(
        "[--max-width:69.375rem] [--padding:1rem] xs:[--padding:1.5rem] lg:[--padding:2.44rem]",
        "[margin-inline:auto] [width:min(100%-calc(var(--padding)*2),var(--max-width))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
