"use client";

import { useState, type FormEvent } from "react";
import { themes } from "@/data/themes";
import {
  SUPPORT_CATEGORIES,
  type FieldErrors,
  type SupportInput,
  validateSupportRequest,
} from "@/lib/validation";
import { Field, controlClass } from "@/components/forms/Field";
import { submitForm, type FormStatus } from "@/lib/submitForm";

const categoryLabels: Record<(typeof SUPPORT_CATEGORIES)[number], string> = {
  "theme-bug": "Theme bug",
  installation: "Installation or setup",
  "theme-editor": "Theme editor settings",
  layout: "Layout or responsive issue",
  documentation: "Documentation question",
  other: "Other theme-related question",
};

const empty: SupportInput = {
  name: "",
  email: "",
  themeName: themes[0]?.name ?? "",
  themeVersion: "",
  storeUrl: "",
  category: "",
  subject: "",
  description: "",
  stepsToReproduce: "",
  screenshotUrl: "",
  privacy: false,
};

export function ThemeSupportForm() {
  const [values, setValues] = useState<SupportInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof SupportInput>(key: K, value: SupportInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateSupportRequest(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    setMessage("");
    const result = await submitForm(values);
    if (result.success) {
      setStatus("success");
      setValues(empty);
    } else {
      setStatus("error");
      setMessage(result.message ?? "The support request could not be sent. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-sage-deep bg-success-bg p-6" role="status">
        <h2 className="font-heading text-xl font-semibold text-forest">Request submitted</h2>
        <p className="mt-2 text-muted">
          Your theme support request has been sent. The usual response target is two business days, subject to
          Shopify Theme Store requirements for published products. This is not a tracked ticket — if you have more
          detail, send another request.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <p className="text-sm text-muted">* indicates required field</p>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <Field id="support-name" label="Full name" required error={errors.name}>
        <input
          id="support-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={controlClass(errors.name)}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <Field id="support-email" label="Email address" required error={errors.email}>
        <input
          id="support-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={controlClass(errors.email)}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="support-theme" label="Theme name" required error={errors.themeName}>
          <select
            id="support-theme"
            name="themeName"
            value={values.themeName}
            onChange={(event) => update("themeName", event.target.value)}
            className={controlClass(errors.themeName)}
            aria-invalid={Boolean(errors.themeName)}
          >
            <option value="">Select a theme</option>
            {themes.map((theme) => (
              <option key={theme.slug} value={theme.name}>
                {theme.name}
                {theme.status === "development" ? " (in development)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field id="support-version" label="Theme version" error={errors.themeVersion}>
          <input
            id="support-version"
            name="themeVersion"
            value={values.themeVersion}
            onChange={(event) => update("themeVersion", event.target.value)}
            className={controlClass(errors.themeVersion)}
          />
        </Field>
      </div>

      <Field id="support-store" label="Store URL" required error={errors.storeUrl} hint="Please include the full https://">
        <input
          id="support-store"
          name="storeUrl"
          type="url"
          placeholder="https://"
          value={values.storeUrl}
          onChange={(event) => update("storeUrl", event.target.value)}
          className={controlClass(errors.storeUrl)}
          aria-invalid={Boolean(errors.storeUrl)}
        />
      </Field>

      <Field id="support-category" label="Issue category" required error={errors.category}>
        <select
          id="support-category"
          name="category"
          value={values.category}
          onChange={(event) => update("category", event.target.value)}
          className={controlClass(errors.category)}
          aria-invalid={Boolean(errors.category)}
        >
          <option value="">Select a category</option>
          {SUPPORT_CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {categoryLabels[option]}
            </option>
          ))}
        </select>
      </Field>

      <Field id="support-subject" label="Subject" required error={errors.subject}>
        <input
          id="support-subject"
          name="subject"
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          className={controlClass(errors.subject)}
          aria-invalid={Boolean(errors.subject)}
        />
      </Field>

      <Field id="support-description" label="Issue description" required error={errors.description}>
        <textarea
          id="support-description"
          name="description"
          rows={6}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className={controlClass(errors.description)}
          aria-invalid={Boolean(errors.description)}
        />
      </Field>

      <Field id="support-steps" label="Steps to reproduce" error={errors.stepsToReproduce}>
        <textarea
          id="support-steps"
          name="stepsToReproduce"
          rows={4}
          value={values.stepsToReproduce}
          onChange={(event) => update("stepsToReproduce", event.target.value)}
          className={controlClass(errors.stepsToReproduce)}
        />
      </Field>

      <Field
        id="support-screenshot"
        label="Screenshot or recording URL"
        error={errors.screenshotUrl}
        hint="Share a link, not credentials, private admin URLs, or customer data. Direct file uploads are not available on this form."
      >
        <input
          id="support-screenshot"
          name="screenshotUrl"
          type="url"
          placeholder="https://"
          value={values.screenshotUrl}
          onChange={(event) => update("screenshotUrl", event.target.value)}
          className={controlClass(errors.screenshotUrl)}
          aria-invalid={Boolean(errors.screenshotUrl)}
        />
      </Field>

      <div className="flex items-start gap-3">
        <input
          id="support-privacy"
          name="privacy"
          type="checkbox"
          checked={values.privacy}
          onChange={(event) => update("privacy", event.target.checked)}
          className="mt-0.5 h-4 w-4 accent-forest flex-shrink-0"
        />
        <label htmlFor="support-privacy" className="text-sm text-muted leading-relaxed">
          I understand this form is for DEVS theme product support and that my details are used to investigate the
          issue. See the{" "}
          <a href="/privacy" className="text-forest underline">
            privacy policy
          </a>
          .
        </label>
      </div>
      {errors.privacy ? (
        <p role="alert" className="text-sm text-danger">
          {errors.privacy}
        </p>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex min-h-11 items-center justify-center rounded-md bg-forest px-4 py-2.5 text-sm font-medium text-paper disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Submit support request"}
      </button>
    </form>
  );
}
