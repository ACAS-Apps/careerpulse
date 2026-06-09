/**
 * Lightweight on-device CV scorer — gives the user instant feedback even
 * before the backend AI service exists. The backend will replace this with
 * a real model later (the event payload preserves the raw scoring signals).
 */
export type CvScore = {
  total: number; // 0-100
  breakdown: {
    length: number;
    keywords: number;
    metrics: number;
    structure: number;
  };
  suggestions: string[];
};

const DEFENCE_KEYWORDS = [
  "systems",
  "engineering",
  "requirements",
  "verification",
  "validation",
  "agile",
  "stakeholder",
  "risk",
  "safety",
  "compliance",
  "clearance",
  "MoD",
  "DEFCON",
  "ISO",
  "AS9100",
  "INCOSE",
  "PRINCE2",
  "MBSE",
  "Python",
  "MATLAB",
  "DOORS",
];

const METRIC_REGEX = /\b\d{1,3}(?:%|m|k|hrs?|days?|users?|£|\$|€)/i;

export function scoreCv(text: string): CvScore {
  const t = text.trim();
  const wordCount = t.split(/\s+/).filter(Boolean).length;

  // Length (target ~ 400–800 words for senior engineering CVs).
  let length = 0;
  if (wordCount >= 400 && wordCount <= 900) length = 25;
  else if (wordCount >= 250) length = 15;
  else if (wordCount > 0) length = 5;

  // Keywords (defence/engineering domain).
  const lower = t.toLowerCase();
  const matched = DEFENCE_KEYWORDS.filter((k) =>
    lower.includes(k.toLowerCase())
  );
  const keywords = Math.min(25, matched.length * 2);

  // Quantitative achievements.
  const metricMatches = t.match(new RegExp(METRIC_REGEX, "gi"))?.length ?? 0;
  const metrics = Math.min(25, metricMatches * 4);

  // Structure: looks for section headings.
  const headings = [
    "experience",
    "education",
    "skills",
    "projects",
    "qualifications",
    "summary",
  ];
  const headingHits = headings.filter((h) => lower.includes(h)).length;
  const structure = Math.min(25, headingHits * 5);

  const total = length + keywords + metrics + structure;
  const suggestions: string[] = [];
  if (length < 20) suggestions.push("Aim for 400–800 words.");
  if (keywords < 15)
    suggestions.push(
      "Add more domain keywords (e.g. systems engineering, verification, MBSE)."
    );
  if (metrics < 15)
    suggestions.push(
      "Quantify achievements — include numbers, %s, durations or budgets."
    );
  if (structure < 20)
    suggestions.push(
      "Use clear section headings (Summary, Experience, Education, Skills)."
    );

  return {
    total,
    breakdown: { length, keywords, metrics, structure },
    suggestions,
  };
}
