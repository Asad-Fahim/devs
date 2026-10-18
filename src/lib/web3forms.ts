type Web3FormsPayload = {
  subject: string;
  from_name: string;
  replyto?: string;
  [key: string]: string | undefined;
};

export type Web3FormsResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" | "network" };

export function getWeb3FormsKey(): string | undefined {
  return process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || undefined;
}

export async function submitWeb3Forms(payload: Web3FormsPayload): Promise<Web3FormsResult> {
  const accessKey = getWeb3FormsKey();
  if (!accessKey) {
    return { ok: false, reason: "not_configured" };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...payload,
      }),
    });

    const data = (await response.json()) as { success?: boolean };
    if (!response.ok || !data.success) {
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
