import { NextResponse } from "next/server";
import { db } from "@/db";
import { supportRequests } from "@/db/schema";
import { submitWeb3Forms } from "@/lib/web3forms";
import { validateSupportRequest, type SupportInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

function readInput(body: Record<string, unknown>): SupportInput {
  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");
  return {
    name: str("name"),
    email: str("email"),
    themeName: str("themeName"),
    themeVersion: str("themeVersion"),
    storeUrl: str("storeUrl"),
    category: str("category"),
    subject: str("subject"),
    description: str("description"),
    stepsToReproduce: str("stepsToReproduce"),
    screenshotUrl: str("screenshotUrl"),
    privacy: Boolean(body.privacy),
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
  const errors = validateSupportRequest(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await db.insert(supportRequests).values({
      name: input.name.trim(),
      email: input.email.trim(),
      themeName: input.themeName.trim(),
      themeVersion: input.themeVersion.trim() || null,
      storeUrl: input.storeUrl.trim(),
      category: input.category,
      subject: input.subject.trim(),
      description: input.description.trim(),
      stepsToReproduce: input.stepsToReproduce.trim() || null,
      screenshotUrl: input.screenshotUrl.trim() || null,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The support request could not be saved. Please try again." },
      { status: 500 },
    );
  }

  const mail = await submitWeb3Forms({
    subject: `[Theme Support] ${input.themeName.trim()} — ${input.subject.trim()}`,
    from_name: input.name.trim(),
    replyto: input.email.trim(),
    name: input.name.trim(),
    email: input.email.trim(),
    theme: input.themeName.trim(),
    theme_version: input.themeVersion.trim() || "Not provided",
    store_url: input.storeUrl.trim(),
    category: input.category,
    issue_subject: input.subject.trim(),
    steps_to_reproduce: input.stepsToReproduce.trim() || "Not provided",
    screenshot_url: input.screenshotUrl.trim() || "Not provided",
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
        error: "The request was saved but email delivery failed. Try again, or wait for a manual follow-up.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
