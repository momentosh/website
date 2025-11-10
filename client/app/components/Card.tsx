import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-card border border-border rounded-2xl p-8 ${
        hover
          ? "hover:shadow-xl hover:border-primary transition cursor-pointer"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4";
}

export function CardTitle({
  children,
  className = "",
  level = "h3",
}: CardTitleProps) {
  const HeadingTag = level as React.ElementType;
  return (
    <HeadingTag className={`font-bold text-lg ${className}`}>
      {children}
    </HeadingTag>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`text-muted-foreground text-sm ${className}`}>
      {children}
    </div>
  );
}
