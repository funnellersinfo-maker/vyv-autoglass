import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ZoomGuard } from "@/components/zoom-guard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://vvautoglass-sd.com";

// Bloquea zoom/escala con gestos en móviles (pellizcar, doble tap, desplazamiento)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "V&V Auto Glass | Reemplazo de Parabrisas en San Diego - Cotización Gratis",
  description:
    "V&V Auto Glass en San Diego, CA. Reemplazo y reparación de parabrisas, cristales laterales y traseros. Todas las marcas. Cotización gratis. Servicio móvil. Garantía de por vida. Llama hoy.",
  keywords: [
    "auto glass San Diego",
    "windshield replacement San Diego",
    "windshield repair",
    "car window replacement",
    "mobile auto glass",
    "windshield crack repair",
    "auto glass near me",
    "parabrisas San Diego",
    "cambio de parabrisas",
    "V&V Auto Glass",
  ],
  authors: [{ name: "V&V Auto Glass" }],
  creator: "V&V Auto Glass",
  publisher: "V&V Auto Glass",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/logos/vv-auto-glass.png",
    apple: "/logos/vv-auto-glass.png",
    shortcut: "/logos/vv-auto-glass.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title:
      "V&V Auto Glass | Reemplazo de Parabrisas en San Diego - Cotización Gratis",
    description:
      "Vidrios nuevos y usados para todas las marcas. Cotización gratis en 60 segundos. Técnicos certificados. Garantía por escrito. Servicio móvil en San Diego.",
    url: SITE_URL,
    siteName: "V&V Auto Glass",
    images: [
      {
        url: "/og-vv-van.jpg",
        width: 1200,
        height: 630,
        alt: "Victor, fundador de V&V Auto Glass, junto a su van de servicio en San Diego",
      },
    ],
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "V&V Auto Glass | Reemplazo de Parabrisas en San Diego - Cotización Gratis",
    description:
      "Vidrios nuevos y usados. Cotización gratis. Garantía de por vida. Servicio móvil en San Diego.",
    images: ["/og-vv-van.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Auto Glass & Windshield Replacement",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoGlassBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "V&V Auto Glass",
  alternateName: "V&V Auto Glass San Diego",
  description:
    "Reemplazo y reparación de parabrisas, cristales laterales y traseros en San Diego, CA. Todas las marcas. Servicio móvil. Garantía de por vida.",
  image: `${SITE_URL}/logos/vv-auto-glass.png`,
  logo: `${SITE_URL}/logos/vv-auto-glass.png`,
  url: SITE_URL,
  telephone: "+1-619-646-2759",
  priceRange: "$$",
  foundingDate: "2007",
  slogan: "Buen servicio a precio razonable",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card, Insurance, Financing",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Diego",
    addressRegion: "CA",
    postalCode: "92101",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.7157,
    longitude: -117.1611,
  },
  areaServed: [
    { "@type": "City", name: "San Diego" },
    { "@type": "City", name: "Chula Vista" },
    { "@type": "City", name: "La Mesa" },
    { "@type": "City", name: "El Cajon" },
    { "@type": "City", name: "National City" },
    { "@type": "City", name: "Imperial Beach" },
    { "@type": "City", name: "Coronado" },
    { "@type": "City", name: "Santee" },
    { "@type": "City", name: "Spring Valley" },
    { "@type": "City", name: "Lemon Grove" },
    { "@type": "City", name: "Encinitas" },
    { "@type": "City", name: "Carlsbad" },
    { "@type": "City", name: "Escondido" },
    { "@type": "City", name: "Oceanside" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
    bestRating: "5",
    worstRating: "1",
  },
  potentialAction: {
    "@type": "ReserveAction",
    name: "Agendar cita",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/#agendar`,
      inLanguage: "es",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Cita de servicio de vidrios automotrices",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Auto Glass Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Windshield Replacement",
          description: "Reemplazo de parabrisas para todas las marcas y modelos.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Windshield Crack Repair",
          description: "Reparación de grietas y chips en parabrisas.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Side Window Replacement",
          description: "Reemplazo de cristales laterales.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Back Glass Replacement",
          description: "Reemplazo de vidrio trasero.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Auto Glass Service",
          description: "Servicio móvil a domicilio o trabajo en San Diego County.",
        },
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/vvautoglass",
    "https://www.instagram.com/vvautoglass",
    "https://g.page/vvautoglass",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ZoomGuard />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
