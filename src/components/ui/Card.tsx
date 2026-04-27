type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
};

export function Card({ children, className = '', as: Component = 'div' }: CardProps) {
  return (
    <Component
      className={`rounded-lg border border-border/20 bg-panel/62 shadow-2xl shadow-black/10 backdrop-blur-xl ${className}`}
    >
      {children}
    </Component>
  );
}
