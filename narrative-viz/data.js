// ---------------------------------------------------------------------------
// Data for "The Turn: How Baltimore Brought Homicides to a 50-Year Low"
//
// Sources (full citations also listed in index.html footer):
//   [1] Wikipedia, "Crime in Baltimore" (BPD annual homicide totals, 2010-2025)
//   [2] Office of the Mayor, City of Baltimore, "Joint Statement on Historic
//       Public Safety Progress in 2025" (Jan. 1, 2026)
//   [3] Johns Hopkins Bloomberg School of Public Health / Center for Gun
//       Violence Solutions, "New Report Finds that Baltimore's Community
//       Violence Intervention Program Safe Streets Reduced Gun Violence" (2023)
//   [4] University of Pennsylvania Crime and Justice Policy Lab, "Analyzing
//       the Impact of Baltimore's Group Violence Reduction Strategy in the
//       Western District" (2024); WYPR, "Study shows early group violence
//       reduction success in Baltimore City" (2024-02-08)
// ---------------------------------------------------------------------------

const CRIME_DATA = {

  // [1] Citywide homicides by year. This is the backbone time series used in
  // Scenes 1, 2 and 4.
  homicidesByYear: [
    { year: 2010, homicides: 223 },
    { year: 2011, homicides: 196 },
    { year: 2012, homicides: 218 },
    { year: 2013, homicides: 233 },
    { year: 2014, homicides: 211 },
    { year: 2015, homicides: 344 },
    { year: 2016, homicides: 318 },
    { year: 2017, homicides: 343 },
    { year: 2018, homicides: 309 },
    { year: 2019, homicides: 348 },
    { year: 2020, homicides: 335 },
    { year: 2021, homicides: 337 },
    { year: 2022, homicides: 333 },
    { year: 2023, homicides: 261 },
    { year: 2024, homicides: 201 },
    { year: 2025, homicides: 133 }
  ],

  // Short contextual notes keyed by year, surfaced as tooltips in Scene 4.
  yearNotes: {
    2011: "A four-decade low at the time, before violence began climbing again later in the decade.",
    2014: "The last year before the post-Freddie Gray spike; homicides jump 63% the very next year.",
    2015: "Freddie Gray dies in BPD custody (April 2015). Unrest and a lasting rise in violence follow, with homicides jumping from 211 to 344, a single-year record rate.",
    2019: "Baltimore records 348 homicides, the highest single-year total of the decade.",
    2020: "Mayor Brandon Scott is elected in November and takes office in December, promising a public-health approach to violence.",
    2022: "The Group Violence Reduction Strategy (GVRS) launches in the Western District on January 11, 2022. The citywide decline begins the following year.",
    2023: "Homicides fall below 300 for the first time since 2014, as GVRS expands to the Central District.",
    2024: "201 homicides, down 23% from 2023 and the fewest since 2011.",
    2025: "133 homicides: Baltimore's lowest homicide count in nearly 50 years, and a 31% drop from 2024 alone."
  },

  // [2] Official five-year comparison released by the Mayor's Office.
  fiveYearComparison: {
    baseYear: 2021,
    compareYear: 2025,
    homicideDeclinePct: 58.69,
    shootingDeclinePct: 57.33
  },

  // [4] GVRS Western District pilot, launched Jan. 11, 2022; results are for
  // the first 18 months of the pilot, before it expanded citywide.
  gvrsPilot: {
    district: "Western District",
    launchDate: "January 11, 2022",
    evaluationWindow: "first 18 months",
    homicideShootingReductionPct: 25,   // "roughly a quarter"
    carjackingReductionPct: 33,          // "about a third"
    displacement: "No evidence the reduced violence simply moved to neighboring districts.",
    expansion: [
      { district: "Central District", date: "January 2024" },
      { district: "Eastern District", date: "April 2024" }
    ]
  },

  // [3] Safe Streets (Baltimore's longest-running community violence
  // intervention / "credible messenger" program, since 2007). The 2023 JHU
  // evaluation studied 11 site-years of the program citywide.
  safeStreets: {
    sitesStudied: 11,
    sitesWithHomicideReduction: 8,
    sitesStatisticallySignificant: 4,
    longRunningSiteAvgHomicideReductionPct: 22,   // sites open 4+ years
    allSitesShootingReductionPct: 23,
    significantSites: ["Lower Park Heights", "Cherry Hill", "McElderry Park", "Penn North"],
    // Individual site history for sites with confirmed public launch dates.
    siteTimeline: [
      { name: "McElderry Park", region: "East Baltimore", start: 2007, end: null },
      { name: "Union Square", region: "Southwest Baltimore", start: 2007, end: 2008 },
      { name: "Ellwood Park", region: "East Baltimore", start: 2008, end: 2010 },
      { name: "Madison-Eastend", region: "East Baltimore", start: 2008, end: 2010 },
      { name: "Cherry Hill", region: "South Baltimore", start: 2008, end: null },
      { name: "Mondawmin", region: "West Baltimore", start: 2012, end: 2016 },
      { name: "Lower Park Heights", region: "Northwest Baltimore", start: 2013, end: null }
    ]
  }
};
