type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>}
            {description && <p className="mt-5 text-lg leading-8 text-muted">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
