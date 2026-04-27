import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbsProps = {
  items: Array<{ name: string; href: string }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-8 text-sm text-muted sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={item.href}>
            {index > 0 && <ChevronRight aria-hidden className="h-4 w-4" />}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-foreground">
                {item.name}
              </span>
            ) : (
              <Link className="transition hover:text-accent" href={item.href}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
