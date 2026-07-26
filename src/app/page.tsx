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
import FAQ from "@/components/sections/FAQ";
import Guarantee from "@/components/sections/Guarantee";
import BookingForm from "@/components/sections/BookingForm";
import ServiceArea from "@/components/sections/ServiceArea";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Services />
        <CTABanner
          title="Tu parabrisas no va a esperar."
          subtitle="Cada minuto cuenta. Cotización gratis en 15 minutos."
          variant="yellow"
        />
        <HowItWorks />
        <Testimonials />
        <BeforeAfter />
        <CTABanner
          title="Mismo día. Cotización gratis."
          subtitle="Si llamas antes de las 2pm, agendamos para hoy."
          variant="dark"
        />
        <Brands />
        <Guarantee />
        <BookingForm />
        <FAQ />
        <ServiceArea />
        <CTABanner
          title="¿Listo para tu cotización gratis?"
          subtitle="Sin compromiso · Respuesta en 15 min · Garantía de por vida"
          variant="yellow"
          ctaPrimary="Agendar Cita Gratis →"
        />
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
    </div>
  );
}
