export type Role = "admin" | "user";

export type ProjectStatus =
  | "Draft"
  | "Pending"
  | "Under Review"
  | "Verified"
  | "Approved";

export type VerificationStatus =
  | "Pending"
  | "Under Review"
  | "Verified"
  | "Approved";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId: string;
  avatar: string;
  location: string;
  score: number;
  credits: number;
  emissionsReduced: number;
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  country: string;
  employees: number;
  projects: number;
  verifiedCredits: number;
  esgScore: number;
}

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  companyId: string;
  location: string;
  landSize: number;
  treesPlanted: number;
  cropType: string;
  fuelUsage: number;
  electricityUsage: number;
  waterUsage: number;
  fertilizerUsage: number;
  activity: string;
  status: ProjectStatus;
  verification: VerificationStatus;
  carbonCredits: number;
  emissions: number;
  reduction: number;
  esgScore: number;
  sustainabilityScore: number;
  lastUpdated: string;
}

export interface CarbonCredit {
  id: string;
  projectId: string;
  projectName: string;
  companyName: string;
  quantity: number;
  price: number;
  status: "Pending" | "Active" | "Sold";
  verificationStatus: VerificationStatus;
  esgImpact: number;
}

export interface MarketplaceListing {
  id: string;
  projectName: string;
  companyName: string;
  creditsAvailable: number;
  price: number;
  verificationStatus: VerificationStatus;
  esgImpact: number;
  location: string;
  cropType: string;
  reduction: number;
}

export interface VerificationRecord {
  id: string;
  projectId: string;
  projectName: string;
  stage: VerificationStatus;
  reviewer: string;
  submittedAt: string;
  updatedAt: string;
  satelliteEvidence: string;
  sensorData: string;
  documents: string[];
}

export interface ESGScore {
  userId: string;
  environmental: number;
  social: number;
  governance: number;
  overall: number;
  trend: Array<{
    month: string;
    score: number;
  }>;
}

export interface SensorReading {
  label: string;
  value: number;
  unit: string;
  delta: number;
}

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  company: string;
  carbonCreditsSaved: number;
  emissionsReduced: number;
  esgScore: number;
  avatar: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
  tone: "brand" | "emerald" | "amber" | "sky";
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
