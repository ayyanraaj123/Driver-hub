import { useState } from 'react';
import { CarFront } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle = 'SALMAN DRIVER BASE',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white"
      >
        <CarFront className="w-10 h-10 text-emerald-400 mb-3" strokeWidth={1.5} />
        <p className="font-display font-semibold text-base tracking-tight">{fallbackTitle}</p>
        <p className="text-xs text-slate-300 mt-1">Karachi, Pakistan</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
