import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
