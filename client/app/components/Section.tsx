import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "alternate";
}

export function Section({
  children,
  className = "",
  id,
  variant = "default",
}: SectionProps) {
  const bgClass = variant === "default" ? "bg-background" : "bg-card/50";

  return (
    <section
      id={id}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${bgClass} ${className}`}
    >
      {children}
    </section>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export function SectionTitle({
  children,
  className = "",
  subtitle,
}: SectionTitleProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {subtitle && (
        <p className="text-primary font-semibold mb-2">{subtitle}</p>
      )}
      <h2 className={`text-4xl font-bold mb-4 ${subtitle ? "" : ""}`}>
        {children}
      </h2>
    </div>
  );
}
