import {
  CarbonCredit,
  Company,
  ESGScore,
  LeaderboardEntry,
  MarketplaceListing,
  Project,
  SensorReading,
  User,
  VerificationRecord
} from "@/types";

export const companies: Company[] = [
  {
    id: "cmp_greenleaf",
    name: "GreenLeaf Agri Partners",
    sector: "Agriculture",
    country: "India",
    employees: 420,
    projects: 18,
    verifiedCredits: 15840,
    esgScore: 87
  },
  {
    id: "cmp_terra",
    name: "TerraLoop Forestry",
    sector: "Forestry",
    country: "Kenya",
    employees: 120,
    projects: 11,
    verifiedCredits: 9640,
    esgScore: 91
  },
  {
    id: "cmp_sunriver",
    name: "SunRiver Renewables",
    sector: "Renewables",
    country: "Brazil",
    employees: 300,
    projects: 14,
    verifiedCredits: 12210,
    esgScore: 89
  }
];

export const users: User[] = [
  {
    id: "usr_admin",
    name: "Aarav Mehta",
    email: "admin@emertech-demo.com",
    role: "admin",
    companyId: "cmp_greenleaf",
    avatar: "AM",
    location: "Mumbai, India",
    score: 94,
    credits: 0,
    emissionsReduced: 0
  },
  {
    id: "usr_nina",
    name: "Nina Patel",
    email: "nina@greenleaf.ag",
    role: "user",
    companyId: "cmp_greenleaf",
    avatar: "NP",
    location: "Gujarat, India",
    score: 88,
    credits: 2410,
    emissionsReduced: 318
  },
  {
    id: "usr_daniel",
    name: "Daniel Okafor",
    email: "daniel@terraloop.earth",
    role: "user",
    companyId: "cmp_terra",
    avatar: "DO",
    location: "Nairobi, Kenya",
    score: 92,
    credits: 3288,
    emissionsReduced: 442
  }
];

export const projects: Project[] = [
  {
    id: "prj_mangrove",
    name: "Mangrove Revival",
    ownerId: "usr_nina",
    companyId: "cmp_greenleaf",
    location: "Gujarat Coast",
    landSize: 210,
    treesPlanted: 52000,
    cropType: "Mangrove",
    fuelUsage: 4300,
    electricityUsage: 9400,
    waterUsage: 11800,
    fertilizerUsage: 230,
    activity: "Coastal restoration and biochar amendment",
    status: "Approved",
    verification: "Approved",
    carbonCredits: 1280,
    emissions: 1520,
    reduction: 680,
    esgScore: 91,
    sustainabilityScore: 94,
    lastUpdated: "2026-06-09"
  },
  {
    id: "prj_soy",
    name: "Regenerative Soy Fields",
    ownerId: "usr_nina",
    companyId: "cmp_greenleaf",
    location: "Surat Basin",
    landSize: 150,
    treesPlanted: 18400,
    cropType: "Soy",
    fuelUsage: 6000,
    electricityUsage: 8200,
    waterUsage: 14600,
    fertilizerUsage: 410,
    activity: "Cover crop rotation and low-till agriculture",
    status: "Verified",
    verification: "Verified",
    carbonCredits: 860,
    emissions: 2020,
    reduction: 430,
    esgScore: 86,
    sustainabilityScore: 89,
    lastUpdated: "2026-06-08"
  },
  {
    id: "prj_forest",
    name: "Community Forest Block",
    ownerId: "usr_daniel",
    companyId: "cmp_terra",
    location: "Rift Valley",
    landSize: 340,
    treesPlanted: 81200,
    cropType: "Forest",
    fuelUsage: 5200,
    electricityUsage: 7200,
    waterUsage: 9800,
    fertilizerUsage: 90,
    activity: "Community-owned afforestation",
    status: "Under Review",
    verification: "Under Review",
    carbonCredits: 1640,
    emissions: 1330,
    reduction: 830,
    esgScore: 93,
    sustainabilityScore: 95,
    lastUpdated: "2026-06-09"
  }
];

export const carbonCredits: CarbonCredit[] = [
  {
    id: "cc_001",
    projectId: "prj_mangrove",
    projectName: "Mangrove Revival",
    companyName: "GreenLeaf Agri Partners",
    quantity: 1280,
    price: 24,
    status: "Active",
    verificationStatus: "Approved",
    esgImpact: 96
  },
  {
    id: "cc_002",
    projectId: "prj_soy",
    projectName: "Regenerative Soy Fields",
    companyName: "GreenLeaf Agri Partners",
    quantity: 860,
    price: 19,
    status: "Active",
    verificationStatus: "Verified",
    esgImpact: 88
  },
  {
    id: "cc_003",
    projectId: "prj_forest",
    projectName: "Community Forest Block",
    companyName: "TerraLoop Forestry",
    quantity: 1640,
    price: 27,
    status: "Pending",
    verificationStatus: "Under Review",
    esgImpact: 98
  }
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "mkt_001",
    projectName: "Mangrove Revival",
    companyName: "GreenLeaf Agri Partners",
    creditsAvailable: 1280,
    price: 24,
    verificationStatus: "Approved",
    esgImpact: 96,
    location: "Gujarat Coast",
    cropType: "Mangrove",
    reduction: 680
  },
  {
    id: "mkt_002",
    projectName: "Community Forest Block",
    companyName: "TerraLoop Forestry",
    creditsAvailable: 1640,
    price: 27,
    verificationStatus: "Under Review",
    esgImpact: 98,
    location: "Rift Valley",
    cropType: "Forest",
    reduction: 830
  },
  {
    id: "mkt_003",
    projectName: "Solar Farm Soil Regeneration",
    companyName: "SunRiver Renewables",
    creditsAvailable: 940,
    price: 21,
    verificationStatus: "Verified",
    esgImpact: 90,
    location: "Mato Grosso",
    cropType: "Mixed agroforestry",
    reduction: 550
  }
];

export const verificationRecords: VerificationRecord[] = [
  {
    id: "ver_001",
    projectId: "prj_mangrove",
    projectName: "Mangrove Revival",
    stage: "Approved",
    reviewer: "Maya Singh",
    submittedAt: "2026-06-01",
    updatedAt: "2026-06-09",
    satelliteEvidence: "92% canopy continuity verified",
    sensorData: "Soil salinity stable, biomass increase detected",
    documents: ["Land deed", "Geo-tagged photos", "Field log", "Audit certificate"]
  },
  {
    id: "ver_002",
    projectId: "prj_soy",
    projectName: "Regenerative Soy Fields",
    stage: "Verified",
    reviewer: "Noah Keller",
    submittedAt: "2026-05-29",
    updatedAt: "2026-06-08",
    satelliteEvidence: "Reduced tillage patterns captured",
    sensorData: "Moisture optimization within thresholds",
    documents: ["Field plan", "Lab tests", "Machinery logs"]
  },
  {
    id: "ver_003",
    projectId: "prj_forest",
    projectName: "Community Forest Block",
    stage: "Under Review",
    reviewer: "Lina Gomez",
    submittedAt: "2026-06-07",
    updatedAt: "2026-06-09",
    satelliteEvidence: "Tree density trend is positive",
    sensorData: "Seedling survival rate 94%",
    documents: ["Community consent", "Drone survey", "Planting records"]
  }
];

export const esgScores: ESGScore[] = [
  {
    userId: "usr_nina",
    environmental: 92,
    social: 88,
    governance: 86,
    overall: 89,
    trend: [
      { month: "Jan", score: 82 },
      { month: "Feb", score: 84 },
      { month: "Mar", score: 85 },
      { month: "Apr", score: 87 },
      { month: "May", score: 88 },
      { month: "Jun", score: 89 }
    ]
  },
  {
    userId: "usr_daniel",
    environmental: 95,
    social: 91,
    governance: 89,
    overall: 92,
    trend: [
      { month: "Jan", score: 86 },
      { month: "Feb", score: 87 },
      { month: "Mar", score: 89 },
      { month: "Apr", score: 90 },
      { month: "May", score: 91 },
      { month: "Jun", score: 92 }
    ]
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userName: "Daniel Okafor",
    company: "TerraLoop Forestry",
    carbonCreditsSaved: 3288,
    emissionsReduced: 442,
    esgScore: 92,
    avatar: "DO"
  },
  {
    rank: 2,
    userName: "Nina Patel",
    company: "GreenLeaf Agri Partners",
    carbonCreditsSaved: 2410,
    emissionsReduced: 318,
    esgScore: 89,
    avatar: "NP"
  },
  {
    rank: 3,
    userName: "Aarav Mehta",
    company: "GreenLeaf Agri Partners",
    carbonCreditsSaved: 1986,
    emissionsReduced: 280,
    esgScore: 88,
    avatar: "AM"
  },
  {
    rank: 4,
    userName: "Sofia Pereira",
    company: "SunRiver Renewables",
    carbonCreditsSaved: 1560,
    emissionsReduced: 226,
    esgScore: 85,
    avatar: "SP"
  }
];

export const sensorReadings: SensorReading[] = [
  { label: "Soil Moisture", value: 74, unit: "%", delta: 6 },
  { label: "Tree Health", value: 96, unit: "%", delta: 4 },
  { label: "Carbon Uptake", value: 38, unit: "tCO2e", delta: 11 },
  { label: "Verification Confidence", value: 98, unit: "%", delta: 2 }
];

export const monthlyEmissions = [
  { month: "Jan", emissions: 92, reductions: 54, credits: 38, esg: 81 },
  { month: "Feb", emissions: 88, reductions: 58, credits: 41, esg: 83 },
  { month: "Mar", emissions: 85, reductions: 62, credits: 45, esg: 84 },
  { month: "Apr", emissions: 79, reductions: 69, credits: 50, esg: 86 },
  { month: "May", emissions: 74, reductions: 74, credits: 56, esg: 88 },
  { month: "Jun", emissions: 69, reductions: 79, credits: 61, esg: 90 }
];

export const platformGrowth = [
  { month: "Jan", users: 1200, projects: 180, credits: 3400 },
  { month: "Feb", users: 1550, projects: 220, credits: 4900 },
  { month: "Mar", users: 1890, projects: 280, credits: 6600 },
  { month: "Apr", users: 2300, projects: 340, credits: 8400 },
  { month: "May", users: 2760, projects: 390, credits: 10300 },
  { month: "Jun", users: 3200, projects: 448, credits: 12900 }
];

export const verificationDistribution = [
  { name: "Pending", value: 14 },
  { name: "Under Review", value: 31 },
  { name: "Verified", value: 37 },
  { name: "Approved", value: 18 }
];

export const creditDistribution = [
  { name: "Forestry", value: 38 },
  { name: "Agriculture", value: 29 },
  { name: "Renewables", value: 19 },
  { name: "Water", value: 14 }
];
