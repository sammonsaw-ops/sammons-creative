"use client";
import { CSSProperties, forwardRef, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  hard?: boolean;
  className?: string;
  style?: CSSProperties;
};

export const AlbumPage = forwardRef<HTMLDivElement, Props>(function AlbumPage(
  { children, hard, className = "", style },
  ref,
) {
  return (
    <div
      ref={ref}
      data-density={hard ? "hard" : "soft"}
      style={style}
      className={`shadow-inner overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
});
