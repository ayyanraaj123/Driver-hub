import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/content';
import { DriverCategory, LanguageMode } from '../types';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  lang: LanguageMode;
  onSelectCategory: (category: DriverCategory) => void;
}

export function ServicesSection({ lang, onSelectCategory }: ServicesSectionProps) {
  const featuredServices = SERVICES.filter((s) => s.image);
  const compactServices = SERVICES.filter((s) => !s.image);

  return (
    <section id="services" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-800 mb-2">
              {lang === 'ur' ? 'ہم فراہم کرتے ہیں' : 'Our Core Driver Categories'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {lang === 'ur'
                ? 'آپ کی ضرورت کے مطابق ہر قسم کے تجربہ کار ڈرائیور'
                : 'Five Specialized Driver Placements for Karachi Homes & Businesses'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-sm">
            {lang === 'ur'
              ? 'کسی بھی سروس کا انتخاب کریں اور فوری طور پر درخواست جمع کروائیں۔'
              : 'Select any driver category below to pre-fill your dispatch inquiry.'}
          </p>
        </div>

        {/* Asymmetric Bento Grid: 2 featured photo cards (3 cols each) + 3 structured text cards (2 cols each) */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {featuredServices.map((service) => (
            <article
              key={service.category}
              className="lg:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                  <ResilientImage
                    src={service.image!}
                    alt={service.imageAlt || service.titleEn}
                    className="w-full h-full object-cover"
                    fallbackTitle={service.titleEn}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-mono font-medium text-emerald-800">{service.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.typicalHours}</span>
                    <span aria-hidden="true">·</span>
                    <span className="urdu-text text-sm text-slate-700">{service.titleUr}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                    {service.index}. {service.titleEn}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
                    {lang === 'ur' ? service.summaryUr : service.summaryEn}
                  </p>

                  <p className="text-xs text-slate-500">
                    {lang === 'ur' ? service.idealForUr : service.idealForEn}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCategory(service.category)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                >
                  <span>
                    {lang === 'ur'
                      ? `${service.titleUr} بک کریں`
                      : `Request ${service.titleEn}`}
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}

          {compactServices.map((service) => (
            <article
              key={service.category}
              className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between transition-colors hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-mono font-medium text-emerald-800">{service.index}</span>
                  <span>{service.typicalHours}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900">
                  {service.index}. {service.titleEn}
                </h3>
                <p className="urdu-text text-base font-semibold text-emerald-900 mt-1 mb-3">
                  {service.titleUr}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {lang === 'ur' ? service.summaryUr : service.summaryEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <p className="text-xs text-slate-500">
                  {lang === 'ur' ? service.idealForUr : service.idealForEn}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectCategory(service.category)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors whitespace-nowrap self-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                >
                  <span>
                    {lang === 'ur' ? 'یہ ڈرائیور منتخب کریں' : `Select ${service.titleEn}`}
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
