import { LanguageMode } from '../types';

interface FooterProps {
  lang: LanguageMode;
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-slate-800">
          <div className="max-w-md">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              SALMAN DRIVER BASE
            </p>
            <p className="text-sm text-emerald-400 mt-1">
              Your Trusted Driver Service Partner.
            </p>
            <p className="urdu-text text-sm text-slate-300 mt-3">
              کراچی میں اب حاصل کریں قابل اعتماد ڈرائیور سروس — پرائیویٹ کار، فیملی، آفس، کمپنی اور فل ٹائم ڈرائیورز۔
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold text-white mb-3">
                {lang === 'ur' ? 'سروسز' : 'Driver Services'}
              </p>
              <ul className="space-y-2 text-slate-400">
                <li>Private Car Driver</li>
                <li>Family Driver</li>
                <li>Office Driver</li>
                <li>Company Driver</li>
                <li>Full-Time Driver</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white mb-3">
                {lang === 'ur' ? 'رابطہ و علاقہ' : 'Navigation'}
              </p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="hover:text-white transition-colors">
                    Karachi Coverage
                  </a>
                </li>
                <li>
                  <a href="#portal" className="hover:text-white transition-colors">
                    Request a Driver
                  </a>
                </li>
                <li>
                  <a href="#portal-register" className="hover:text-white transition-colors">
                    Driver Registration
                  </a>
                </li>
                <li>
                  <a href="#dispatch" className="hover:text-white transition-colors">
                    Dispatch Board
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SALMAN DRIVER BASE · Karachi, Pakistan</p>
          <p>Service Area: Karachi, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
