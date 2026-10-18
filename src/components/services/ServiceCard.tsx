import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-3xl border border-stone bg-white p-8 transition-all hover:border-stone/80 hover:shadow-md"
    >
      <h3 className="font-heading text-xl font-semibold text-forest">
        {service.title}
      </h3>
      <p className="mt-3 text-muted">{service.teaser}</p>
      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-copper transition-colors group-hover:text-copper-deep">
          Learn more <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
