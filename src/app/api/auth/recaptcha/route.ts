import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, action } = await req.json();

    if (!token || !action) {
      return NextResponse.json({ error: "Missing token/action" }, { status: 400 });
    }

    // Token is accepted by backend for audit/tracing and optional future verification.
    // Note: For strict verification, integrate Google reCAPTCHA Enterprise Assessments API here.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
