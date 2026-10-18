import { NextResponse } from "next/server";
import { db } from "@/db";
import { serviceEnquiries } from "@/db/schema";
import { submitWeb3Forms } from "@/lib/web3forms";
import { isHoneypotTriggered, validateServiceEnquiry, type ServiceEnquiryInput } from "@/lib/validation";
import { services } from "@/data/services";

export const dynamic = "force-dynamic";

function readInput(body: Record<string, unknown>): ServiceEnquiryInput {
  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");
  return {
    name: str("name"),
    email: str("email"),
    storeUrl: str("storeUrl"),
    service: str("service"),
    description: str("description"),
    budgetRange: str("budgetRange"),
    timeline: str("timeline"),
    referenceUrl: str("referenceUrl"),
    privacy: Boolean(body.privacy),
    botcheck: str("botcheck"),
  };
}

export async function POST(request: Request) {
  let json: Record<string, unknown>;
  try {
    json = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "The request was not valid JSON." }, { status: 400 });
  }

  const input = readInput(json);
  if (isHoneypotTriggered(input.botcheck)) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateServiceEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const serviceLabel = services.find((service) => service.slug === input.service)?.navLabel ?? input.service;

  try {
    await db.insert(serviceEnquiries).values({
      name: input.name.trim(),
      email: input.email.trim(),
      storeUrl: input.storeUrl.trim() || null,
      service: input.service,
      description: input.description.trim(),
      budgetRange: input.budgetRange || null,
      timeline: input.timeline || null,
      referenceUrl: input.referenceUrl.trim() || null,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The enquiry could not be saved. Please try again." },
      { status: 500 },
    );
  }

  const mail = await submitWeb3Forms({
    subject: `[Service Enquiry] ${serviceLabel} — ${input.name.trim()}`,
    from_name: input.name.trim(),
    replyto: input.email.trim(),
    name: input.name.trim(),
    email: input.email.trim(),
    service: serviceLabel,
    store_url: input.storeUrl.trim() || "Not provided",
    budget_range: input.budgetRange || "Not provided",
    timeline: input.timeline || "Not provided",
    reference_url: input.referenceUrl.trim() || "Not provided",
    message: input.description.trim(),
  });

  if (!mail.ok && mail.reason === "not_configured") {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Form delivery is not configured yet. Add WEB3FORMS_ACCESS_KEY or NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY and try again.",
      },
      { status: 503 },
    );
  }

  if (!mail.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "The enquiry was saved but email delivery failed. Try again, or wait for a manual follow-up.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
