"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cx } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone bg-paper/90 backdrop-blur-md">
        <div className="container-shell flex h-[4.25rem] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 text-forest no-underline">
            <Image
              src="/logo/mark-light.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-md"
              priority
            />
            <span className="font-heading text-[1.35rem] font-semibold tracking-tight">
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

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted no-underline transition-colors hover:text-forest",
                  isActive(pathname, item.href) && "font-semibold text-forest",
                )}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-6 inline-flex items-center rounded-md bg-forest px-3.5 py-2 text-sm font-medium text-paper no-underline transition-colors hover:bg-forest-mid"
            >
              Discuss a project
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone bg-paper text-forest lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <Transition as={Fragment} show={mobileMenuOpen}>
        <Dialog as="div" className="relative z-[9999] lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full h-full flex-col overflow-y-auto bg-paper">
                <div className="container-shell flex h-[4.25rem] items-center justify-between border-b border-stone">
                  <span className="font-heading text-lg font-semibold text-forest">Menu</span>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone bg-paper text-forest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X size={22} strokeWidth={1.75} />
                  </button>
                </div>
                <nav aria-label="Mobile" className="container-shell flex flex-col gap-1 py-6">
                  {site.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cx(
                        "rounded-md px-3 py-3 text-base font-medium text-graphite no-underline",
                        isActive(pathname, item.href) && "bg-sage text-forest",
                      )}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-4 border-t border-stone pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-md bg-forest px-3.5 py-3 text-base font-medium text-paper no-underline w-full"
                    >
                      Discuss a project
                    </Link>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
