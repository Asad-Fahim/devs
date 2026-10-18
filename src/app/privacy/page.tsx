import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy",
  description: "How DEVS collects and uses information submitted through the service enquiry and theme support forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede="This policy describes the information this website actually collects. It is not a generic template claiming that no data is processed."
      />
      <article className="container-shell max-w-3xl space-y-8 py-14">
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Who this covers</h2>
          <p className="mt-3 text-muted">
            This website is operated by DEVS, an independent Shopify development studio. Contact is through the forms
            on this site. No company registration number, postal address, or dedicated privacy email is published here
            because those details have not been supplied as public legal copy.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Information we collect</h2>
          <h3 className="mt-4 font-heading text-lg font-semibold text-forest">Service enquiry form</h3>
          <p className="mt-2 text-muted">
            Name, business email, optional store URL, selected service, project description, optional budget range,
            optional timeline, and optional reference URL. A privacy acknowledgement is stored as part of the
            submission.
          </p>
          <h3 className="mt-4 font-heading text-lg font-semibold text-forest">Theme support form</h3>
          <p className="mt-2 text-muted">
            Name, email, theme name, optional theme version, store URL, issue category, subject, description, optional
            reproduction steps, and an optional screenshot or recording URL.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Why it is collected</h2>
          <p className="mt-3 text-muted">
            Enquiries are used to understand project scope and reply. Support requests are used to investigate theme
            issues. Budget and timeline fields are qualification data, not quotes. Screenshot URLs are optional and
            should not include customer personal data, passwords, or access tokens.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">How submissions are processed</h2>
          <p className="mt-3 text-muted">
            Form submissions are stored in the website’s PostgreSQL database so they are not lost if email delivery
            fails. They are also sent through Web3Forms so DEVS receives an email notification. Web3Forms processes
            those messages according to its own terms and privacy documentation. Email is then handled by whatever
            inbox receives the Web3Forms notification.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Analytics and tracking</h2>
          <p className="mt-3 text-muted">
            This website does not currently load marketing pixels, advertising tags, or a third-party analytics
            script. Server logs from the hosting provider may include IP addresses and requested URLs as part of
            ordinary operations.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Retention and deletion</h2>
          <p className="mt-3 text-muted">
            Submissions are kept as long as they are needed to reply, deliver support, or keep a record of the
            request. To ask for deletion or a copy of a submission, send a new message through the contact form
            identifying the email address used originally.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-forest">Your rights</h2>
          <p className="mt-3 text-muted">
            Depending on where you live, you may have rights to access, correct, or delete personal data, or to object
            to processing. Use the contact form to make that request. This policy will be updated if analytics, extra
            processors, or a legal entity name are added.
          </p>
        </section>
      </article>
    </main>
  );
}
