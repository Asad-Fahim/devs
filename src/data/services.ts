export type Service = {
  slug: string;
  title: string;
  navLabel: string;
  teaser: string;
  lede: string;
  problems: { title: string; body: string }[];
  deliverables: string[];
  includes: string[];
  outOfScope: string[];
  shopifyCapabilities: string[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "theme-customization",
    title: "Theme customization",
    navLabel: "Theme customization",
    teaser: "Adapt an existing Shopify theme so it matches how you actually sell.",
    lede: "Most stores do not need a new theme from scratch. They need the current theme to present products clearly, behave on mobile, and give merchants control in the editor. Theme customization covers layout, styling, configuration, and focused template work on a theme you already use.",
    problems: [
      {
        title: "The theme almost fits",
        body: "A purchased or default theme gets you close, then product cards, navigation, or campaign pages start fighting the brand.",
      },
      {
        title: "Editor settings are not enough",
        body: "Theme settings can only go so far. Structural changes to templates, sections, or CSS are often required.",
      },
      {
        title: "Small changes keep accumulating",
        body: "Untracked edits make upgrades harder. Customization should stay documented and upgrade-aware.",
      },
    ],
    deliverables: [
      "Scoped changes to an existing Online Store 2.0 theme",
      "Template, section, and style adjustments",
      "Theme editor configuration where it is the right tool",
      "Notes on what changed and how to maintain it",
    ],
    includes: [
      "Work on a duplicate theme until you approve the result",
      "Desktop and mobile review of the templates in scope",
      "Handover of the customized theme in your Shopify admin",
    ],
    outOfScope: [
      "A brand-new custom theme (see custom theme development)",
      "App development or third-party app configuration unless scoped",
      "Open-ended design exploration without an agreed brief",
    ],
    shopifyCapabilities: [
      "JSON templates",
      "Theme editor settings",
      "Section and block schema",
      "Liquid, CSS, and JavaScript in the theme",
    ],
    faqs: [
      {
        question: "Can you customize a theme I bought from the Shopify Theme Store?",
        answer:
          "Yes. Work is done on a copy of the theme so the live store stays stable until you publish. Customizations can affect how easily you install official theme updates; that trade-off is discussed during scoping.",
      },
      {
        question: "Do I need a redesign?",
        answer:
          "Not always. Many projects are layout, spacing, product-card, or navigation changes inside the current visual system. If the theme is a poor fit, we will say so rather than customize around a structural problem.",
      },
    ],
    seoTitle: "Shopify Theme Customization",
    seoDescription:
      "Customization of existing Shopify themes: templates, sections, styling, and editor configuration for stores that need a better fit without a full rebuild.",
  },
  {
    slug: "custom-sections",
    title: "Custom sections and features",
    navLabel: "Custom sections",
    teaser: "Merchant-editable sections and storefront features that belong in the theme.",
    lede: "Campaign pages, product storytelling, and merchandising tools work best when they live in the theme editor — not in a one-off code snippet. This service covers custom sections, blocks, and focused storefront features that merchants can reuse.",
    problems: [
      {
        title: "Landing pages require a developer every time",
        body: "If marketing cannot assemble a page from sections, every campaign becomes a ticket.",
      },
      {
        title: "Features were hard-coded",
        body: "Hard-coded markup is fast to ship and expensive to change. Section settings and blocks keep content editable.",
      },
      {
        title: "Apps are doing theme work",
        body: "Some storefront needs belong in the theme: editorial modules, product supplements, or navigation patterns.",
      },
    ],
    deliverables: [
      "Custom Shopify sections with schema settings and blocks",
      "Responsive layouts that hold up across breakpoints",
      "Editor-friendly labels, help text, and defaults",
      "A short usage note so the team can assemble pages without guesswork",
    ],
    includes: [
      "Section design implementation from an agreed reference or brief",
      "Settings for content, layout, and visibility where useful",
      "Testing in the theme editor on representative templates",
    ],
    outOfScope: [
      "Public Shopify app development",
      "Checkout extensibility unless separately scoped (Plus-dependent)",
      "Unbounded feature lists without a defined first release",
    ],
    shopifyCapabilities: [
      "Section schema and blocks",
      "Theme app extension patterns when appropriate",
      "Metafield-aware section content",
      "Responsive CSS and Liquid",
    ],
    faqs: [
      {
        question: "Will I be able to edit the section myself?",
        answer:
          "That is the point. Settings, blocks, and labels are written so a merchant can update copy, images, and layout options without opening the code.",
      },
      {
        question: "Can you copy a section from another store?",
        answer:
          "We can use a reference for layout and content structure. We do not copy another theme’s proprietary code. Implementation is original work inside your theme.",
      },
    ],
    seoTitle: "Custom Shopify Sections and Features",
    seoDescription:
      "Merchant-editable Shopify sections, blocks, and storefront features designed so marketing teams can build pages without waiting on a developer.",
  },
  {
    slug: "store-development",
    title: "Shopify store development",
    navLabel: "Store development",
    teaser: "Stand up a storefront that is ready to launch, not just installed.",
    lede: "Store development covers the path from a blank or incomplete Shopify shop to a coherent storefront: navigation, templates, product presentation, core pages, and launch checks. It is implementation work, not a generic website package.",
    problems: [
      {
        title: "The admin is set up, the storefront is not",
        body: "Products exist, but collection pages, navigation, and templates still look like a default theme.",
      },
      {
        title: "Launch is a pile of leftovers",
        body: "Legal pages, search, cart, 404, password, and email notifications are easy to forget until a customer hits them.",
      },
      {
        title: "Too many tools, not enough structure",
        body: "Apps, page builders, and leftover demo content make the store harder to run after launch.",
      },
    ],
    deliverables: [
      "Theme implementation against an agreed sitemap and templates",
      "Navigation, product, and collection presentation",
      "Core pages required for a public storefront",
      "A launch checklist covering the templates in scope",
    ],
    includes: [
      "Work in a theme preview or duplicate until you publish",
      "Content entry for agreed templates when copy and assets are supplied",
      "A handover of how to update the main templates",
    ],
    outOfScope: [
      "Product photography, copywriting, or brand identity unless scoped",
      "Paid ads, email marketing, or ERP integrations unless scoped",
      "Guaranteed ranking, conversion rate, or revenue outcomes",
    ],
    shopifyCapabilities: [
      "Online Store 2.0 themes",
      "Navigation and menus",
      "Product and collection templates",
      "Shopify markets configuration support when in scope",
    ],
    faqs: [
      {
        question: "Do you also fill the catalog?",
        answer:
          "Catalog structure can be part of the project. Bulk product data, photography, and long-form copy need to be supplied or scoped separately. The storefront cannot invent a catalog.",
      },
      {
        question: "Can this include a custom theme?",
        answer:
          "Store development can use a Theme Store theme, a DEVS theme, or a custom theme. Custom theme architecture is a different service if you need a theme built from scratch.",
      },
    ],
    seoTitle: "Shopify Store Development",
    seoDescription:
      "Shopify storefront implementation: templates, navigation, product and collection presentation, and launch preparation for growing ecommerce businesses.",
  },
  {
    slug: "theme-development",
    title: "Custom theme development",
    navLabel: "Theme development",
    teaser: "A theme designed around your catalog, not the other way around.",
    lede: "Custom theme development is for merchants whose catalog, merchandising, or brand cannot be expressed well by an existing theme. It is a structured build: discovery, architecture, reusable sections, settings, testing, documentation, and handover. It is client work, distinct from DEVS Theme Store products.",
    problems: [
      {
        title: "Every purchased theme needs fighting",
        body: "If you spend more time undoing a theme than using it, a custom architecture may be cheaper over a season than another round of customization.",
      },
      {
        title: "The catalog has specific templates",
        body: "Bundles, complex variants, editorial lookbooks, or B2B-style presentation often need first-class templates.",
      },
      {
        title: "Handover was an afterthought",
        body: "A custom theme that only the original developer understands is a liability. Documentation is part of the build.",
      },
    ],
    deliverables: [
      "Discovery notes and an agreed template inventory",
      "Theme architecture with reusable sections and settings",
      "Implementation of the agreed templates",
      "Internal documentation covering settings and content patterns",
      "Handover in your Shopify admin",
    ],
    includes: [
      "A staged build with review points, not a single dump of code",
      "Responsive testing of templates in scope",
      "A distinction between merchant-editable settings and code-level changes",
    ],
    outOfScope: [
      "Publishing the custom theme to the Shopify Theme Store",
      "Ongoing feature development after handover unless a maintenance agreement exists",
      "Pixel-perfect recreation of another commercial theme",
    ],
    shopifyCapabilities: [
      "Online Store 2.0 architecture",
      "JSON templates and section groups",
      "Theme settings and section schema",
      "Liquid, CSS, and storefront JavaScript",
    ],
    faqs: [
      {
        question: "Is this the same as buying a DEVS theme?",
        answer:
          "No. Theme Store products are DEVS-owned, documented, and supported for many merchants. Custom theme development is built for one client, owned by that client under the project agreement, and is not listed on the Theme Store.",
      },
      {
        question: "How long does a custom theme take?",
        answer:
          "It depends on the template inventory, design readiness, and catalog complexity. Timelines are estimated after discovery, not promised from a homepage.",
      },
    ],
    seoTitle: "Custom Shopify Theme Development",
    seoDescription:
      "Custom Shopify theme architecture and implementation for merchants who need reusable sections, settings, documentation, and a maintainable storefront.",
  },
  {
    slug: "maintenance",
    title: "Maintenance and troubleshooting",
    navLabel: "Maintenance",
    teaser: "Scoped fixes, investigations, and agreed ongoing maintenance.",
    lede: "Stores accumulate small failures: a broken section after an app update, a layout issue on a new device, a theme setting that no longer behaves. Maintenance and troubleshooting is scoped work — not an unlimited emergency desk.",
    problems: [
      {
        title: "Something broke and the cause is unclear",
        body: "Theme code, apps, and content all interact. Useful troubleshooting starts with reproduction, not guesswork.",
      },
      {
        title: "You need a known person for small changes",
        body: "A maintenance agreement can cover a defined amount of theme work each month instead of starting a new project every time.",
      },
      {
        title: "Updates feel risky",
        body: "Theme and app updates are safer when someone can review the preview and catch layout regressions.",
      },
    ],
    deliverables: [
      "Investigation of a reproduced issue in the theme or storefront",
      "A scoped fix, configuration change, or a clear explanation if the cause sits outside the theme",
      "Optional monthly maintenance with an agreed scope",
    ],
    includes: [
      "Work against a written brief or reproduction steps",
      "A summary of what changed",
      "A recommendation when the right next step is a larger project",
    ],
    outOfScope: [
      "24/7 or emergency on-call coverage",
      "Fixing third-party apps we do not control",
      "Recovering a store after credential loss or a compromised account",
    ],
    shopifyCapabilities: [
      "Theme code review",
      "Theme editor configuration",
      "App embed and block conflict checks",
      "Preview-theme testing",
    ],
    faqs: [
      {
        question: "Is this the same as theme product support?",
        answer:
          "No. Theme product support covers DEVS Theme Store products for merchants using those themes. Maintenance is a paid service for any Shopify storefront, including custom or third-party themes.",
      },
      {
        question: "Do you offer emergency support?",
        answer:
          "Not as a standing 24/7 service. Urgent work can sometimes be scheduled during business hours depending on current capacity. If you need contractual emergency coverage, that has to be agreed in writing.",
      },
    ],
    seoTitle: "Shopify Theme Maintenance and Troubleshooting",
    seoDescription:
      "Scoped Shopify troubleshooting, theme fixes, and optional maintenance agreements. No 24/7 claims — clear investigation and handover.",
  },
  {
    slug: "performance",
    title: "Speed and performance optimization",
    navLabel: "Performance",
    teaser: "Measure what is slow, then change the things that actually move it.",
    lede: "Performance work starts with measurement on the templates that matter: home, collection, product, and cart. The goal is practical improvement — images, scripts, CSS, and third-party weight — not a promised Lighthouse screenshot.",
    problems: [
      {
        title: "The store feels heavy on mobile",
        body: "Large media, unused JavaScript, and stacked apps are the usual causes. Guessing which one without measurement wastes the budget.",
      },
      {
        title: "A previous audit was a PDF with no implementation",
        body: "An audit is only useful if someone then changes the theme, apps, or media pipeline.",
      },
      {
        title: "Apps conflict with the theme",
        body: "Many storefront delays come from app embeds, not Liquid. That has to be part of the review.",
      },
    ],
    deliverables: [
      "A measurement snapshot of agreed templates before changes",
      "A prioritized list of theme, media, and script changes",
      "Implementation of the agreed items",
      "A second measurement snapshot after the work",
    ],
    includes: [
      "Review of image usage, fonts, CSS, and theme JavaScript",
      "Notes on app embeds that sit outside theme control",
      "Changes made on a duplicate theme until you publish",
    ],
    outOfScope: [
      "Guaranteed Lighthouse, PageSpeed, or Core Web Vitals scores",
      "Search ranking improvements",
      "Replacing a theme solely to chase a lab score",
    ],
    shopifyCapabilities: [
      "Theme asset loading",
      "Responsive images and media",
      "App embed review",
      "Checkout performance is largely outside storefront theme control",
    ],
    faqs: [
      {
        question: "Can you guarantee a 90+ Lighthouse score?",
        answer:
          "No. Lab scores depend on catalog media, apps, third-party scripts, and Shopify’s own storefront pipeline. We measure, reduce what we can control, and report what we cannot.",
      },
      {
        question: "Will this increase conversion rate?",
        answer:
          "Faster pages can remove friction. Conversion depends on offer, trust, shipping, and merchandising as well. Performance work is not a conversion-rate contract.",
      },
    ],
    seoTitle: "Shopify Speed and Performance Optimization",
    seoDescription:
      "Practical Shopify storefront performance work: measurement, image and asset review, script weight, and implementation — without guaranteed scores.",
  },
  {
    slug: "shopify-plus",
    title: "Shopify Plus development",
    navLabel: "Shopify Plus",
    teaser: "Plus-aware storefront work when your account actually has those capabilities.",
    lede: "Shopify Plus is an account type with additional capabilities, not a visual style. Work in this service is scoped against the features available on your Plus store — for example checkout extensibility, Shopify Functions, or launch-oriented storefront needs — without implying access to tools your plan does not include.",
    problems: [
      {
        title: "The storefront has outgrown a basic theme tweak",
        body: "Higher catalog complexity, markets, or B2B presentation often need a more deliberate theme architecture.",
      },
      {
        title: "Checkout requirements are specific",
        body: "Checkout changes are plan- and feature-dependent. They are scoped only when the store can actually use them.",
      },
      {
        title: "Agencies over-promise Plus features",
        body: "Not every Plus store uses Functions, checkout UI extensions, or Launchpad. The brief should match the account.",
      },
    ],
    deliverables: [
      "Storefront or theme work scoped to a Plus merchant’s actual capabilities",
      "Clear separation between theme work and checkout/Functions work",
      "Implementation of the agreed items only",
    ],
    includes: [
      "A short capability check before promising Plus-only features",
      "Theme or extensibility work that you can review in a preview",
      "Handover notes for whatever is implemented",
    ],
    outOfScope: [
      "Claiming or granting Shopify Plus on your behalf",
      "Features that require plan access you do not have",
      "Enterprise systems integration unless separately scoped",
    ],
    shopifyCapabilities: [
      "Plus storefront themes",
      "Checkout extensibility where the account supports it",
      "Shopify Functions where the account supports it",
      "Markets and B2B features already enabled on the store",
    ],
    faqs: [
      {
        question: "I am not on Plus. Can I still work with DEVS?",
        answer:
          "Yes. Most DEVS services apply to any Shopify storefront. Plus-specific work is only relevant if your account includes those capabilities.",
      },
      {
        question: "Do you build checkout apps?",
        answer:
          "Checkout UI extensions and Functions can be scoped when the store can use them. They are not bundled into ordinary theme customization.",
      },
    ],
    seoTitle: "Shopify Plus Development",
    seoDescription:
      "Shopify Plus storefront and extensibility work scoped to the features your account actually includes. No implied access and no plan upselling.",
  },
  {
    slug: "accessibility-seo",
    title: "Accessibility and SEO improvements",
    navLabel: "Accessibility & SEO",
    teaser: "Structure, keyboard use, contrast, metadata, and crawlable templates.",
    lede: "Accessibility and SEO share a foundation: semantic HTML, sensible headings, usable forms, and pages that a browser and a crawler can understand. This service improves those foundations in the theme. It does not certify WCAG compliance or guarantee rankings.",
    problems: [
      {
        title: "Keyboard and screen-reader use was never tested",
        body: "Menus, filters, and drawers often trap focus or hide labels. Those are theme problems, not content problems.",
      },
      {
        title: "Metadata is leftover demo content",
        body: "Title templates, canonical tags, and heading structure are frequently wrong after a rushed launch.",
      },
      {
        title: "Contrast and tap targets fail on mobile",
        body: "Brand colors and compact navigation can fall below readable contrast or usable size.",
      },
    ],
    deliverables: [
      "A review of agreed templates for structure, labels, keyboard use, and metadata",
      "Theme changes for the issues you choose to fix",
      "A written list of remaining issues that are content, app, or media problems",
    ],
    includes: [
      "Semantic heading and landmark review",
      "Form label and error-message review on theme forms",
      "Metadata and canonical review for templates in scope",
    ],
    outOfScope: [
      "WCAG certification or a legal accessibility audit",
      "Guaranteed search rankings or rich-result eligibility",
      "Rewriting your entire catalog’s alt text and copy unless scoped",
    ],
    shopifyCapabilities: [
      "Theme HTML and ARIA where native HTML is not enough",
      "Focus management in theme JavaScript",
      "Online Store metadata, title templates, and structured data when accurate",
      "Image alt attributes in theme snippets (catalog media still needs content)",
    ],
    faqs: [
      {
        question: "Will this make the store WCAG compliant?",
        answer:
          "No service can honestly certify that from a theme pass alone. We improve the theme against WCAG 2.2 AA practices and document remaining content or app issues. Certification, if you need it, is a separate audit.",
      },
      {
        question: "Do you add review stars and FAQ schema?",
        answer:
          "Only when the underlying data is real. Fabricated ratings, reviews, or FAQ schema is not something we implement.",
      },
    ],
    seoTitle: "Shopify Accessibility and SEO Improvements",
    seoDescription:
      "Theme-level accessibility and SEO improvements for Shopify storefronts: structure, keyboard use, contrast, metadata, and crawlable templates.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSelectOptions = services.map((service) => ({
  value: service.slug,
  label: service.navLabel,
}));
