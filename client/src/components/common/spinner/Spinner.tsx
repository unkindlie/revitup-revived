const sizes = {
  sm: '25px',
  md: '50px',
  lg: '75px',
};

type Size = keyof typeof sizes;

const bars = Array(12).fill(0);

export const Spinner = ({
  className,
  size = 'md',
}: {
  className?: string;
  size?: Size;
}) => {
  return (
    <div
      className={['sonner-loading-wrapper', className]
        .filter(Boolean)
        .join(' ')}
      style={{ '--size': sizes[size] } as React.CSSProperties}
    >
      <div className="sonner-spinner">
        {bars.map((_, i) => (
          <div className="sonner-loading-bar" key={`spinner-bar-${i}`} />
        ))}
      </div>
    </div>
  );
};
