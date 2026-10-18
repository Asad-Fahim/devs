export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface SubmitFormResult {
  success: boolean;
  message?: string;
}

export async function submitForm(formData: Record<string, any>): Promise<SubmitFormResult> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      success: false,
      message: "Form submission is not configured. Please contact support.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        access_key: accessKey,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      return {
        success: false,
        message: data.message || "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please check your connection and try again.",
    };
  }
}
