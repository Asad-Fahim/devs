"use client";

import { useMemo, useState, type FormEvent } from "react";
import { services } from "@/data/services";
import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  type FieldErrors,
  type ServiceEnquiryInput,
  validateServiceEnquiry,
} from "@/lib/validation";
import { Field, controlClass } from "@/components/forms/Field";
import { submitForm, type FormStatus } from "@/lib/submitForm";

const budgetLabels: Record<(typeof BUDGET_OPTIONS)[number], string> = {
  "under-250": "Under $250",
  "250-750": "$250–$750",
  "750-2000": "$750–$2,000",
  "2000-plus": "$2,000+",
  "not-sure": "Not sure yet",
};

const timelineLabels: Record<(typeof TIMELINE_OPTIONS)[number], string> = {
  asap: "As soon as possible",
  "2-4-weeks": "2–4 weeks",
  "1-3-months": "1–3 months",
  flexible: "Flexible",
};

const empty: ServiceEnquiryInput = {
  name: "",
  email: "",
  storeUrl: "",
  service: "",
  description: "",
  budgetRange: "",
  timeline: "",
  referenceUrl: "",
  privacy: false,
};

export function ServiceEnquiryForm({ defaultService }: { defaultService?: string }) {
  const [values, setValues] = useState<ServiceEnquiryInput>({
    ...empty,
    service: defaultService ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const describedBy = useMemo(() => ({
    name: errors.name ? "enquiry-name-error" : undefined,
  }), [errors.name]);

  function update<K extends keyof ServiceEnquiryInput>(key: K, value: ServiceEnquiryInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateServiceEnquiry(values);
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
      setValues({ ...empty, service: defaultService ?? "" });
    } else {
      setStatus("error");
      setMessage(result.message ?? "The enquiry could not be sent. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-sage-deep bg-success-bg p-6" role="status">
        <h2 className="font-heading text-xl font-semibold text-forest">Enquiry submitted</h2>
        <p className="mt-2 text-muted">
          Thanks. Your project enquiry has been sent. There is no automated ticket number — if you need to add
          context, send another message from this page.
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

      <Field id="enquiry-name" label="Name" required error={errors.name}>
        <input
          id="enquiry-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={controlClass(errors.name)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy.name}
        />
      </Field>

      <Field id="enquiry-email" label="Business email" required error={errors.email}>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={controlClass(errors.email)}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>

      <Field id="enquiry-store" label="Store URL" error={errors.storeUrl} hint="Please include the full https://">
        <input
          id="enquiry-store"
          name="storeUrl"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={values.storeUrl}
          onChange={(event) => update("storeUrl", event.target.value)}
          className={controlClass(errors.storeUrl)}
          aria-invalid={Boolean(errors.storeUrl)}
        />
      </Field>

      <Field id="enquiry-service" label="Service required" required error={errors.service}>
        <select
          id="enquiry-service"
          name="service"
          value={values.service}
          onChange={(event) => update("service", event.target.value)}
          className={controlClass(errors.service)}
          aria-invalid={Boolean(errors.service)}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.navLabel}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="enquiry-description"
        label="Project description"
        required
        error={errors.description}
        hint="What you are building, improving, or trying to fix."
      >
        <textarea
          id="enquiry-description"
          name="description"
          rows={7}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className={controlClass(errors.description)}
          aria-invalid={Boolean(errors.description)}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2 md:items-start">
        <Field
          id="enquiry-budget"
          label="Budget range"
          error={errors.budgetRange}
          hint="Qualification only — not a quote."
        >
          <select
            id="enquiry-budget"
            name="budgetRange"
            value={values.budgetRange}
            onChange={(event) => update("budgetRange", event.target.value)}
            className={controlClass(errors.budgetRange)}
          >
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {budgetLabels[option]}
              </option>
            ))}
          </select>
        </Field>
        <Field id="enquiry-timeline" label="Desired timeline" error={errors.timeline}>
          <select
            id="enquiry-timeline"
            name="timeline"
            value={values.timeline}
            onChange={(event) => update("timeline", event.target.value)}
            className={controlClass(errors.timeline)}
          >
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {timelineLabels[option]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="enquiry-reference" label="Reference website" error={errors.referenceUrl}>
        <input
          id="enquiry-reference"
          name="referenceUrl"
          type="url"
          placeholder="https://"
          value={values.referenceUrl}
          onChange={(event) => update("referenceUrl", event.target.value)}
          className={controlClass(errors.referenceUrl)}
          aria-invalid={Boolean(errors.referenceUrl)}
        />
      </Field>

      <div className="flex items-start gap-3">
        <input
          id="enquiry-privacy"
          name="privacy"
          type="checkbox"
          checked={values.privacy}
          onChange={(event) => update("privacy", event.target.checked)}
          className="mt-0.5 h-4 w-4 accent-forest flex-shrink-0"
          aria-invalid={Boolean(errors.privacy)}
        />
        <label htmlFor="enquiry-privacy" className="text-sm text-muted leading-relaxed">
          I understand this form sends project details so DEVS can reply about scope. See the{" "}
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
        {status === "submitting" ? "Sending…" : "Send project enquiry"}
      </button>
    </form>
  );
}
