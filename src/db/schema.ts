import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const serviceEnquiries = pgTable("service_enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  storeUrl: text("store_url"),
  service: text("service").notNull(),
  description: text("description").notNull(),
  budgetRange: text("budget_range"),
  timeline: text("timeline"),
  referenceUrl: text("reference_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const supportRequests = pgTable("support_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  themeName: text("theme_name").notNull(),
  themeVersion: text("theme_version"),
  storeUrl: text("store_url").notNull(),
  category: text("category").notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  stepsToReproduce: text("steps_to_reproduce"),
  screenshotUrl: text("screenshot_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
