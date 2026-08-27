"use client";

import { useState, useRef, useMemo, useEffect } from "react";
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
  History,
} from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { track } from "@/lib/track";

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

function formatPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function nextDates(count: number, lang: "es" | "en") {
  const out: { iso: string; weekday: string; day: string; month: string }[] = [];
  const today = new Date();
  const locale = lang === "en" ? "en-US" : "es-US";
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString(locale, { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString(locale, { month: "short" }),
    });
  }
  return out;
}

const brandList = [
  "Honda","Toyota","Ford","Chevrolet","Nissan","BMW","Mercedes-Benz","Audi",
  "Hyundai","Kia","Mazda","Subaru","Volkswagen","Lexus","Jeep","RAM","Tesla",
  "Acura","Infiniti","Volvo","Mitsubishi","Buick","Cadillac","Chevy","GMC",
  "Other / Otra",
];

const yearList = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => String(2025 - i));

/** Borrador persistente del formulario (localStorage; la foto File no se guarda). */
const DRAFT_KEY = "vv_booking_draft_v1";
type DraftShape = Omit<FormData, "photo"> & { photo: null; step: number };

export default function BookingForm() {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { whatsappUrl: string; data: FormData }>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<FormData>({
    brand: "", model: "", year: "", glassType: "", hasInsurance: false,
    photo: null, when: "", where: "", address: "", serviceDate: "",
    serviceTime: "", name: "", phone: "", email: "", notes: "",
  });

  // ---- Borrador: recuperar + guardar automáticamente ----
  const [draft, setDraft] = useState<DraftShape | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as DraftShape;
      const hasContent = Boolean(
        parsed.brand || parsed.model || parsed.glassType || parsed.name || parsed.phone
      );
      if (hasContent) setDraft(parsed);
    } catch {
      /* borrador corrupto: ignorar */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (done) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    const hasContent =
      data.brand || data.model || data.glassType || data.name || data.phone || data.serviceDate;
    if (!hasContent) return;
    const savable: DraftShape = { ...data, photo: null, step };
    const t0 = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(savable));
      } catch {
        /* cuota llena: ignorar */
      }
    }, 400);
    return () => clearTimeout(t0);
  }, [data, step, done]);

  const restoreDraft = () => {
    if (!draft) return;
    const { step: savedStep, ...fields } = draft;
    setData((p) => ({ ...p, ...fields }));
    setStep(Math.min(Math.max(savedStep || 1, 1), 5));
    setDraft(null);
    track("vv_booking_draft_restored");
  };

  const discardDraft = () => {
    setDraft(null);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* noop */
    }
  };

  const dates = useMemo(() => nextDates(8, lang), [lang]);

  // Listen for date selection from HeroCalendar
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail) {
        setData((p) => ({ ...p, serviceDate: ce.detail }));
        setStep(4); // jump to schedule step
      }
    };
    window.addEventListener("vv:select-date", handler);
    return () => window.removeEventListener("vv:select-date", handler);
  }, []);
  const steps = [
    { id: 1, label: lang === "en" ? "Vehicle" : "Vehículo", icon: Car },
    { id: 2, label: lang === "en" ? "Damage" : "Daño", icon: Camera },
    { id: 3, label: lang === "en" ? "Service" : "Servicio", icon: Settings2 },
    { id: 4, label: lang === "en" ? "Schedule" : "Agenda", icon: CalendarClock },
    { id: 5, label: lang === "en" ? "Contact" : "Contacto", icon: User },
  ];
  const encourage: Record<number, string> = {
    1: t("book.e1"), 2: t("book.e2"), 3: t("book.e3"), 4: t("book.e4"), 5: t("book.e5"),
  };

  const glassTypes = [
    { value: "Parabrisas", label: t("book.gt1") },
    { value: "Lateral", label: t("book.gt2") },
    { value: "Trasero", label: t("book.gt3") },
    { value: "Espejo", label: t("book.gt4") },
  ];

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.brand) e.brand = t("book.err.brand");
      if (!data.model.trim()) e.model = t("book.err.model");
      if (!data.year) e.year = t("book.err.year");
    }
    if (s === 2) {
      if (!data.glassType) e.glassType = t("book.err.glassType");
      if (data.photo && data.photo.size > 5 * 1024 * 1024) {
        e.photo = t("book.err.photo");
      }
    }
    if (s === 3) {
      if (!data.when) e.when = t("book.err.when");
      if (!data.where) e.where = t("book.err.where");
      if (data.where === "Casa" || data.where === "Trabajo") {
        if (!data.address.trim()) e.address = t("book.err.address");
      }
    }
    if (s === 4) {
      if (!data.serviceDate) e.serviceDate = t("book.err.serviceDate");
      if (!data.serviceTime) e.serviceTime = t("book.err.serviceTime");
    }
    if (s === 5) {
      if (!data.name.trim()) e.name = t("book.err.name");
      const phoneDigits = data.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 10) e.phone = t("book.err.phone");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    if (step < 5) {
      track("vv_form_step", { from: step, to: step + 1 });
      setStep(step + 1);
    }
  };
  const back = () => step > 1 && setStep(step - 1);

  const submit = async () => {
    if (!validateStep(5)) return;
    setSubmitting(true);
    try {
      // Build a WhatsApp message with all the booking details
      const lines = [
        `🚗 *Nueva Cita — V&V Auto Glass*`,
        ``,
        `*Vehículo:* ${data.year} ${data.brand} ${data.model}`,
        `*Vidrio:* ${data.glassType}`,
        `*Seguro:* ${data.hasInsurance ? "Sí" : "No"}`,
        `*Cuando:* ${data.when}`,
        `*Lugar:* ${data.where}${data.address ? ` — ${data.address}` : ""}`,
        `*Fecha:* ${data.serviceDate}`,
        `*Horario:* ${data.serviceTime}`,
        ``,
        `*Nombre:* ${data.name}`,
        `*Teléfono:* ${data.phone}`,
        data.email ? `*Email:* ${data.email}` : "",
        data.notes ? `*Notas:* ${data.notes}` : "",
        ``,
        `Foto del daño: ${data.photo ? "Sí, adjuntaré en el chat" : "No adjuntada"}`,
      ].filter(Boolean);
      const message = lines.join("\n");
      const whatsappUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

      // Simulate brief processing for UX
      await new Promise((r) => setTimeout(r, 600));

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3200);
      setDone({ whatsappUrl, data });
      track("vv_booking_submit", {
        vehicle: `${data.year} ${data.brand}`.trim(),
        glass: data.glassType,
        insurance: data.hasInsurance,
      });
      toast({
        title: t("book.toast.title"),
        description: t("book.toast.desc"),
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      toast({
        title: t("book.toast.fail"),
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
      <div className="mx-auto max-w-3xl pl-12 pr-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <p className="kicker text-vv-yellow-deep mb-3">{t("book.kicker")}</p>
          <h2
            id="booking-heading"
            className="text-vv-black font-extrabold text-3xl md:text-5xl tracking-tight"
          >
            {t("book.title.a")}<span className="text-gradient-yellow">{t("book.title.b")}</span>
          </h2>
          <p className="mt-3 text-vv-black/70 text-sm md:text-base">
            {t("book.sub")}
          </p>
        </div>

        {/* Borrador guardado automáticamente */}
        {draft && !done && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-vv-yellow/60 bg-vv-black px-4 py-3 shadow-lg"
            role="status"
          >
            <History className="h-5 w-5 shrink-0 text-vv-yellow" aria-hidden="true" />
            <p className="min-w-0 flex-1 text-xs md:text-sm text-white/90 font-medium">
              {t("book.draft.title")}
              {draft.brand && (
                <span className="text-vv-yellow font-bold"> {draft.brand} {draft.model}</span>
              )}
            </p>
            <Button
              size="sm"
              onClick={restoreDraft}
              className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-9 px-3"
            >
              {t("book.draft.restore")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={discardDraft}
              className="text-white/60 hover:text-white hover:bg-white/10 h-9 px-3"
            >
              {t("book.draft.discard")}
            </Button>
          </motion.div>
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
          {/* Progress */}
          {!done && (
            <div className="px-5 md:px-8 pt-6 md:pt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-vv-black/60">
                  {t("book.step")} {step} {t("book.of")}
                </span>
                <span className="text-xs text-vv-black/50 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {t("book.takes")}
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
                {steps.map((s) => {
                  const active = step === s.id;
                  const complete = step > s.id;
                  return (
                    <div key={s.id} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                      <div
                        className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold transition-colors shrink-0 ${
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
                        className={`text-[10px] md:text-xs font-medium text-center leading-tight ${
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
                {encourage[step]}
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
                      <StepHeader icon={Car} title={t("book.step1.t")} subtitle={t("book.step1.s")} />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="brand">{t("book.brand")} *</Label>
                          <Select value={data.brand} onValueChange={(v) => set("brand", v)}>
                            <SelectTrigger id="brand" className="mt-1.5 h-12">
                              <SelectValue placeholder={t("book.brand.ph")} />
                            </SelectTrigger>
                            <SelectContent className="max-h-72 vv-scroll">
                              {brandList.map((b) => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldErr msg={errors.brand} />
                        </div>
                        <div>
                          <Label htmlFor="model">{t("book.model")} *</Label>
                          <Input
                            id="model"
                            placeholder={t("book.model.ph")}
                            value={data.model}
                            onChange={(e) => set("model", e.target.value)}
                            className="mt-1.5 h-12"
                          />
                          <FieldErr msg={errors.model} />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="year">{t("book.year")} *</Label>
                          <Select value={data.year} onValueChange={(v) => set("year", v)}>
                            <SelectTrigger id="year" className="mt-1.5 h-12">
                              <SelectValue placeholder={t("book.year.ph")} />
                            </SelectTrigger>
                            <SelectContent className="max-h-72 vv-scroll">
                              {yearList.map((y) => (
                                <SelectItem key={y} value={y}>{y}</SelectItem>
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
                      <StepHeader icon={Camera} title={t("book.step2.t")} subtitle={t("book.step2.s")} />
                      <div>
                        <Label>{t("book.glassType")} *</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {glassTypes.map((g) => (
                            <button
                              key={g.value}
                              type="button"
                              onClick={() => set("glassType", g.value)}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all px-2 ${
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
                        <Label>{t("book.insurance")}</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            { v: true, label: t("book.yesIns") },
                            { v: false, label: t("book.noIns") },
                          ].map((o) => (
                            <button
                              key={String(o.v)}
                              type="button"
                              onClick={() => set("hasInsurance", o.v)}
                              className={`h-12 rounded-xl border-2 text-sm font-semibold transition-all px-2 ${
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
                            {t("book.insHelp")}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>{t("book.photo")}</Label>
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
                            <span className="text-sm font-medium">{t("book.photo.tap")}</span>
                            <span className="text-[11px] text-vv-black/50">{t("book.photo.hint")}</span>
                          </button>
                        ) : (
                          <div className="mt-2 relative rounded-xl overflow-hidden border border-black/10">
                            <img
                              src={URL.createObjectURL(data.photo)}
                              alt="Damage"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => set("photo", null)}
                              className="absolute top-2 right-2 bg-vv-black/80 text-white rounded-full p-1.5 hover:bg-vv-black"
                              aria-label="Remove"
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
                      <StepHeader icon={Settings2} title={t("book.step3.t")} subtitle={t("book.step3.s")} />
                      <div>
                        <Label>{t("book.when")} *</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {[
                            { v: "Hoy", label: t("book.when1") },
                            { v: "Mañana", label: t("book.when2") },
                            { v: "Esta semana", label: t("book.when3") },
                          ].map((o) => (
                            <button
                              key={o.v}
                              type="button"
                              onClick={() => set("when", o.v)}
                              className={`h-12 rounded-xl border-2 text-xs md:text-sm font-semibold transition-all px-1 ${
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
                        <Label>{t("book.where")} *</Label>
                        <RadioGroup
                          value={data.where}
                          onValueChange={(v) => set("where", v)}
                          className="grid grid-cols-3 gap-2 mt-2"
                        >
                          {[
                            { v: "Taller", label: t("book.where1") },
                            { v: "Casa", label: t("book.where2") },
                            { v: "Trabajo", label: t("book.where3") },
                          ].map((o) => (
                            <label
                              key={o.v}
                              htmlFor={`where-${o.v}`}
                              className={`h-12 rounded-xl border-2 text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer px-1 ${
                                data.where === o.v
                                  ? "border-vv-yellow bg-vv-yellow/15 text-vv-black"
                                  : "border-black/10 bg-white text-vv-black/70 hover:border-vv-yellow/50"
                              }`}
                            >
                              <RadioGroupItem id={`where-${o.v}`} value={o.v} className="sr-only" />
                              {o.label}
                            </label>
                          ))}
                        </RadioGroup>
                        <FieldErr msg={errors.where} />
                      </div>

                      {(data.where === "Casa" || data.where === "Trabajo") && (
                        <div>
                          <Label htmlFor="address">{t("book.address")} *</Label>
                          <Input
                            id="address"
                            placeholder={t("book.address.ph")}
                            value={data.address}
                            onChange={(e) => set("address", e.target.value)}
                            className="mt-1.5 h-12"
                          />
                          <p className="mt-1 text-[11px] text-vv-black/60 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-vv-yellow-deep" />
                            {t("book.addressHint")}
                          </p>
                          <FieldErr msg={errors.address} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4 */}
                  {step === 4 && (
                    <div className="space-y-5">
                      <StepHeader icon={CalendarClock} title={t("book.step4.t")} subtitle={t("book.step4.s")} />

                      <div className="flex items-center gap-2 bg-vv-yellow/15 border border-vv-yellow/40 rounded-lg px-3 py-2 mb-2">
                        <span className="text-xs font-semibold text-vv-black">
                          {t("book.scarcity")}
                        </span>
                      </div>

                      <div>
                        <Label>{t("book.date")} *</Label>
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
                              <span className="text-[10px] uppercase font-medium">{d.weekday.replace(".", "")}</span>
                              <span className="text-lg font-extrabold leading-none">{d.day}</span>
                              <span className="text-[10px] uppercase">{d.month.replace(".", "")}</span>
                            </button>
                          ))}
                        </div>
                        <FieldErr msg={errors.serviceDate} />
                      </div>

                      <div>
                        <Label>{t("book.slot")} *</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {[
                            { v: "Mañana (8am–12pm)", label: t("book.slot1") },
                            { v: "Tarde (12pm–6pm)", label: t("book.slot2") },
                          ].map((o) => (
                            <button
                              key={o.v}
                              type="button"
                              onClick={() => set("serviceTime", o.v)}
                              className={`h-12 rounded-xl border-2 text-xs md:text-sm font-semibold transition-all px-2 ${
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
                        {t("book.confirmWhatsapp")}
                      </p>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {step === 5 && (
                    <div className="space-y-5">
                      <StepHeader icon={User} title={t("book.step5.t")} subtitle={t("book.step5.s")} />
                      <div>
                        <Label htmlFor="name">{t("book.name")} *</Label>
                        <Input
                          id="name"
                          placeholder={t("book.name.ph")}
                          value={data.name}
                          onChange={(e) => set("name", e.target.value)}
                          className="mt-1.5 h-12"
                        />
                        <FieldErr msg={errors.name} />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t("book.phone")} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="(619) 646-2759"
                          value={data.phone}
                          onChange={(e) => set("phone", formatPhone(e.target.value))}
                          className="mt-1.5 h-12"
                        />
                        <p className="mt-1 text-[11px] text-vv-black/55">
                          {t("book.phoneHint")}
                        </p>
                        <FieldErr msg={errors.phone} />
                      </div>
                      <div>
                        <Label htmlFor="email">{t("book.email")}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={data.email}
                          onChange={(e) => set("email", e.target.value)}
                          className="mt-1.5 h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">{t("book.notes")}</Label>
                        <Textarea
                          id="notes"
                          placeholder={t("book.notes.ph")}
                          value={data.notes}
                          onChange={(e) => set("notes", e.target.value)}
                          className="mt-1.5 min-h-[80px]"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-vv-black/55 bg-vv-cream rounded-lg px-3 py-2">
                        <ShieldCheck className="h-4 w-4 text-vv-green shrink-0" />
                        {t("book.secure")}
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
                  {t("book.back")}
                </Button>
                {step < 5 ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-12 px-5 md:px-6"
                  >
                    {t("book.next")}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="bg-vv-yellow text-vv-black hover:bg-vv-yellow-deep font-bold h-12 px-5 md:px-6 pulse-yellow-glow"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t("book.sending")}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {t("book.submit")}
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
            {t("book.footer")}
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
  const { t } = useI18n();
  const summary = [
    { label: t("book.confirm.vehicle"), value: `${data.year} ${data.brand} ${data.model}` },
    { label: t("book.confirm.glass"), value: data.glassType },
    { label: t("book.confirm.insurance"), value: data.hasInsurance ? t("book.confirm.yes") : t("book.confirm.no") },
    { label: t("book.confirm.date"), value: data.serviceDate },
    { label: t("book.confirm.slot"), value: data.serviceTime },
    { label: t("book.confirm.place"), value: data.where + (data.address ? ` — ${data.address}` : "") },
    { label: t("book.confirm.name"), value: data.name },
    { label: t("book.confirm.phone"), value: data.phone },
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
        {t("book.confirm.title")}
      </h3>
      <p className="mt-2 text-vv-black/70 text-sm md:text-base">
        {t("book.confirm.body")} <span className="font-bold">{data.name.split(" ")[0]}</span>.
        {t("book.confirm.body2")}
      </p>

      <div className="mt-6 text-left bg-vv-cream rounded-2xl p-5 border border-black/5">
        <div className="text-[11px] uppercase tracking-wider text-vv-black/50 font-bold mb-3">
          {t("book.confirm.summary")}
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
            {t("book.confirm.whatsapp")}
          </a>
        </Button>
        <Button asChild variant="outline" className="border-vv-black/30 text-vv-black hover:bg-vv-black hover:text-white bg-transparent h-12 px-6">
          <a href={`tel:${BUSINESS.phoneTel}`}>
            {t("book.confirm.call")} {BUSINESS.phoneDisplay}
          </a>
        </Button>
      </div>

      <p className="mt-4 text-xs text-vv-black/55 flex items-center justify-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-vv-yellow-deep" />
        {t("book.confirm.footer")}
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
