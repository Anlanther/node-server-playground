export interface FundData {
  date: string;
  fundName: string;
  portfolioManagers: PortfolioManager[];
  investmentApproach: string;
  overview: string;
  noStocks: string;
  stockLimit: string;
  sectorLimit: string;
  countryLimit: string;
  riskActiveMoney: string;
  riskTrackError: string;
  minMarketCap: string;
  turnover: string;
  cash: string;
  morningstarStyle: string;
  launchDate: string;
  comparativeIndex: string;
  sector: string;
  fundStructure: string;
  fundSize: string;
  ocf: string;
  isin: string;
  sendol: string;
  fundPerformance: string;
  fundPositioning: string;
}

export interface PortfolioManager {
  name: string;
  detail: string;
}

export interface FundDataForKey {
  date: string;
  fundName: string;
  investmentApproach: string;
  overview: string;
  noStocks: string;
  stockLimit: string;
  sectorLimit: string;
  countryLimit: string;
  riskActiveMoney: string;
  riskTrackError: string;
  minMarketCap: string;
  turnover: string;
  cash: string;
  morningstarStyle: string;
  launchDate: string;
  comparativeIndex: string;
  sector: string;
  fundStructure: string;
  fundSize: string;
  ocf: string;
  isin: string;
  sendol: string;
  fundPerformance: string;
  fundPositioning: string;
  portfolioManager1?: string;
  portfolioManager2?: string;
  portfolioManager3?: string;
}
