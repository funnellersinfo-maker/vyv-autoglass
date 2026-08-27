"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Phone, HelpCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const { t } = useI18n();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
    { q: t("faq.q9"), a: t("faq.a9") },
    { q: t("faq.q10"), a: t("faq.a10") },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-vv-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-4xl pl-12 pr-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="kicker text-vv-yellow-deep mb-3">{t("faq.kicker")}</p>
          <h2
            id="faq-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("faq.title")}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion
            type="single"
            collapsible
            className="bg-white rounded-2xl border border-black/5 shadow-sm px-4 md:px-6"
          >
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/5 last:border-0"
              >
                <AccordionTrigger className="text-left text-vv-black font-semibold hover:no-underline hover:text-vv-yellow-deep text-base md:text-lg py-5">
                  <span className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-vv-yellow-deep shrink-0 mt-0.5" />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-vv-black/70 text-sm md:text-base leading-relaxed pb-5 pl-8">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-10 text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-14 px-7">
              <a href={`tel:${BUSINESS.phoneTel}`}>
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS.phoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-vv-black/30 text-vv-black hover:bg-vv-black hover:text-white bg-transparent font-semibold h-14 px-7">
              <a href="#agendar">{t("cta.primary")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
