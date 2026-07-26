import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    const record = await db.contactMessage.create({
      data: {
        name: String(name),
        phone: String(phone),
        email: email ? String(email) : null,
        message: String(message),
      },
    });

    const ts = new Date().toISOString();
    console.log(`[V&V AutoGlass][${ts}] Mensaje de contacto recibido`, {
      id: record.id,
      from: name,
    });

    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    console.error("[V&V AutoGlass][ERROR] /api/contact", err);
    return NextResponse.json(
      { success: false, error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}
