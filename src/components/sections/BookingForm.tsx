"use client";

import { useState, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Car,
  Camera,
  Settings2,
  CalendarClock,
  User,
  Upload,
  X,
  ShieldCheck,
  Clock,
  Sparkles,
  PartyPopper,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  brand: string;
  model: string;
  year: string;
  glassType: string;
  hasInsurance: boolean;
  photo: File | null;
  when: string;
  where: string;
  address: string;
  serviceDate: string;
  serviceTime: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const STEPS = [
  { id: 1, label: "Vehículo", icon: Car },
  { id: 2, label: "Daño", icon: Camera },
  { id: 3, label: "Servicio", icon: Settings2 },
  { id: 4, label: "Agenda", icon: CalendarClock },
  { id: 5, label: "Contacto", icon: User },
];

const ENCOURAGE: Record<number, string> = {
  1: "🚗 Empecemos. Esto toma menos de 2 minutos.",
  2: "📸 Con una foto basta para cotizar exacto.",
  3: "⚙️ ¡Casi listo! Dinos dónde y cuándo.",
  4: "📅 ¡Ya casí! Solo unos datos más.",
  5: "📞 Último paso. Te llamaremos en 15 min.",
};

function formatPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function nextDates(count: number) {
  const out: { iso: string; weekday: string; day: string; month: string }[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("es-US", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("es-US", { month: "short" }),
    });
  }
  return out;
}

const glassTypes = [
  { value: "Parabrisas", label: "Parabrisas" },
  { value: "Lateral", label: "Cristal lateral" },
  { value: "Trasero", label: "Vidrio trasero" },
  { value: "Espejo", label: "Espejo lateral" },
];

const brands = [
  "Honda","Toyota","Ford","Chevrolet","Nissan","BMW","Mercedes-Benz","Audi",
  "Hyundai","Kia","Mazda","Subaru","Volkswagen","Lexus","Jeep","RAM","Tesla",
  "Acura","Infiniti","Volvo","Mitsubishi","Buick","Cadillac","Chevy","GMC",
  "Otra",
];

const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => String(2025 - i));

export default function BookingForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { whatsappUrl: string; data: FormData }>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<FormData>({
    brand: "",
    model: "",
    year: "",
    glassType: "",
    hasInsurance: false,
    photo: null,
    when: "",
    where: "",
    address: "",
    serviceDate: "",
    serviceTime: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const dates = useMemo(() => nextDates(8), []);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.brand) e.brand = "Selecciona la marca.";
      if (!data.model.trim()) e.model = "Escribe el modelo.";
      if (!data.year) e.year = "Selecciona el año.";
    }
    if (s === 2) {
      if (!data.glassType) e.glassType = "Selecciona el tipo de vidrio.";
      if (data.photo && data.photo.size > 5 * 1024 * 1024) {
        e.photo = "La foto no puede pesar más de 5MB.";
      }
    }
    if (s === 3) {
      if (!data.when) e.when = "Indica cuándo lo necesitas.";
      if (!data.where) e.where = "Indica dónde.";
      if (data.where === "Casa" || data.where === "Trabajo") {
        if (!data.address.trim()) e.address = "Escribe tu dirección.";
      }
    }
    if (s === 4) {
      if (!data.serviceDate) e.serviceDate = "Elige una fecha.";
      if (!data.serviceTime) e.serviceTime = "Elige una franja horaria.";
    }
    if (s === 5) {
      if (!data.name.trim()) e.name = "Escribe tu nombre.";
      const phoneDigits = data.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) e.phone = "Teléfono inválido (10 dígitos).";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    if (step < 5) setStep(step + 1);
  };
  const back = () => step > 1 && setStep(step - 1);

  const submit = async () => {
    if (!validateStep(5)) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("phone", data.phone);
      fd.append("email", data.email);
      fd.append("brand", data.brand);
      fd.append("model", data.model);
      fd.append("year", data.year);
      fd.append("glassType", data.glassType);
      fd.append("hasInsurance", String(data.hasInsurance));
      if (data.photo) fd.append("photo", data.photo);
      fd.append("serviceDate", data.serviceDate);
      fd.append("serviceTime", data.serviceTime);
      fd.append("location", data.where);
      fd.append("address", data.address);
      fd.append("notes", data.notes);

      const res = await fetch("/api/appointments", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "No pudimos enviar tu cita.");
      }
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3200);
      setDone({ whatsappUrl: json.whatsappUrl, data });
      toast({
        title: "¡Cita agendada! 🎉",
        description: "Te contactaremos en menos de 15 min.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      toast({
        title: "No se pudo agendar",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / 5) * 100;

  return (
    <section
      id="agendar"
      aria-labelledby="booking-heading"
      className="bg-vv-cream py-16 md:py-24 relative overflow-hidden"
    >
      {showConfetti && <Confetti />}
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="kicker text-vv-yellow-deep mb-3">Cotización Gratis</p>
          <h2
            id="booking-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            Agenda tu cita en <span className="text-gradient-yellow">2 minutos</span>
          </h2>
          <p className="mt-3 text-vv-black/70 text-sm md:text-base">
            Sin compromiso · Respuesta en 15 min · Cotización exacta
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
          {/* Progress */}
          {!done && (
            <div className="px-5 md:px-8 pt-6 md:pt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-vv-black/60">
                  Paso {step} de 5
                </span>
                <span className="text-xs text-vv-black/50 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Toma 2 minutos
                </span>
              </div>
              <div className="h-2 bg-black/10 rounded-full overflow-hidden mb-5">
                <motion.div
                  className="h-full bg-gradient-to-r from-vv-yellow to-vv-yellow-deep rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                {STEPS.map((s) => {
                  const active = step === s.id;
                  const complete = step > s.id;
                  return (
                    <div key={s.id} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold transition-colors ${
                          complete
                            ? "bg-vv-green text-white"
                            : active
                            ? "bg-vv-yellow text-vv-black ring-4 ring-vv-yellow/30"
                            : "bg-black/10 text-vv-black/50"
                        }`}
                      >
                        {complete ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                      </div>
                      <span
                        className={`text-[10px] md:text-xs font-medium ${
                          active || complete ? "text-vv-black" : "text-vv-black/50"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mb-4 text-sm text-vv-black/70 font-medium bg-vv-yellow/10 border border-vv-yellow/30 rounded-lg px-3 py-2">
                {ENCOURAGE[step]}
              </div>
            </div>
          )}

          <div className="px-5 md:px-8 pb-8">
            <AnimatePresence mode="wait">
              {done ? (
                <Confirmation data={done.data} whatsappUrl={done.whatsappUrl} />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <StepHeader
                        icon={Car}
                        title="Cuéntanos de tu vehículo"
                        subtitle="Para darte un precio exacto, necesitamos marca, modelo y año."
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="brand">Marca *</Label>
                          <Select
                            value={data.brand}
                            onValueChange={(v) => set("brand", v)}
                          >
                            <SelectTrigger id="brand" className="mt-1.5 h-12">
                              <SelectValue placeholder="Selecciona la marca" />
                            </SelectTrigger>
                            <SelectContent className="max-h-72 vv-scroll">
                              {brands.map((b) => (
                                <SelectItem key={b} value={b}>
                                  {b}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldErr msg={errors.brand} />
                        </div>
                        <div>
                          <Label htmlFor="model">Modelo *</Label>
                          <Input
                            id="model"
                            placeholder="Ej. Camry, Civic, F-150"
                            value={data.model}
                            onChange={(e) => set("model", e.target.value)}
                            className="mt-1.5 h-12"
                          />
                          <FieldErr msg={errors.model} />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="year">Año *</Label>
                          <Select
                            value={data.year}
                            onValueChange={(v) => set("year", v)}
                          >
                            <SelectTrigger id="year" className="mt-1.5 h-12">
                              <SelectValue placeholder="Selecciona el año" />
                            </SelectTrigger>
                            <SelectContent className="max-h-72 vv-scroll">
                              {years.map((y) => (
                                <SelectItem key={y} value={y}>
                                  {y}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldErr msg={errors.year} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <StepHeader
                        icon={Camera}
                        title="Sobre el daño"
                        subtitle="¿Qué vidrio necesitas? Una foto nos ayuda a cotizar mejor."
                      />
                      <div>
                        <Label>Tipo de vidrio *</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {glassTypes.map((g) => (
                            <button
                              key={g.value}
                              type="button"
                              onClick={() => set("glassType", g.value)}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all ${
                                data.glassType === g.value
                                  ? "border-vv-yellow bg-vv-yellow/15 text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              {g.label}
                            </button>
                          ))}
                        </div>
                        <FieldErr msg={errors.glassType} />
                      </div>

                      <div>
                        <Label>¿Tienes seguro?</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            { v: true, label: "✓ Sí, tengo seguro" },
                            { v: false, label: "✗ No tengo" },
                          ].map((o) => (
                            <button
                              key={String(o.v)}
                              type="button"
                              onClick={() => set("hasInsurance", o.v)}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all ${
                                data.hasInsurance === o.v
                                  ? "border-vv-yellow bg-vv-yellow/15 text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                        {data.hasInsurance && (
                          <p className="mt-2 text-xs text-vv-black/60 flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-vv-green" />
                            Tramitamos el reclamo con tu aseguradora por ti.
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Foto del daño (opcional)</Label>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) set("photo", f);
                          }}
                        />
                        {!data.photo ? (
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="mt-2 w-full h-28 rounded-xl border-2 border-dashed border-black/15 hover:border-vv-yellow bg-vv-cream/50 flex flex-col items-center justify-center gap-1 text-vv-black/60"
                          >
                            <Upload className="h-6 w-6 text-vv-yellow-deep" />
                            <span className="text-sm font-medium">
                              Toca para subir foto
                            </span>
                            <span className="text-[11px] text-vv-black/50">
                              JPG, PNG · Máx 5MB
                            </span>
                          </button>
                        ) : (
                          <div className="mt-2 relative rounded-xl overflow-hidden border border-black/10">
                            <img
                              src={URL.createObjectURL(data.photo)}
                              alt="Foto del daño"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => set("photo", null)}
                              className="absolute top-2 right-2 bg-vv-black/80 text-white rounded-full p-1.5 hover:bg-vv-black"
                              aria-label="Quitar foto"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        <FieldErr msg={errors.photo} />
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <StepHeader
                        icon={Settings2}
                        title="¿Cuándo y dónde?"
                        subtitle="Elige la urgencia y el lugar del servicio."
                      />
                      <div>
                        <Label>¿Cuándo lo necesitas? *</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {[
                            { v: "Hoy", label: "🔥 Hoy" },
                            { v: "Mañana", label: "Mañana" },
                            { v: "Esta semana", label: "Esta semana" },
                          ].map((o) => (
                            <button
                              key={o.v}
                              type="button"
                              onClick={() => set("when", o.v)}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all ${
                                data.when === o.v
                                  ? "border-vv-yellow bg-vv-yellow/15 text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                        <FieldErr msg={errors.when} />
                      </div>

                      <div>
                        <Label>¿Dónde? *</Label>
                        <RadioGroup
                          value={data.where}
                          onValueChange={(v) => set("where", v)}
                          className="grid grid-cols-3 gap-2 mt-2"
                        >
                          {[
                            { v: "Taller", label: "Taller" },
                            { v: "Casa", label: "Mi casa" },
                            { v: "Trabajo", label: "Mi trabajo" },
                          ].map((o) => (
                            <label
                              key={o.v}
                              htmlFor={`where-${o.v}`}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                data.where === o.v
                                  ? "border-vv-yellow bg-vv-yellow/15 text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              <RadioGroupItem
                                id={`where-${o.v}`}
                                value={o.v}
                                className="sr-only"
                              />
                              {o.label}
                            </label>
                          ))}
                        </RadioGroup>
                        <FieldErr msg={errors.where} />
                      </div>

                      {(data.where === "Casa" || data.where === "Trabajo") && (
                        <div>
                          <Label htmlFor="address">
                            Dirección (servicio móvil) *
                          </Label>
                          <Input
                            id="address"
                            placeholder="Ej. 1234 Main St, San Diego, CA 92101"
                            value={data.address}
                            onChange={(e) => set("address", e.target.value)}
                            className="mt-1.5 h-12"
                          />
                          <p className="mt-1 text-[11px] text-vv-black/60 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-vv-yellow-deep" />
                            Sin costo extra en la mayoría de zonas de San Diego.
                          </p>
                          <FieldErr msg={errors.address} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4 */}
                  {step === 4 && (
                    <div className="space-y-5">
                      <StepHeader
                        icon={CalendarClock}
                        title="Elige fecha y hora"
                        subtitle="Solo mostramos días con disponibilidad real."
                      />

                      <div className="flex items-center gap-2 bg-vv-yellow/15 border border-vv-yellow/40 rounded-lg px-3 py-2 mb-2">
                        <span className="text-xs font-semibold text-vv-black">
                          🔥 Solo 3 citas disponibles hoy. Reserva la tuya.
                        </span>
                      </div>

                      <div>
                        <Label>Fecha *</Label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-2">
                          {dates.map((d) => (
                            <button
                              key={d.iso}
                              type="button"
                              onClick={() => set("serviceDate", d.iso)}
                              className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                                data.serviceDate === d.iso
                                  ? "border-vv-yellow bg-vv-yellow text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              <span className="text-[10px] uppercase font-medium">
                                {d.weekday.replace(".", "")}
                              </span>
                              <span className="text-lg font-extrabold leading-none">
                                {d.day}
                              </span>
                              <span className="text-[10px] uppercase">
                                {d.month.replace(".", "")}
                              </span>
                            </button>
                          ))}
                        </div>
                        <FieldErr msg={errors.serviceDate} />
                      </div>

                      <div>
                        <Label>Franja horaria *</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            { v: "Mañana (8am–12pm)", label: "🌅 Mañana (8am–12pm)" },
                            { v: "Tarde (12pm–6pm)", label: "☀️ Tarde (12pm–6pm)" },
                          ].map((o) => (
                            <button
                              key={o.v}
                              type="button"
                              onClick={() => set("serviceTime", o.v)}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all ${
                                data.serviceTime === o.v
                                  ? "border-vv-yellow bg-vv-yellow/15 text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                        <FieldErr msg={errors.serviceTime} />
                      </div>

                      <p className="text-[11px] text-vv-black/55 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-vv-green" />
                        Te confirmamos por WhatsApp en 15 min.
                      </p>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {step === 5 && (
                    <div className="space-y-5">
                      <StepHeader
                        icon={User}
                        title="¿Cómo te contactamos?"
                        subtitle="Último paso. Te llamaremos o escribiremos en 15 minutos."
                      />
                      <div>
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input
                          id="name"
                          placeholder="Ej. Juan Pérez"
                          value={data.name}
                          onChange={(e) => set("name", e.target.value)}
                          className="mt-1.5 h-12"
                        />
                        <FieldErr msg={errors.name} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="(619) 555-0199"
                          value={data.phone}
                          onChange={(e) => set("phone", formatPhone(e.target.value))}
                          className="mt-1.5 h-12"
                        />
                        <p className="mt-1 text-[11px] text-vv-black/55">
                          📲 Te llamaremos o escribiremos por WhatsApp.
                        </p>
                        <FieldErr msg={errors.phone} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email (opcional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tucorreo@ejemplo.com"
                          value={data.email}
                          onChange={(e) => set("email", e.target.value)}
                          className="mt-1.5 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Notas (opcional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Cuéntanos detalles del daño, color del auto, sensor de lluvia, etc."
                          value={data.notes}
                          onChange={(e) => set("notes", e.target.value)}
                          className="mt-1.5 min-h-[80px]"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-vv-black/55 bg-vv-cream rounded-lg px-3 py-2">
                        <ShieldCheck className="h-4 w-4 text-vv-green shrink-0" />
                        🔒 Tu información está segura. No la compartimos con
                        terceros.
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav buttons */}
            {!done && (
              <div className="flex items-center justify-between gap-3 mt-8 pt-5 border-t border-black/5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={back}
                  disabled={step === 1 || submitting}
                  className="text-vv-black/70 hover:text-vv-black hover:bg-black/5 h-12"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Atrás
                </Button>
                {step < 5 ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-12 px-6"
                  >
                    Continuar
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-12 px-6 pulse-yellow-glow"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Agendar Cita Gratis
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {!done && (
          <p className="mt-4 text-center text-xs text-vv-black/50 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-vv-green" />
            Información segura · Sin compromiso · Cancela cuando quieras
          </p>
        )}
      </div>
    </section>
  );
}

function StepHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-2">
      <div className="grid place-items-center h-10 w-10 rounded-xl bg-vv-yellow/15 text-vv-yellow-deep shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-vv-black font-bold text-lg leading-tight">{title}</h3>
        <p className="text-vv-black/60 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {msg}
    </p>
  );
}

function Confirmation({
  data,
  whatsappUrl,
}: {
  data: FormData;
  whatsappUrl: string;
}) {
  const summary = [
    { label: "Vehículo", value: `${data.year} ${data.brand} ${data.model}` },
    { label: "Vidrio", value: data.glassType },
    { label: "Seguro", value: data.hasInsurance ? "Sí" : "No" },
    { label: "Fecha", value: data.serviceDate },
    { label: "Horario", value: data.serviceTime },
    { label: "Lugar", value: data.where + (data.address ? ` — ${data.address}` : "") },
    { label: "Nombre", value: data.name },
    { label: "Teléfono", value: data.phone },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-4"
    >
      <div className="inline-grid place-items-center h-20 w-20 rounded-full bg-vv-green text-white mb-4">
        <PartyPopper className="h-10 w-10" />
      </div>
      <h3 className="text-vv-black font-extrabold text-2xl md:text-3xl">
        ¡Cita Agendada! 🎉
      </h3>
      <p className="mt-2 text-vv-black/70 text-sm md:text-base">
        Gracias <span className="font-bold">{data.name.split(" ")[0]}</span>. Hemos
        recibido tu solicitud. <strong>Te contactaremos en 15 min</strong> para
        confirmar.
      </p>

      <div className="mt-6 text-left bg-vv-cream rounded-2xl p-5 border border-black/5">
        <div className="text-[11px] uppercase tracking-wider text-vv-black/50 font-bold mb-3">
          Resumen de tu cita
        </div>
        <dl className="grid sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {summary.map((s) => (
            <div key={s.label} className="flex justify-between gap-2 py-1 border-b border-black/5 last:border-0">
              <dt className="text-vv-black/60">{s.label}</dt>
              <dd className="text-vv-black font-semibold text-right">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-vv-green text-white hover:bg-vv-green/90 font-bold h-12 px-6">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 32 32" className="h-5 w-5 mr-2 fill-current">
              <path d="M16.04 4c-6.6 0-12 5.36-12 11.97 0 2.11.55 4.16 1.6 5.97L4 28l6.22-1.62a11.95 11.95 0 0 0 5.82 1.49h.01c6.6 0 12-5.36 12-11.97C28.05 9.36 22.65 4 16.04 4zm5.41 13.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
            </svg>
            Enviar confirmación por WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" className="border-vv-black/30 text-vv-black hover:bg-vv-black hover:text-white bg-transparent h-12 px-6">
          <a href={`tel:${BUSINESS.phoneTel}`}>
            Llamar ahora: {BUSINESS.phoneDisplay}
          </a>
        </Button>
      </div>

      <p className="mt-4 text-xs text-vv-black/55 flex items-center justify-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-vv-yellow-deep" />
        Te contactaremos en 15 min · Revisa tu WhatsApp
      </p>
    </motion.div>
  );
}

function Confetti() {
  const colors = ["#FFD60A", "#FFC300", "#25D366", "#0A0A0A", "#FFFFFF"];
  const pieces = Array.from({ length: 60 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const color = colors[i % colors.length];
        const rotate = Math.random() * 360;
        return (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              top: "-20px",
              background: color,
              transform: `rotate(${rotate}deg)`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
