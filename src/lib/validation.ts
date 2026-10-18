export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

export function required(value: unknown, message: string): string | undefined {
  if (typeof value !== "string" || value.trim().length === 0) return message;
  return undefined;
}

export function email(value: string, message = "Enter a valid email address."): string | undefined {
  if (!EMAIL_PATTERN.test(value.trim())) return message;
  return undefined;
}

export function optionalUrl(value: string, message = "Enter a valid URL starting with http:// or https://."): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (!URL_PATTERN.test(trimmed)) return message;
  return undefined;
}

export function requiredUrl(value: string, message = "Enter a valid URL starting with http:// or https://."): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Enter the store URL.";
  if (!URL_PATTERN.test(trimmed)) return message;
  return undefined;
}

export function maxLength(value: string, length: number, message: string): string | undefined {
  if (value.trim().length > length) return message;
  return undefined;
}

export function minLength(value: string, length: number, message: string): string | undefined {
  if (value.trim().length < length) return message;
  return undefined;
}

export type ServiceEnquiryInput = {
  name: string;
  email: string;
  storeUrl: string;
  service: string;
  description: string;
  budgetRange: string;
  timeline: string;
  referenceUrl: string;
  privacy: boolean;
  botcheck?: string;
};

export const SERVICE_OPTIONS = [
  "theme-customization",
  "custom-sections",
  "store-development",
  "theme-development",
  "maintenance",
  "performance",
  "shopify-plus",
  "accessibility-seo",
] as const;

export const BUDGET_OPTIONS = [
  "under-250",
  "250-750",
  "750-2000",
  "2000-plus",
  "not-sure",
] as const;

export const TIMELINE_OPTIONS = [
  "asap",
  "2-4-weeks",
  "1-3-months",
  "flexible",
] as const;

export function validateServiceEnquiry(input: ServiceEnquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  const nameError = required(input.name, "Enter your name.") ?? maxLength(input.name, 120, "Name is too long.");
  const emailError =
    required(input.email, "Enter your business email.") ?? email(input.email) ?? maxLength(input.email, 200, "Email is too long.");
  const serviceError = required(input.service, "Select a service.");
  const descriptionError =
    required(input.description, "Describe the project.") ??
    minLength(input.description, 20, "Add a little more detail so the scope is clear.") ??
    maxLength(input.description, 5000, "Description is too long.");
  const storeError = optionalUrl(input.storeUrl);
  const referenceError = optionalUrl(input.referenceUrl, "Enter a valid reference URL starting with http:// or https://.");

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (serviceError) errors.service = serviceError;
  else if (!SERVICE_OPTIONS.includes(input.service as (typeof SERVICE_OPTIONS)[number])) {
    errors.service = "Select a listed service.";
  }
  if (descriptionError) errors.description = descriptionError;
  if (storeError) errors.storeUrl = storeError;
  if (referenceError) errors.referenceUrl = referenceError;
  if (input.budgetRange && !BUDGET_OPTIONS.includes(input.budgetRange as (typeof BUDGET_OPTIONS)[number])) {
    errors.budgetRange = "Select a listed budget range.";
  }
  if (input.timeline && !TIMELINE_OPTIONS.includes(input.timeline as (typeof TIMELINE_OPTIONS)[number])) {
    errors.timeline = "Select a listed timeline.";
  }
  if (!input.privacy) errors.privacy = "Confirm you have read the privacy notice.";
  return errors;
}

export const SUPPORT_CATEGORIES = [
  "theme-bug",
  "installation",
  "theme-editor",
  "layout",
  "documentation",
  "other",
] as const;

export type SupportInput = {
  name: string;
  email: string;
  themeName: string;
  themeVersion: string;
  storeUrl: string;
  category: string;
  subject: string;
  description: string;
  stepsToReproduce: string;
  screenshotUrl: string;
  privacy: boolean;
  botcheck?: string;
};

export function validateSupportRequest(input: SupportInput): FieldErrors {
  const errors: FieldErrors = {};
  const nameError = required(input.name, "Enter your name.") ?? maxLength(input.name, 120, "Name is too long.");
  const emailError =
    required(input.email, "Enter your email address.") ?? email(input.email) ?? maxLength(input.email, 200, "Email is too long.");
  const themeError = required(input.themeName, "Select a theme.");
  const storeError = requiredUrl(input.storeUrl);
  const categoryError = required(input.category, "Select an issue category.");
  const subjectError =
    required(input.subject, "Enter a short subject.") ?? maxLength(input.subject, 160, "Subject is too long.");
  const descriptionError =
    required(input.description, "Describe the issue.") ??
    minLength(input.description, 20, "Add a little more detail so the issue can be investigated.") ??
    maxLength(input.description, 5000, "Description is too long.");
  const screenshotError = optionalUrl(input.screenshotUrl, "Enter a valid screenshot or recording URL.");
  const stepsError = maxLength(input.stepsToReproduce ?? "", 4000, "Steps to reproduce are too long.");
  const versionError = maxLength(input.themeVersion ?? "", 40, "Version looks too long.");

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (themeError) errors.themeName = themeError;
  if (storeError) errors.storeUrl = storeError;
  if (categoryError) errors.category = categoryError;
  else if (!SUPPORT_CATEGORIES.includes(input.category as (typeof SUPPORT_CATEGORIES)[number])) {
    errors.category = "Select a listed category.";
  }
  if (subjectError) errors.subject = subjectError;
  if (descriptionError) errors.description = descriptionError;
  if (screenshotError) errors.screenshotUrl = screenshotError;
  if (stepsError) errors.stepsToReproduce = stepsError;
  if (versionError) errors.themeVersion = versionError;
  if (!input.privacy) errors.privacy = "Confirm you have read the privacy notice.";
  return errors;
}

export function isHoneypotTriggered(botcheck: string | undefined): boolean {
  return Boolean(botcheck && botcheck.trim().length > 0);
}
