// Server Component — layout only, no interactivity.
//
// Enforces the global container constraint from the wireframe spec:
//   max-w-7xl mx-auto px-6 lg:px-8
//
// Usage:
//   <Container>...</Container>                        → default <div>
//   <Container as="section" id="services">...</Container>  → semantic element
//   <Container className="py-24">...</Container>      → section padding added

import { cn } from "@/lib/utils";

export interface ContainerProps {
  children:    React.ReactNode;
  className?:  string;
  /** The rendered HTML element. Default "div". */
  as?:         React.ElementType;
  id?:         string;
}

export default function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn("section-container", className)}>
      {children}
    </Tag>
  );
}
