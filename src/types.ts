export type LanguageMode = 'en' | 'ur';

export enum DriverCategory {
  PRIVATE_CAR = 'Private Car Driver',
  FAMILY = 'Family Driver',
  OFFICE = 'Office Driver',
  COMPANY = 'Company Driver',
  FULL_TIME = 'Full-Time Driver',
}

export enum TransmissionType {
  AUTOMATIC = 'Automatic',
  MANUAL = 'Manual',
  BOTH = 'Automatic & Manual',
}

export enum ShiftType {
  DAY_SHIFT = 'Day Shift (8–10 hrs)',
  FULL_TIME_12H = 'Full-Time (12 hrs)',
  OFFICE_COMMUTE = 'Office Hours (Mon–Sat)',
  CORPORATE_ROSTER = 'Company Fleet Roster',
  RESIDENTIAL = 'Live-In / 24-Hour',
}

export enum LicenseCategory {
  LTV = 'LTV (Light Transport Vehicle)',
  MOTOR_CAR = 'Motor Car / Jeep',
  HTV = 'HTV (Heavy Transport)',
  PSV = 'PSV Commercial',
}

export enum SubmissionStatus {
  PENDING = 'Pending Verification',
  VERIFIED = 'Verified',
  ASSIGNED = 'Assigned',
}

export interface DriverRequest {
  id: string;
  referenceCode: string;
  clientName: string;
  phone: string;
  area: string;
  category: DriverCategory;
  transmission: TransmissionType;
  shift: ShiftType;
  vehicleModel: string;
  notes: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface DriverRegistration {
  id: string;
  referenceCode: string;
  fullName: string;
  phone: string;
  cnicLast4: string;
  licenseType: LicenseCategory;
  experienceYears: number;
  preferredCategories: DriverCategory[];
  preferredAreas: string[];
  transmission: TransmissionType;
  status: SubmissionStatus;
  createdAt: string;
}

export interface ServiceDefinition {
  index: string;
  category: DriverCategory;
  titleEn: string;
  titleUr: string;
  summaryEn: string;
  summaryUr: string;
  idealForEn: string;
  idealForUr: string;
  typicalHours: string;
  image?: string;
  imageAlt?: string;
}

export interface KarachiZoneInfo {
  id: string;
  nameEn: string;
  nameUr: string;
  neighborhoods: string[];
  corridors: string;
  readinessWindow: string;
  primaryDemandEn: string;
  primaryDemandUr: string;
}
