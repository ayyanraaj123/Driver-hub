import { DriverCategory, KarachiZoneInfo, ServiceDefinition } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_karachi_chauffeur_1794618092933.jpg';
export const FAMILY_DRIVER_IMAGE = '/src/assets/images/service_family_driver_1794618093287.jpg';
export const CORPORATE_DRIVER_IMAGE = '/src/assets/images/service_corporate_driver_1794618093920.jpg';
export const DRIVER_PORTRAIT_IMAGE = '/src/assets/images/driver_registration_portrait_1794618093687.jpg';

export const SERVICES: ServiceDefinition[] = [
  {
    index: '01',
    category: DriverCategory.PRIVATE_CAR,
    titleEn: 'Private Car Driver',
    titleUr: 'پرائیویٹ کار ڈرائیور',
    summaryEn:
      'Dedicated personal drivers for daily errands, appointments, airport pickups at Jinnah International, and highway travel in your own vehicle.',
    summaryUr:
      'ذاتی گاڑی کے لیے تجربہ کار اور بااعتماد ڈرائیور، روزمرہ کام، ایئرپورٹ پک اینڈ ڈراپ اور شہر بھر میں محفوظ سفر کے لیے۔',
    idealForEn: 'Personal sedans, SUVs, and flexible daily schedules',
    idealForUr: 'ذاتی کار، ایس یو وی اور روزانہ کے سفری معمولات',
    typicalHours: '8–10 Hours / Day',
  },
  {
    index: '02',
    category: DriverCategory.FAMILY,
    titleEn: 'Family Driver',
    titleUr: 'فیملی ڈرائیور',
    summaryEn:
      'Courteous, background-checked household drivers trusted for school drop-offs, family errands, hospital visits, and respectful residential etiquette.',
    summaryUr:
      'اسکول پک اینڈ ڈراپ، گھریلو خریداری اور فیملی کی محفوظ آمدورفت کے لیے بااخلاق اور تصدیق شدہ فیملی ڈرائیور۔',
    idealForEn: 'Households across DHA, Clifton, PECHS & Gulshan',
    idealForUr: 'ڈی ایچ اے، کلفٹن، پی ای سی ایچ ایس اور گلشن کے گھرانے',
    typicalHours: '10–12 Hours / Monthly',
    image: FAMILY_DRIVER_IMAGE,
    imageAlt: 'Experienced family car driver opening the door of a silver sedan in DHA Karachi',
  },
  {
    index: '03',
    category: DriverCategory.OFFICE,
    titleEn: 'Office Driver',
    titleUr: 'آفس ڈرائیور',
    summaryEn:
      'Punctual executive and staff commute drivers fluent in Karachi peak-hour corridors including Shahrah-e-Faisal, Clifton Bridge, and I.I. Chundrigar Road.',
    summaryUr:
      'دفتر کے اوقات کی پابندی کے ساتھ شاہراہِ فیصل، آئی آئی چندریگر روڈ اور کلفٹن کے مصروف روٹس سے مکمل واقف آفس ڈرائیور۔',
    idealForEn: 'Executives, directors, and daily office commutes',
    idealForUr: 'ایگزیکٹوز، مینیجرز اور روزانہ دفتر آنے جانے کے لیے',
    typicalHours: 'Mon–Sat · 9–10 Hours',
    image: CORPORATE_DRIVER_IMAGE,
    imageAlt: 'Corporate office driver seated in an executive black sedan along Shahrah-e-Faisal Karachi',
  },
  {
    index: '04',
    category: DriverCategory.COMPANY,
    titleEn: 'Company Driver',
    titleUr: 'کمپنی ڈرائیور',
    summaryEn:
      'Verified fleet and corporate pool drivers for offices, logistics departments, banks, and multi-shift commercial transport with valid LTV/HTV licenses.',
    summaryUr:
      'کمپنیوں، کارپوریٹ دفاتر اور اداروں کی گاڑیوں کے لیے ایل ٹی وی اور ایچ ٹی وی لائسنس یافتہ پیشہ ور ڈرائیور۔',
    idealForEn: 'Corporate fleets, Korangi & SITE industrial units',
    idealForUr: 'کارپوریٹ فلیٹ، کورنگی اور سائٹ انڈسٹریل ایریا',
    typicalHours: 'Rotational / Shift Roster',
  },
  {
    index: '05',
    category: DriverCategory.FULL_TIME,
    titleEn: 'Full-Time Driver',
    titleUr: 'فل ٹائم ڈرائیور',
    summaryEn:
      'Long-term monthly and residential driver placements with verified CNIC records, local reference checks, and quick replacement support if needed.',
    summaryUr:
      'ماہانہ یا مستقل رہائشی بنیاد پر مکمل تصدیق شدہ فل ٹائم ڈرائیور، فوری متبادل سہولت کے ساتھ۔',
    idealForEn: 'Dedicated full-day or 24-hour residential duty',
    idealForUr: 'مکمل دن یا 24 گھنٹے کی مستقل ذمہ داری',
    typicalHours: '12 Hours / Residential',
  },
];

export const KARACHI_ZONES: KarachiZoneInfo[] = [
  {
    id: 'dha-clifton',
    nameEn: 'DHA Phases 1–8 & Clifton',
    nameUr: 'ڈی ایچ اے فیز 1 تا 8 اور کلفٹن',
    neighborhoods: ['DHA Phase 1–8', 'Clifton Block 1–9', 'Khayaban-e-Ittehad', 'Zamzama', 'Sea View'],
    corridors: 'Khayaban-e-Jami · Gizri · Korangi Road · Clifton Bridge',
    readinessWindow: 'Same-day interview & trial dispatch',
    primaryDemandEn: 'Family Drivers, Private Car Drivers & Live-In Full-Time Drivers',
    primaryDemandUr: 'فیملی ڈرائیور، پرائیویٹ کار ڈرائیور اور فل ٹائم رہائشی ڈرائیور',
  },
  {
    id: 'shahrah-pechs',
    nameEn: 'Shahrah-e-Faisal, PECHS & Bahadurabad',
    nameUr: 'شاہراہِ فیصل، پی ای سی ایچ ایس اور بہادرآباد',
    neighborhoods: ['PECHS Block 2 & 6', 'Bahadurabad', 'Karsaz', 'Nursery', 'Muhammad Ali Society'],
    corridors: 'Shahrah-e-Faisal · Shaheed-e-Millat Expressway · Tipu Sultan Road',
    readinessWindow: '24-hour placement turnaround',
    primaryDemandEn: 'Office Drivers, Executive Chauffeurs & Family Drivers',
    primaryDemandUr: 'آفس ڈرائیور، ایگزیکٹو اور فیملی ڈرائیور',
  },
  {
    id: 'gulshan-jauhar',
    nameEn: 'Gulshan-e-Iqbal & Gulistan-e-Jauhar',
    nameUr: 'گلشنِ اقبال اور گلستانِ جوہر',
    neighborhoods: ['Gulshan Block 1–13', 'Gulistan-e-Jauhar', 'University Road', 'Askari IV'],
    corridors: 'Rashid Minhas Road · University Road · Jauhar Chowrangi',
    readinessWindow: '24–48 hour verified match',
    primaryDemandEn: 'Private Car Drivers, School-Run Family Drivers & Office Commutes',
    primaryDemandUr: 'پرائیویٹ کار، اسکول پک اینڈ ڈراپ اور آفس ڈرائیور',
  },
  {
    id: 'nazimabad-fb',
    nameEn: 'North Nazimabad, Nazimabad & F.B. Area',
    nameUr: 'نارتھ ناظم آباد، ناظم آباد اور ایف بی ایریا',
    neighborhoods: ['North Nazimabad Block A–N', 'Federal B Area', 'Buffer Zone', 'Gulberg'],
    corridors: 'Shahrah-e-Sher Shah Suri · Shahrah-e-Pakistan · Lyari Expressway',
    readinessWindow: '24–48 hour verified match',
    primaryDemandEn: 'Family Drivers, Full-Time Drivers & Company Pool Drivers',
    primaryDemandUr: 'فیملی ڈرائیور، فل ٹائم اور کمپنی ڈرائیور',
  },
  {
    id: 'saddar-industrial',
    nameEn: 'Saddar, I.I. Chundrigar, Korangi & SITE',
    nameUr: 'صدر، آئی آئی چندریگر روڈ، کورنگی اور سائٹ',
    neighborhoods: ['I.I. Chundrigar Road', 'Saddar', 'Bath Island', 'Korangi Industrial', 'SITE Area'],
    corridors: 'Mai Kolachi · M.A. Jinnah Road · Korangi Industrial Corridor',
    readinessWindow: 'Corporate roster dispatch within 24 hours',
    primaryDemandEn: 'Company Drivers, Corporate Fleet & Senior Office Drivers',
    primaryDemandUr: 'کمپنی ڈرائیور، کارپوریٹ فلیٹ اور آفس ڈرائیور',
  },
  {
    id: 'malir-bahria',
    nameEn: 'Malir Cantt, Airport & Bahria Town Karachi',
    nameUr: 'ملیر کینٹ، ایئرپورٹ اور بحریہ ٹاؤن کراچی',
    neighborhoods: ['Malir Cantt', 'Model Colony', 'Jinnah Terminal', 'Bahria Town Karachi'],
    corridors: 'M-9 Motorway · Jinnah Avenue · Shahrah-e-Faisal Extension',
    readinessWindow: '48-hour dedicated highway-ready match',
    primaryDemandEn: 'Full-Time Residential Drivers & Long-Commute Private Drivers',
    primaryDemandUr: 'فل ٹائم ڈرائیور اور ہائی وے سفر کے ماہر پرائیویٹ ڈرائیور',
  },
];

export const KARACHI_AREA_OPTIONS = [
  'DHA Phase 1–8',
  'Clifton',
  'PECHS / Bahadurabad',
  'Shahrah-e-Faisal / Karsaz',
  'Gulshan-e-Iqbal',
  'Gulistan-e-Jauhar',
  'North Nazimabad / F.B. Area',
  'Saddar / I.I. Chundrigar Road',
  'Korangi / SITE Industrial',
  'Malir Cantt / Airport',
  'Bahria Town Karachi',
];

export const VERIFICATION_STANDARDS = [
  {
    metric: 'CNIC + Nadra',
    labelEn: 'Identity & Address Checked',
    labelUr: 'شناختی کارڈ اور رہائش کی تصدیق',
  },
  {
    metric: 'LTV / Motor Car',
    labelEn: 'Active Driving License Verified',
    labelUr: 'معتبر ڈرائیونگ لائسنس کی جانچ',
  },
  {
    metric: 'Auto & Manual',
    labelEn: 'Tested on Sedans, SUVs & Vans',
    labelUr: 'آٹومیٹک اور مینول گاڑیوں کا تجربہ',
  },
  {
    metric: 'All Karachi',
    labelEn: 'From Clifton to Bahria Town',
    labelUr: 'کلفٹن سے بحریہ ٹاؤن تک مکمل سروس',
  },
];
