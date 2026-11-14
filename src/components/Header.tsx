import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageMode } from '../types';

interface HeaderProps {
  lang: LanguageMode;
  onBookClick: () => void;
  onRegisterClick: () => void;
}

export function Header({ lang, onBookClick, onRegisterClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems =
    lang === 'ur'
      ? [
          { href: '#services', label: 'سروسز', action: undefined },
          { href: '#coverage', label: 'کراچی کوریج', action: undefined },
          { href: '#portal', label: 'ڈرائیور بکنگ', action: onBookClick },
          { href: '#portal-register', label: 'ڈرائیور رجسٹریشن', action: onRegisterClick },
          { href: '#dispatch', label: 'ڈسپیچ بورڈ', action: undefined },
        ]
      : [
          { href: '#services', label: 'Services', action: undefined },
          { href: '#coverage', label: 'Coverage', action: undefined },
          { href: '#portal', label: 'Request Driver', action: onBookClick },
          { href: '#portal-register', label: 'Register Driver', action: onRegisterClick },
          { href: '#dispatch', label: 'Dispatch', action: undefined },
        ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
        >
          SALMAN DRIVER BASE
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={
                item.action
                  ? (e) => {
                      e.preventDefault();
                      item.action!();
                    }
                  : undefined
              }
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookClick}
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
          >
            {lang === 'ur' ? 'ڈرائیور حاصل کریں' : 'Book a Driver'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                setMobileOpen(false);
                if (item.action) {
                  e.preventDefault();
                  item.action();
                }
              }}
              className="py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
