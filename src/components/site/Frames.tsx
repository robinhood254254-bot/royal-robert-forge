import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  children,
  label = "royalrobert.co.ke",
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface-raised shadow-[var(--shadow-elegant)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="size-2.5 rounded-full bg-whatsapp/70" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-secondary px-3 py-1 text-[0.65rem] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="bg-secondary/60">{children}</div>
    </div>
  );
}

export function MonitorFrame({
  children,
  label = "royalrobert.co.ke",
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-[1.25rem] border border-border bg-surface-raised p-2 shadow-[var(--shadow-elegant)]">
        <BrowserFrame label={label} className="rounded-lg shadow-none">
          {children}
        </BrowserFrame>
      </div>
      <div aria-hidden className="mx-auto h-5 w-24 rounded-b-md bg-surface-raised sm:w-28" />
      <div aria-hidden className="mx-auto h-2 w-40 rounded-full bg-surface-raised sm:w-52" />
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border-4 border-surface-raised bg-secondary/60 p-1 shadow-[var(--shadow-elegant)]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.4rem]">{children}</div>
    </div>
  );
}
