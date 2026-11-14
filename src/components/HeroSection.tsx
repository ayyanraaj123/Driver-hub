import { ArrowRight, MapPin } from 'lucide-react';
import { HERO_IMAGE, VERIFICATION_STANDARDS } from '../data/content';
import { LanguageMode } from '../types';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  lang: LanguageMode;
  onChangeLang: (lang: LanguageMode) => void;
  onRequestDriver: () => void;
  onRegisterDriver: () => void;
}

export function HeroSection({
  lang,
  onChangeLang,
  onRequestDriver,
  onRegisterDriver,
}: HeroSectionProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pt-8 lg:pb-16">
        {/* Workspace language & regional bar (kept below top header per contract) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0" aria-hidden="true" />
            <span>Service Area: Karachi, Pakistan</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">Private, Family, Office, Company &amp; Full-Time</span>
          </div>

          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0"
          >
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('ur')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'ur'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اردو
            </button>
          </div>
        </div>

        {/* Asymmetric 2-column Hero Split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 lg:pt-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-emerald-800 tracking-tight mb-3">
                {lang === 'ur'
                  ? 'سلمان ڈرائیور بیس · کراچی، پاکستان'
                  : 'Your Trusted Driver Service Partner · Karachi'}
              </p>

              {lang === 'ur' ? (
                <>
                  <h1 className="urdu-text text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-slate-900 mb-4">
                    کراچی میں اب حاصل کریں قابل اعتماد ڈرائیور سروس!
                  </h1>
                  <p className="text-base sm:text-lg font-medium text-slate-700 mb-4">
                    Private Car · Family · Office · Company · Full-Time Drivers
                  </p>
                  <p className="urdu-text text-base text-slate-600 max-w-xl">
                    تصدیق شدہ شناختی کارڈ، معتبر ڈرائیونگ لائسنس اور کراچی کے تمام علاقوں سے مکمل واقفیت رکھنے والے پیشہ ور ڈرائیور۔ گاہک حضرات ڈرائیور کی ضرورت کے لیے رابطہ کریں اور ڈرائیور حضرات باعزت روزگار کے لیے رجسٹریشن کروائیں۔
                  </p>
                </>
              ) : (
                <>
                  <h1
                    className="font-display font-bold tracking-tight text-slate-900 mb-4"
                    style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.35rem)', lineHeight: 1.08 }}
                  >
                    Trusted, Verified Drivers Across Karachi
                  </h1>
                  <p className="urdu-text text-xl sm:text-2xl text-emerald-900 font-semibold mb-4">
                    کراچی میں اب حاصل کریں قابل اعتماد ڈرائیور سروس!
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    SALMAN DRIVER BASE connects households, executives, and companies in Karachi with vetted Private Car, Family, Office, Company, and Full-Time drivers—while creating dignified employment for experienced local drivers.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onRequestDriver}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
              >
                <span>{lang === 'ur' ? 'ڈرائیور کی ضرورت ہے — رابطہ کریں' : 'Request a Driver'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onRegisterDriver}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
              >
                <span>{lang === 'ur' ? 'ڈرائیور رجسٹریشن کروائیں' : 'Register as a Driver'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[280px] sm:min-h-[360px] lg:h-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Courteous professional Pakistani private car driver standing beside a white Toyota Corolla sedan in Clifton Karachi"
                className="w-full h-full object-cover"
                fallbackTitle="SALMAN DRIVER BASE · Karachi"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <p className="text-xs font-medium text-emerald-300 tracking-wide">
                  SALMAN DRIVER BASE · KARACHI
                </p>
                <p className="font-display text-base sm:text-lg font-semibold mt-1">
                  {lang === 'ur'
                    ? 'پرائیویٹ، فیملی، آفس، کمپنی اور فل ٹائم ڈرائیورز'
                    : 'Private Car · Family · Office · Company · Full-Time'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column standards strip below the hero split */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFICATION_STANDARDS.map((item) => (
            <div key={item.metric} className="flex flex-col gap-1">
              <span className="font-display text-lg font-bold text-slate-900 tabular-nums">
                {item.metric}
              </span>
              <span className="text-sm text-slate-600">
                {lang === 'ur' ? item.labelUr : item.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
