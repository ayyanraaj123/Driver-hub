import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { DRIVER_PORTRAIT_IMAGE, KARACHI_AREA_OPTIONS } from '../data/content';
import {
  DriverCategory,
  DriverRegistration,
  DriverRequest,
  LanguageMode,
  LicenseCategory,
  ShiftType,
  TransmissionType,
} from '../types';
import { ResilientImage } from './ResilientImage';

interface PortalFormsSectionProps {
  lang: LanguageMode;
  activeTab: 'request' | 'register';
  onTabChange: (tab: 'request' | 'register') => void;
  preselectedCategory: DriverCategory;
  preselectedArea: string;
  onRequestCreated: (item: DriverRequest) => void;
  onDriverCreated: (item: DriverRegistration) => void;
}

const ALL_CATEGORIES = Object.values(DriverCategory);

export function PortalFormsSection({
  lang,
  activeTab,
  onTabChange,
  preselectedCategory,
  preselectedArea,
  onRequestCreated,
  onDriverCreated,
}: PortalFormsSectionProps) {
  // Client Request Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientArea, setClientArea] = useState(preselectedArea || KARACHI_AREA_OPTIONS[0]);
  const [category, setCategory] = useState<DriverCategory>(preselectedCategory);
  const [transmission, setTransmission] = useState<TransmissionType>(TransmissionType.BOTH);
  const [shift, setShift] = useState<ShiftType>(ShiftType.DAY_SHIFT);
  const [vehicleModel, setVehicleModel] = useState('');
  const [notes, setNotes] = useState('');
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSuccess, setRequestSuccess] = useState<DriverRequest | null>(null);

  // Driver Registration Form State
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [cnicLast4, setCnicLast4] = useState('');
  const [licenseType, setLicenseType] = useState<LicenseCategory>(LicenseCategory.LTV);
  const [experienceYears, setExperienceYears] = useState('4');
  const [driverTransmission, setDriverTransmission] = useState<TransmissionType>(
    TransmissionType.BOTH
  );
  const [preferredCategories, setPreferredCategories] = useState<DriverCategory[]>([
    DriverCategory.PRIVATE_CAR,
    DriverCategory.FAMILY,
  ]);
  const [preferredAreas, setPreferredAreas] = useState<string[]>([
    KARACHI_AREA_OPTIONS[0],
    KARACHI_AREA_OPTIONS[1],
  ]);
  const [driverSubmitting, setDriverSubmitting] = useState(false);
  const [driverError, setDriverError] = useState<string | null>(null);
  const [driverSuccess, setDriverSuccess] = useState<DriverRegistration | null>(null);

  useEffect(() => {
    setCategory(preselectedCategory);
  }, [preselectedCategory]);

  useEffect(() => {
    if (preselectedArea) {
      const matched = KARACHI_AREA_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(preselectedArea.toLowerCase().split(' ')[0])
      );
      setClientArea(matched ?? preselectedArea);
    }
  }, [preselectedArea]);

  function toggleDriverCategory(cat: DriverCategory) {
    setPreferredCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function toggleDriverArea(area: string) {
    setPreferredAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  async function handleClientSubmit(e: FormEvent) {
    e.preventDefault();
    setRequestError(null);

    const digits = clientPhone.replace(/\D/g, '');
    if (clientName.trim().length < 2) {
      setRequestError(
        lang === 'ur' ? 'براہ کرم اپنا مکمل نام درج کریں۔' : 'Please enter your full name.'
      );
      return;
    }
    if (digits.length < 10 || digits.length > 13) {
      setRequestError(
        lang === 'ur'
          ? 'براہ کرم درست پاکستانی موبائل یا واٹس ایپ نمبر درج کریں (مثلاً 0300-1234567)۔'
          : 'Please enter a valid Pakistani mobile or WhatsApp number (e.g. 0300-1234567).'
      );
      return;
    }

    setRequestSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          phone: clientPhone.trim(),
          area: clientArea,
          category,
          transmission,
          shift,
          vehicleModel: vehicleModel.trim(),
          notes: notes.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit driver request.');
      }
      setRequestSuccess(data.item);
      onRequestCreated(data.item);
      setClientName('');
      setClientPhone('');
      setVehicleModel('');
      setNotes('');
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : 'Unable to submit request.');
    } finally {
      setRequestSubmitting(false);
    }
  }

  async function handleDriverSubmit(e: FormEvent) {
    e.preventDefault();
    setDriverError(null);

    const digits = driverPhone.replace(/\D/g, '');
    if (driverName.trim().length < 2) {
      setDriverError(
        lang === 'ur' ? 'براہ کرم اپنا مکمل نام درج کریں۔' : 'Please enter your full name.'
      );
      return;
    }
    if (digits.length < 10 || digits.length > 13) {
      setDriverError(
        lang === 'ur'
          ? 'براہ کرم درست پاکستانی موبائل نمبر درج کریں۔'
          : 'Please enter a valid Pakistani mobile number.'
      );
      return;
    }
    if (!/^\d{4}$/.test(cnicLast4.trim())) {
      setDriverError(
        lang === 'ur'
          ? 'براہ کرم شناختی کارڈ کے آخری 4 ہندسے درج کریں۔'
          : 'Please enter the last 4 digits of your CNIC.'
      );
      return;
    }
    if (preferredCategories.length === 0) {
      setDriverError(
        lang === 'ur'
          ? 'کم از کم ایک ڈرائیور کیٹیگری منتخب کریں۔'
          : 'Select at least one driver category.'
      );
      return;
    }
    if (preferredAreas.length === 0) {
      setDriverError(
        lang === 'ur'
          ? 'کم از کم ایک کراچی علاقہ منتخب کریں۔'
          : 'Select at least one Karachi area.'
      );
      return;
    }

    setDriverSubmitting(true);
    try {
      const res = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: driverName.trim(),
          phone: driverPhone.trim(),
          cnicLast4: cnicLast4.trim(),
          licenseType,
          experienceYears: Number(experienceYears) || 0,
          preferredCategories,
          preferredAreas,
          transmission: driverTransmission,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit driver registration.');
      }
      setDriverSuccess(data.item);
      onDriverCreated(data.item);
      setDriverName('');
      setDriverPhone('');
      setCnicLast4('');
    } catch (err) {
      setDriverError(err instanceof Error ? err.message : 'Unable to submit registration.');
    } finally {
      setDriverSubmitting(false);
    }
  }

  return (
    <section id="portal" className="py-16 lg:py-20 bg-[#F8F9FA] border-b border-slate-200">
      <div id="portal-register" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-800 mb-2">
              {lang === 'ur'
                ? 'آن لائن ڈسپیچ اور رجسٹریشن پورٹل'
                : 'Client Dispatch & Driver Enrollment'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {activeTab === 'request'
                ? lang === 'ur'
                  ? 'گاہک حضرات ڈرائیور کی ضرورت کے لیے رابطہ کریں'
                  : 'Request a Verified Driver in Karachi'
                : lang === 'ur'
                ? 'ڈرائیور حضرات اپنی رجسٹریشن کروائیں اور روزگار حاصل کریں'
                : 'Driver Registration & Employment Opportunities'}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Portal form switcher"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'request'}
              onClick={() => onTabChange('request')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'request'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ur' ? 'ڈرائیور بک کریں' : 'Request a Driver'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'register'}
              onClick={() => onTabChange('register')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ur' ? 'ڈرائیور رجسٹریشن' : 'Driver Registration'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 cols: Active Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            {activeTab === 'request' ? (
              requestSuccess ? (
                <div className="py-6">
                  <div className="flex items-start gap-3 text-emerald-800 mb-4">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        {lang === 'ur'
                          ? 'آپ کی ڈرائیور درخواست موصول ہو گئی ہے'
                          : 'Driver Request Logged for Dispatch'}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {lang === 'ur'
                          ? 'سلمان ڈرائیور بیس کی ٹیم جلد آپ سے دیے گئے نمبر پر رابطہ کرے گی۔'
                          : 'Our Karachi dispatch desk has recorded your requirement and will contact you shortly.'}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-6 border-t border-b border-slate-200 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs text-slate-500">Reference Code</dt>
                      <dd className="font-mono font-semibold text-slate-900 mt-0.5">
                        {requestSuccess.referenceCode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Category &amp; Shift</dt>
                      <dd className="font-medium text-slate-900 mt-0.5">
                        {requestSuccess.category} · {requestSuccess.shift}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Karachi Area</dt>
                      <dd className="font-medium text-slate-900 mt-0.5">{requestSuccess.area}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500">Status</dt>
                      <dd className="font-medium text-emerald-800 mt-0.5">
                        {requestSuccess.status}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setRequestSuccess(null)}
                      className="px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                    >
                      {lang === 'ur' ? 'نئی درخواست درج کریں' : 'Submit Another Request'}
                    </button>
                    <a
                      href="#dispatch"
                      className="px-4 py-2.5 text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {lang === 'ur' ? 'ڈسپیچ بورڈ دیکھیں' : 'View in Dispatch Board'}
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleClientSubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-slate-100">
                    <p className="urdu-text text-lg font-semibold text-slate-900">
                      گاہک حضرات ڈرائیور کی ضرورت کے لیے ہم سے رابطہ کریں۔
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Tell us your Karachi neighborhood, vehicle transmission, and schedule.
                    </p>
                  </div>

                  {requestError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{requestError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="req-name"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        {lang === 'ur' ? 'مکمل نام *' : 'Your Full Name *'}
                      </label>
                      <input
                        id="req-name"
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Tariq Mahmood"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="req-phone"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        {lang === 'ur' ? 'موبائل / واٹس ایپ نمبر *' : 'Mobile / WhatsApp Number *'}
                      </label>
                      <input
                        id="req-phone"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="req-category"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        {lang === 'ur' ? 'ڈرائیور کی قسم *' : 'Driver Category *'}
                      </label>
                      <select
                        id="req-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as DriverCategory)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      >
                        {ALL_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="req-area"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        {lang === 'ur' ? 'کراچی کا علاقہ *' : 'Karachi Area *'}
                      </label>
                      <select
                        id="req-area"
                        value={
                          KARACHI_AREA_OPTIONS.includes(clientArea)
                            ? clientArea
                            : KARACHI_AREA_OPTIONS[0]
                        }
                        onChange={(e) => setClientArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      >
                        {KARACHI_AREA_OPTIONS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="req-transmission"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        {lang === 'ur' ? 'گاڑی کی قسم (گیئر)' : 'Vehicle Transmission'}
                      </label>
                      <select
                        id="req-transmission"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      >
                        {Object.values(TransmissionType).map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="req-shift"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        {lang === 'ur' ? 'ڈیوٹی کے اوقات' : 'Duty Shift'}
                      </label>
                      <select
                        id="req-shift"
                        value={shift}
                        onChange={(e) => setShift(e.target.value as ShiftType)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      >
                        {Object.values(ShiftType).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="req-vehicle"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur'
                        ? 'گاڑی کا ماڈل (اختیاری)'
                        : 'Vehicle Make / Model (Optional)'}
                    </label>
                    <input
                      id="req-vehicle"
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Toyota Corolla, Honda Civic, Fortuner, Hiace"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="req-notes"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur'
                        ? 'اضافی تفصیلات (اسکول روٹ، دفتر کا وقت، رہائش)'
                        : 'Schedule or Route Notes (Optional)'}
                    </label>
                    <textarea
                      id="req-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Daily morning commute from DHA Phase 6 to I.I. Chundrigar Road, 9am–6pm"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={requestSubmitting}
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
                  >
                    {requestSubmitting
                      ? lang === 'ur'
                        ? 'درخواست بھیجی جا رہی ہے...'
                        : 'Submitting Request...'
                      : lang === 'ur'
                      ? 'ڈرائیور کی درخواست جمع کروائیں'
                      : 'Submit Driver Request'}
                  </button>
                </form>
              )
            ) : driverSuccess ? (
              <div className="py-6">
                <div className="flex items-start gap-3 text-emerald-800 mb-4">
                  <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {lang === 'ur'
                        ? 'ڈرائیور رجسٹریشن مکمل ہو گئی ہے'
                        : 'Driver Registration Received'}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {lang === 'ur'
                        ? 'آپ کا ریکارڈ محفوظ کر لیا گیا ہے۔ تصدیق کے بعد روزگار کے مواقع کے لیے رابطہ کیا جائے گا۔'
                        : 'Your profile is logged with SALMAN DRIVER BASE for CNIC & license verification.'}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 border-t border-b border-slate-200 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Driver ID</dt>
                    <dd className="font-mono font-semibold text-slate-900 mt-0.5">
                      {driverSuccess.referenceCode}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">License &amp; Experience</dt>
                    <dd className="font-medium text-slate-900 mt-0.5">
                      {driverSuccess.licenseType} · {driverSuccess.experienceYears} yrs
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Preferred Roles</dt>
                    <dd className="font-medium text-slate-900 mt-0.5">
                      {driverSuccess.preferredCategories.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Verification Status</dt>
                    <dd className="font-medium text-emerald-800 mt-0.5">{driverSuccess.status}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setDriverSuccess(null)}
                    className="px-4 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'ur' ? 'ایک اور ڈرائیور رجسٹر کریں' : 'Register Another Driver'}
                  </button>
                  <a
                    href="#dispatch"
                    className="px-4 py-2.5 text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {lang === 'ur' ? 'ڈسپیچ بورڈ دیکھیں' : 'View in Dispatch Board'}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDriverSubmit} noValidate className="space-y-5">
                <div className="pb-4 border-b border-slate-100">
                  <p className="urdu-text text-lg font-semibold text-slate-900">
                    ڈرائیور حضرات اپنی رجسٹریشن کروائیں اور روزگار کے مواقع حاصل کریں۔
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Experienced Karachi drivers with valid CNIC and driving license are invited to apply.
                  </p>
                </div>

                {driverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3.5 rounded-lg border border-red-200 bg-red-50 text-red-900 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{driverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="drv-name"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur' ? 'ڈرائیور کا مکمل نام *' : 'Driver Full Name *'}
                    </label>
                    <input
                      id="drv-name"
                      type="text"
                      required
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      placeholder="e.g. Muhammad Kashif"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="drv-phone"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur' ? 'موبائل نمبر *' : 'Mobile Number *'}
                    </label>
                    <input
                      id="drv-phone"
                      type="tel"
                      required
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      placeholder="0321-7654321"
                      className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="drv-cnic"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur' ? 'شناختی کارڈ کے آخری 4 ہندسے *' : 'CNIC Last 4 Digits *'}
                    </label>
                    <input
                      id="drv-cnic"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      value={cnicLast4}
                      onChange={(e) => setCnicLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="4821"
                      className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="drv-license"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur' ? 'لائسنس کی قسم *' : 'License Category *'}
                    </label>
                    <select
                      id="drv-license"
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value as LicenseCategory)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    >
                      {Object.values(LicenseCategory).map((lic) => (
                        <option key={lic} value={lic}>
                          {lic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="drv-exp"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {lang === 'ur' ? 'تجربہ (سال)' : 'Experience (Years)'}
                    </label>
                    <input
                      id="drv-exp"
                      type="number"
                      min={0}
                      max={45}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="drv-transmission"
                    className="block text-sm font-medium text-slate-800 mb-1.5"
                  >
                    {lang === 'ur' ? 'گاڑی چلانے کی مہارت' : 'Vehicle Transmission Proficiency'}
                  </label>
                  <select
                    id="drv-transmission"
                    value={driverTransmission}
                    onChange={(e) => setDriverTransmission(e.target.value as TransmissionType)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                  >
                    {Object.values(TransmissionType).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-sm font-medium text-slate-800 mb-2">
                    {lang === 'ur' ? 'پسندیدہ ڈرائیور کیٹیگریز *' : 'Preferred Duty Roles *'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map((cat) => {
                      const active = preferredCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleDriverCategory(cat)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-medium text-slate-800 mb-2">
                    {lang === 'ur' ? 'کراچی کے پسندیدہ علاقے *' : 'Preferred Karachi Areas *'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {KARACHI_AREA_OPTIONS.map((area) => {
                      const active = preferredAreas.includes(area);
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleDriverArea(area)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={driverSubmitting}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
                >
                  {driverSubmitting
                    ? lang === 'ur'
                      ? 'رجسٹریشن ہو رہی ہے...'
                      : 'Submitting Registration...'
                    : lang === 'ur'
                    ? 'ڈرائیور رجسٹریشن مکمل کریں'
                    : 'Submit Driver Registration'}
                </button>
              </form>
            )}
          </div>

          {/* Right 5 cols: Editorial Verification & Recruitment Showcase */}
          <aside className="lg:col-span-5 bg-slate-900 text-white rounded-xl overflow-hidden flex flex-col justify-between">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-800 relative">
              <ResilientImage
                src={DRIVER_PORTRAIT_IMAGE}
                alt="Experienced Pakistani commercial driver holding document folder in Karachi"
                className="w-full h-full object-cover object-top"
                fallbackTitle="Driver Vetting & Onboarding"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold text-emerald-400 tracking-wide">
                  {lang === 'ur' ? 'تصدیق اور ملازمت کا طریقہ کار' : 'VERIFICATION & PLACEMENT'}
                </p>
                <h3 className="font-display text-xl font-bold mt-1">
                  {lang === 'ur'
                    ? 'محفوظ ڈرائیونگ، تصدیق شدہ شناخت'
                    : 'How SALMAN DRIVER BASE Vets Every Placement'}
                </h3>
              </div>

              <ol className="space-y-4 text-sm text-slate-300">
                <li className="border-t border-slate-800 pt-3">
                  <span className="font-mono text-emerald-400 mr-2">01.</span>
                  <strong className="text-white font-semibold">CNIC &amp; License Check:</strong>{' '}
                  {lang === 'ur'
                    ? 'اصل شناختی کارڈ اور ڈرائیونگ لائسنس (LTV / Motor Car) کی مکمل تصدیق۔'
                    : 'Original CNIC, local Karachi address, and active driving license verification.'}
                </li>
                <li className="border-t border-slate-800 pt-3">
                  <span className="font-mono text-emerald-400 mr-2">02.</span>
                  <strong className="text-white font-semibold">Road &amp; Etiquette Screening:</strong>{' '}
                  {lang === 'ur'
                    ? 'آٹومیٹک اور مینول گاڑی چلانے اور اخلاقی رویے کی جانچ۔'
                    : 'Practical assessment on automatic/manual cars plus family & corporate conduct standards.'}
                </li>
                <li className="border-t border-slate-800 pt-3">
                  <span className="font-mono text-emerald-400 mr-2">03.</span>
                  <strong className="text-white font-semibold">Matched Karachi Dispatch:</strong>{' '}
                  {lang === 'ur'
                    ? 'آپ کے علاقے اور اوقات کے مطابق موزوں ڈرائیور یا ملازمت کی فراہمی۔'
                    : 'Matched by Karachi neighborhood proximity, vehicle type, and monthly or full-time shift.'}
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
