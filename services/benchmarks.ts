/**
 * Indicative GBP salary bands for defence/aerospace/engineering roles in the UK.
 * Placeholder data — replace with a real benchmarking partner (Reed, Indeed,
 * Levels.fyi, or in-house data) before public launch.
 */
export type Band = { min: number; median: number; max: number };

export type RoleKey =
  | "Systems Engineer"
  | "Software Engineer"
  | "Project Manager"
  | "Mechanical Engineer"
  | "Electronics Engineer"
  | "Aerospace Engineer"
  | "Cyber Security Engineer"
  | "Data Engineer"
  | "Mission Systems Engineer";

export type Location =
  | "London"
  | "Bristol"
  | "Stevenage"
  | "Manchester"
  | "Glasgow"
  | "Cambridge"
  | "Reading"
  | "Other UK";

const ROLES: Record<RoleKey, Band> = {
  "Systems Engineer": { min: 45000, median: 62000, max: 90000 },
  "Software Engineer": { min: 50000, median: 72000, max: 110000 },
  "Project Manager": { min: 48000, median: 70000, max: 105000 },
  "Mechanical Engineer": { min: 38000, median: 55000, max: 80000 },
  "Electronics Engineer": { min: 40000, median: 58000, max: 85000 },
  "Aerospace Engineer": { min: 42000, median: 62000, max: 95000 },
  "Cyber Security Engineer": { min: 55000, median: 80000, max: 125000 },
  "Data Engineer": { min: 50000, median: 70000, max: 105000 },
  "Mission Systems Engineer": { min: 55000, median: 78000, max: 115000 },
};

const LOCATION_MULTIPLIER: Record<Location, number> = {
  London: 1.15,
  Bristol: 1.05,
  Stevenage: 1.05,
  Manchester: 0.95,
  Glasgow: 0.92,
  Cambridge: 1.05,
  Reading: 1.05,
  "Other UK": 0.9,
};

const CLEARANCE_BUMP: Record<string, number> = {
  None: 1.0,
  BPSS: 1.0,
  SC: 1.08,
  DV: 1.18,
};

export const ROLE_KEYS = Object.keys(ROLES) as RoleKey[];
export const LOCATION_KEYS = Object.keys(LOCATION_MULTIPLIER) as Location[];
export const CLEARANCE_KEYS = Object.keys(CLEARANCE_BUMP);

export function benchmark(
  role: RoleKey,
  location: Location,
  clearance: string
): Band {
  const base = ROLES[role];
  const m = LOCATION_MULTIPLIER[location] * (CLEARANCE_BUMP[clearance] ?? 1);
  return {
    min: Math.round((base.min * m) / 1000) * 1000,
    median: Math.round((base.median * m) / 1000) * 1000,
    max: Math.round((base.max * m) / 1000) * 1000,
  };
}

export const formatGBP = (n: number) =>
  `£${n.toLocaleString("en-GB")}`;
