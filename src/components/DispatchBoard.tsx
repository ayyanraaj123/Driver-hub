import { useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import {
  DriverRegistration,
  DriverRequest,
  LanguageMode,
  SubmissionStatus,
} from '../types';

interface DispatchBoardProps {
  lang: LanguageMode;
  requests: DriverRequest[];
  drivers: DriverRegistration[];
  loading: boolean;
  error: string | null;
  onUpdateRequestStatus: (id: string, status: SubmissionStatus) => Promise<void>;
  onDeleteRequest: (id: string) => Promise<void>;
  onUpdateDriverStatus: (id: string, status: SubmissionStatus) => Promise<void>;
  onDeleteDriver: (id: string) => Promise<void>;
  onOpenRequestForm: () => void;
  onOpenDriverForm: () => void;
}

const STATUS_FILTERS: Array<'All' | SubmissionStatus> = [
  'All',
  SubmissionStatus.PENDING,
  SubmissionStatus.VERIFIED,
  SubmissionStatus.ASSIGNED,
];

export function DispatchBoard({
  lang,
  requests,
  drivers,
  loading,
  error,
  onUpdateRequestStatus,
  onDeleteRequest,
  onUpdateDriverStatus,
  onDeleteDriver,
  onOpenRequestForm,
  onOpenDriverForm,
}: DispatchBoardProps) {
  const [boardTab, setBoardTab] = useState<'requests' | 'drivers'>('requests');
  const [statusFilter, setStatusFilter] = useState<'All' | SubmissionStatus>('All');
  const [query, setQuery] = useState('');

  const filteredRequests = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      if (statusFilter !== 'All' && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.clientName.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.referenceCode.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
      );
    });
  }, [requests, statusFilter, query]);

  const filteredDrivers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drivers.filter((d) => {
      if (statusFilter !== 'All' && d.status !== statusFilter) return false;
      if (!q) return true;
      return (
        d.fullName.toLowerCase().includes(q) ||
        d.referenceCode.toLowerCase().includes(q) ||
        d.licenseType.toLowerCase().includes(q) ||
        d.preferredAreas.some((a) => a.toLowerCase().includes(q)) ||
        d.preferredCategories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [drivers, statusFilter, query]);

  return (
    <section id="dispatch" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold text-emerald-800 mb-2">
              {lang === 'ur' ? 'لائیو ڈسپیچ اور رجسٹری' : 'Operations Registry'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {lang === 'ur'
                ? 'ڈرائیور درخواستیں اور رجسٹرڈ ڈرائیور ریکارڈ'
                : 'Karachi Dispatch Requests & Registered Drivers'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="tablist"
              aria-label="Dispatch board type"
              className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={boardTab === 'requests'}
                onClick={() => setBoardTab('requests')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  boardTab === 'requests'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Client Requests ({requests.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={boardTab === 'drivers'}
                onClick={() => setBoardTab('drivers')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  boardTab === 'drivers'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Registered Drivers ({drivers.length})
              </button>
            </div>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="relative w-full md:max-w-sm">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search dispatch records"
              placeholder={
                boardTab === 'requests'
                  ? 'Search by name, area, category, or REQ code...'
                  : 'Search by driver name, area, license, or DRV code...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F8F9FA] border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 p-4 rounded-lg border border-red-200 bg-red-50 text-sm text-red-900"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading Karachi dispatch registry...
          </div>
        ) : boardTab === 'requests' ? (
          filteredRequests.length === 0 ? (
            <div className="py-14 text-center border-b border-slate-100">
              <p className="font-display text-base font-semibold text-slate-900">
                {requests.length === 0
                  ? lang === 'ur'
                    ? 'ابھی تک کوئی گاہک درخواست درج نہیں ہوئی'
                    : 'No client driver requests submitted yet'
                  : 'No requests match your current search or status filter'}
              </p>
              <p className="text-sm text-slate-600 mt-1 mb-5">
                {lang === 'ur'
                  ? 'جب کوئی گاہک ڈرائیور کی درخواست جمع کروائے گا تو وہ یہاں فوری نظر آئے گی۔'
                  : 'Submitted inquiries from Karachi households and companies appear here immediately for verification and assignment.'}
              </p>
              <button
                type="button"
                onClick={onOpenRequestForm}
                className="px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'ur' ? 'نئی درخواست درج کریں' : 'Create a Driver Request'}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                    <th className="py-3.5 pr-4">Ref</th>
                    <th className="py-3.5 pr-4">Client &amp; Contact</th>
                    <th className="py-3.5 pr-4">Driver Type &amp; Shift</th>
                    <th className="py-3.5 pr-4">Karachi Area</th>
                    <th className="py-3.5 pr-4">Status</th>
                    <th className="py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70">
                      <td className="py-4 pr-4 font-mono text-xs font-medium text-slate-900 tabular-nums whitespace-nowrap">
                        {req.referenceCode}
                      </td>
                      <td className="py-4 pr-4">
                        <p className="font-medium text-slate-900">{req.clientName}</p>
                        <p className="font-mono text-xs text-slate-500 tabular-nums">{req.phone}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="font-medium text-slate-800">{req.category}</p>
                        <p className="text-xs text-slate-500">
                          {req.transmission} · {req.shift}
                        </p>
                      </td>
                      <td className="py-4 pr-4 text-slate-700">{req.area}</td>
                      <td className="py-4 pr-4">
                        <select
                          aria-label={`Status for ${req.referenceCode}`}
                          value={req.status}
                          onChange={(e) =>
                            onUpdateRequestStatus(req.id, e.target.value as SubmissionStatus)
                          }
                          className="px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        >
                          <option value={SubmissionStatus.PENDING}>Pending Verification</option>
                          <option value={SubmissionStatus.VERIFIED}>Verified</option>
                          <option value={SubmissionStatus.ASSIGNED}>Assigned</option>
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => onDeleteRequest(req.id)}
                          aria-label={`Remove request ${req.referenceCode}`}
                          className="p-2 text-slate-400 hover:text-red-700 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : filteredDrivers.length === 0 ? (
          <div className="py-14 text-center border-b border-slate-100">
            <p className="font-display text-base font-semibold text-slate-900">
              {drivers.length === 0
                ? lang === 'ur'
                  ? 'ابھی تک کوئی ڈرائیور رجسٹر نہیں ہوا'
                  : 'No driver registrations submitted yet'
                : 'No registered drivers match your current search or status filter'}
            </p>
            <p className="text-sm text-slate-600 mt-1 mb-5">
              {lang === 'ur'
                ? 'ڈرائیور حضرات کی رجسٹریشن یہاں محفوظ ہوتی ہے۔'
                : 'Drivers who register for Private, Family, Office, Company, or Full-Time roles appear here.'}
            </p>
            <button
              type="button"
              onClick={onOpenDriverForm}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'ur' ? 'ڈرائیور رجسٹر کریں' : 'Register a Driver'}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="py-3.5 pr-4">Driver ID</th>
                  <th className="py-3.5 pr-4">Name &amp; Phone</th>
                  <th className="py-3.5 pr-4">License &amp; Exp</th>
                  <th className="py-3.5 pr-4">Roles &amp; Areas</th>
                  <th className="py-3.5 pr-4">Status</th>
                  <th className="py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredDrivers.map((drv) => (
                  <tr key={drv.id} className="hover:bg-slate-50/70">
                    <td className="py-4 pr-4 font-mono text-xs font-medium text-slate-900 tabular-nums whitespace-nowrap">
                      {drv.referenceCode}
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-medium text-slate-900">{drv.fullName}</p>
                      <p className="font-mono text-xs text-slate-500 tabular-nums">
                        {drv.phone} · CNIC ****{drv.cnicLast4}
                      </p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-medium text-slate-800">{drv.licenseType}</p>
                      <p className="text-xs text-slate-500 tabular-nums">
                        {drv.experienceYears} yrs · {drv.transmission}
                      </p>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-slate-800">{drv.preferredCategories.join(' · ')}</p>
                      <p className="text-xs text-slate-500">{drv.preferredAreas.join(', ')}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <select
                        aria-label={`Status for ${drv.referenceCode}`}
                        value={drv.status}
                        onChange={(e) =>
                          onUpdateDriverStatus(drv.id, e.target.value as SubmissionStatus)
                        }
                        className="px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        <option value={SubmissionStatus.PENDING}>Pending Verification</option>
                        <option value={SubmissionStatus.VERIFIED}>Verified</option>
                        <option value={SubmissionStatus.ASSIGNED}>Assigned</option>
                      </select>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onDeleteDriver(drv.id)}
                        aria-label={`Remove driver ${drv.referenceCode}`}
                        className="p-2 text-slate-400 hover:text-red-700 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
