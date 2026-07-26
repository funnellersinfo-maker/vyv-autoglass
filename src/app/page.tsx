"use client";

import Header from "@/components/Header";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Brands from "@/components/sections/Brands";
import Guarantee from "@/components/sections/Guarantee";
import Expert from "@/components/sections/Expert";
import BookingForm from "@/components/sections/BookingForm";
import ServiceArea from "@/components/sections/ServiceArea";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import { I18nProvider, useI18n } from "@/lib/i18n";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function Home() {
  return (
    <I18nProvider>
      <PageContent />
    </I18nProvider>
  );
}

function PageContent() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <LanguageSwitch />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Services />
        <CTABanner
          title={t("cta1.title")}
          subtitle={t("cta1.sub")}
          variant="yellow"
        />
        <HowItWorks />
        <Testimonials />
        <BeforeAfter />
        <CTABanner
          title={t("cta2.title")}
          subtitle={t("cta2.sub")}
          variant="dark"
        />
        <Brands />
        <Expert />
        <Guarantee />
        <BookingForm />
        <FAQ />
        <ServiceArea />
        <CTABanner
          title={t("cta3.title")}
          subtitle={t("cta3.sub")}
          variant="yellow"
        />
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
    </div>
  );
}
