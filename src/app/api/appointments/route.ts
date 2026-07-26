import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

const WHATSAPP_NUMBER = "16190000000"; // placeholder

function logStep(step: string, detail?: unknown) {
  const ts = new Date().toISOString();
  console.log(`[V&V AutoGlass][${ts}] ${step}`, detail ? JSON.stringify(detail) : "");
}

function buildWhatsappUrl(data: {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: number;
  glassType: string;
  hasInsurance: boolean;
  serviceDate: string;
  serviceTime: string;
  location: string;
  address?: string | null;
  notes?: string | null;
}) {
  const msg =
    `Hola V&V Auto Glass, acabo de agendar una cita en su sitio web.%0A%0A` +
    `*Nombre:* ${encodeURIComponent(data.name)}%0A` +
    `*Teléfono:* ${encodeURIComponent(data.phone)}%0A` +
    `*Vehículo:* ${encodeURIComponent(data.year + " " + data.brand + " " + data.model)}%0A` +
    `*Vidrio:* ${encodeURIComponent(data.glassType)}%0A` +
    `*Seguro:* ${data.hasInsurance ? "Sí" : "No"}%0A` +
    `*Fecha preferida:* ${encodeURIComponent(data.serviceDate)}%0A` +
    `*Horario:* ${encodeURIComponent(data.serviceTime)}%0A` +
    `*Lugar:* ${encodeURIComponent(data.location)}${
      data.address ? " — " + encodeURIComponent(data.address) : ""
    }%0A` +
    (data.notes ? `*Notas:* ${encodeURIComponent(data.notes)}%0A` : "") +
    `%0AEspero su confirmación. ¡Gracias!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let payload: {
      name: string;
      phone: string;
      email?: string;
      brand: string;
      model: string;
      year: number;
      glassType: string;
      hasInsurance: boolean;
      photoUrl?: string | null;
      serviceDate: string;
      serviceTime: string;
      location: string;
      address?: string | null;
      notes?: string | null;
    };

    let savedPhotoUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const brand = String(formData.get("brand") || "").trim();
      const model = String(formData.get("model") || "").trim();
      const year = Number(formData.get("year") || 0);
      const glassType = String(formData.get("glassType") || "").trim();
      const hasInsurance = String(formData.get("hasInsurance")) === "true";
      const serviceDate = String(formData.get("serviceDate") || "").trim();
      const serviceTime = String(formData.get("serviceTime") || "").trim();
      const location = String(formData.get("location") || "").trim();
      const address = String(formData.get("address") || "").trim();
      const notes = String(formData.get("notes") || "").trim();

      const file = formData.get("photo") as File | null;
      if (file && file.size > 0) {
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: "La foto no puede pesar más de 5MB." },
            { status: 400 }
          );
        }
        const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!allowed.includes(file.type)) {
          return NextResponse.json(
            { success: false, error: "Formato de imagen no soportado." },
            { status: 400 }
          );
        }
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `dano-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
        savedPhotoUrl = `/uploads/${fileName}`;
        logStep("Foto del daño guardada", { fileName, size: file.size });
      }

      payload = {
        name,
        phone,
        email: email || undefined,
        brand,
        model,
        year,
        glassType,
        hasInsurance,
        photoUrl: savedPhotoUrl,
        serviceDate,
        serviceTime,
        location,
        address: address || undefined,
        notes: notes || undefined,
      };
    } else {
      payload = await req.json();
    }

    // Validation
    const required = [
      "name",
      "phone",
      "brand",
      "model",
      "year",
      "glassType",
      "serviceDate",
      "serviceTime",
      "location",
    ];
    for (const field of required) {
      const v = (payload as Record<string, unknown>)[field];
      if (v === undefined || v === null || v === "" || v === 0) {
        return NextResponse.json(
          { success: false, error: `Campo requerido: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!/^[+]?[\d\s()-]{10,}$/.test(payload.phone)) {
      return NextResponse.json(
        { success: false, error: "Número de teléfono inválido." },
        { status: 400 }
      );
    }

    const appointment = await db.appointment.create({
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        brand: payload.brand,
        model: payload.model,
        year: Number(payload.year),
        glassType: payload.glassType,
        hasInsurance: !!payload.hasInsurance,
        photoUrl: payload.photoUrl || null,
        serviceDate: payload.serviceDate,
        serviceTime: payload.serviceTime,
        location: payload.location,
        address: payload.address || null,
        notes: payload.notes || null,
        status: "pending",
      },
    });

    logStep("Cita creada en CRM", { id: appointment.id, name: appointment.name });
    logStep("WhatsApp enviado (simulado)", { to: appointment.phone });
    logStep("Email de confirmación enviado (simulado)", {
      to: appointment.email || "—",
    });
    logStep("CRM actualizado: estado -> pending");
    logStep("Negocio notificado: nuevo lead recibido");

    const whatsappUrl = buildWhatsappUrl({
      name: appointment.name,
      phone: appointment.phone,
      brand: appointment.brand,
      model: appointment.model,
      year: appointment.year,
      glassType: appointment.glassType,
      hasInsurance: appointment.hasInsurance,
      serviceDate: appointment.serviceDate,
      serviceTime: appointment.serviceTime,
      location: appointment.location,
      address: appointment.address,
      notes: appointment.notes,
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        name: appointment.name,
        phone: appointment.phone,
        brand: appointment.brand,
        model: appointment.model,
        year: appointment.year,
        glassType: appointment.glassType,
        hasInsurance: appointment.hasInsurance,
        photoUrl: appointment.photoUrl,
        serviceDate: appointment.serviceDate,
        serviceTime: appointment.serviceTime,
        location: appointment.location,
        address: appointment.address,
      },
      whatsappUrl,
    });
  } catch (err) {
    console.error("[V&V AutoGlass][ERROR] /api/appointments", err);
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json(
      { success: false, error: `No pudimos procesar tu cita: ${message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, count: appointments.length, appointments });
  } catch (err) {
    console.error("[V&V AutoGlass][ERROR] GET /api/appointments", err);
    return NextResponse.json(
      { success: false, error: "No se pudieron obtener las citas." },
      { status: 500 }
    );
  }
}
