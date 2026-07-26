// Central business config for V&V Auto Glass
export const BUSINESS = {
  name: "V&V Auto Glass",
  phoneDisplay: "+1 (619) 555-0199",
  phoneTel: "+16195550199",
  whatsappNumber: "16190000000", // placeholder
  whatsappDisplay: "+1 (619) 000-0000",
  email: "info@vvautoglass-sd.com",
  address: "1234 Main St, San Diego, CA 92101",
  hours: [
    { day: "Lunes – Viernes", time: "8:00 AM – 6:00 PM" },
    { day: "Sábado", time: "9:00 AM – 4:00 PM" },
    { day: "Domingo", time: "Cerrado (solo emergencias)" },
  ],
  license: "Lic. #CA-AG-12345",
  serviceAreas: [
    "San Diego",
    "Chula Vista",
    "La Mesa",
    "El Cajon",
    "National City",
    "Imperial Beach",
    "Coronado",
    "Santee",
    "Spring Valley",
    "Lemon Grove",
    "Encinitas",
    "Carlsbad",
    "Escondido",
    "Oceanside",
  ],
  rating: 4.9,
  reviewCount: 312,
  installs: "5,000+",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107051.65258022923!2d-117.20!3d32.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80deaa46d4341c65%3A0x363f50c7f5f0f9d7!2sSan%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000",
  mapDirections: "https://www.google.com/maps/dir/?api=1&destination=San+Diego+CA",
  brands: [
    "Honda",
    "Toyota",
    "Ford",
    "Chevrolet",
    "Nissan",
    "BMW",
    "Mercedes",
    "Audi",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "Volkswagen",
    "Lexus",
    "Jeep",
    "RAM",
  ],
};

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
