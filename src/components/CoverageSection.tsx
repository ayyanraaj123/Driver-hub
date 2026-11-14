import { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { KARACHI_ZONES } from '../data/content';
import { LanguageMode } from '../types';

interface CoverageSectionProps {
  lang: LanguageMode;
  onSelectAreaForRequest: (areaLabel: string) => void;
}

export function CoverageSection({ lang, onSelectAreaForRequest }: CoverageSectionProps) {
  const [activeZoneId, setActiveZoneId] = useState<string>(KARACHI_ZONES[0].id);
  const activeZone = KARACHI_ZONES.find((z) => z.id === activeZoneId) ?? KARACHI_ZONES[0];

  return (
    <section id="coverage" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-emerald-800 mb-2">
            {lang === 'ur' ? 'سروس ایریا: کراچی، پاکستان' : 'Service Area: Karachi, Pakistan'}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {lang === 'ur'
              ? 'کراچی کے تمام اہم رہائشی اور کاروباری علاقوں میں دستیاب'
              : 'City-Wide Dispatch Across Six Major Karachi Zones'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Zone selector buttons (functional interactive tabs) */}
          <div
            role="tablist"
            aria-label="Karachi coverage zones"
            className="lg:col-span-5 flex flex-col gap-2"
          >
            {KARACHI_ZONES.map((zone) => {
              const isActive = zone.id === activeZone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-[#F8F9FA] text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-display text-sm sm:text-base font-semibold truncate">
                      {zone.nameEn}
                    </p>
                    <p
                      className={`urdu-text text-xs mt-0.5 truncate ${
                        isActive ? 'text-emerald-300' : 'text-slate-500'
                      }`}
                    >
                      {zone.nameUr}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-mono shrink-0 ${
                      isActive ? 'text-emerald-300' : 'text-slate-500'
                    }`}
                  >
                    {zone.neighborhoods.length} Areas
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected zone detail panel */}
          <div
            role="tabpanel"
            className="lg:col-span-7 bg-[#F8F9FA] border border-slate-200 rounded-xl p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
              <div className="flex items-center gap-2 text-emerald-800">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold">{activeZone.nameEn}</span>
              </div>
              <span className="text-xs font-mono text-slate-600">
                {activeZone.readinessWindow}
              </span>
            </div>

            <p className="urdu-text text-xl font-semibold text-slate-900 mt-5">
              {activeZone.nameUr}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 mb-2">
                  {lang === 'ur' ? 'شامل علاقے' : 'Neighborhoods Covered'}
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {activeZone.neighborhoods.join(' · ')}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 mb-2">
                  {lang === 'ur' ? 'اہم شاہراہیں' : 'Key Commute Corridors'}
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed">{activeZone.corridors}</p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  {lang === 'ur' ? 'زیادہ طلب سروسز' : 'Most Requested in This Zone'}
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {lang === 'ur' ? activeZone.primaryDemandUr : activeZone.primaryDemandEn}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectAreaForRequest(activeZone.neighborhoods[0])}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
              >
                <span>
                  {lang === 'ur' ? 'اس علاقے میں ڈرائیور بک کریں' : 'Request in This Zone'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
