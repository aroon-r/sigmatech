"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/data/schemas";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

// ─── Individual item ──────────────────────────────────────────────────────────

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq:      FAQ;
  isOpen:   boolean;
  onToggle: () => void;
  index:    number;
}) {
  return (
    <div className="border-b" style={{ borderColor: "var(--color-border)" }}>
      <dt>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          className="flex w-full items-start justify-between gap-6 py-5 text-left
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500
                     focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <span className="font-semibold leading-snug text-charcoal-50">
            {faq.question}
          </span>
          <ChevronDown
            className={cn(
              "mt-0.5 h-5 w-5 shrink-0 text-charcoal-500 transition-transform duration-200",
              isOpen && "rotate-180 text-electric-400",
            )}
            aria-hidden="true"
          />
        </button>
      </dt>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.dd
            id={`faq-answer-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-8 text-charcoal-400">{faq.answer}</p>
          </motion.dd>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServiceFAQ({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          overline="Common questions"
          title="Frequently asked questions"
          align="left"
          as="h2"
        />

        <dl
          className="mt-12 divide-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </dl>
      </Container>
    </section>
  );
}
