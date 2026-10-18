import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { themes } from "@/data/themes";

export function Footer() {
  return (
    <footer className="mt-auto bg-forest text-paper">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-paper no-underline">
              <Image
                src="/logo/mark-dark.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-md"
              />
              <span className="font-heading text-xl font-semibold tracking-tight">
                <span className="text-copper" aria-hidden="true">
                  &lt;
                </span>
                Devs
                <span className="text-copper" aria-hidden="true">
                  /&gt;
                </span>
                <span className="sr-only">DEVS home</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage">
              {site.tagline} Independent Shopify development, theme engineering, and product support.
            </p>
            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-copper">
              Build · Customize · Support · Grow
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-heading text-sm font-semibold">Studio</p>
            <ul className="mt-3 space-y-2.5">
              {site.footerGroups.studio.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-sage no-underline hover:text-paper leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-heading text-sm font-semibold">Services</p>
            <ul className="mt-3 space-y-2.5">
              {site.footerGroups.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-sage no-underline hover:text-paper leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-heading text-sm font-semibold">Themes &amp; support</p>
            <ul className="mt-3 space-y-2.5">
              {site.footerGroups.products.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-sage no-underline hover:text-paper leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
              {themes.map((theme) => (
                <li key={theme.slug}>
                  <Link href={`/themes/${theme.slug}`} className="text-sm text-sage no-underline hover:text-paper leading-relaxed">
                    {theme.name}
                    {theme.status === "development" ? " (preview)" : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-forest-mid pt-6 text-sm text-sage md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DEVS. Independent Shopify development studio.</p>
          <p>Not affiliated with or endorsed by Shopify Inc.</p>
        </div>
      </div>
    </footer>
  );
}
