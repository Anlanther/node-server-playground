import { FundData } from '../models/fund-data.model';

export const MOCK_FUND_DATA: FundData = {
  date: '2023-10-01',
  fundName: 'Global Equity Fund',
  portfolioManagers: [
    { name: 'Alice Smith', detail: 'Lead Portfolio Manager' },
    { name: 'Bob Johnson', detail: 'Co-Portfolio Manager' },
  ],
  investmentApproach: 'Long-term growth with a focus on technology stocks.',
  overview: 'The fund invests in global equities with a focus on innovation.',
  noStocks: '50',
  stockLimit: '10%',
  sectorLimit: '20%',
  countryLimit: '30%',
  riskActiveMoney: '5%',
  riskTrackError: '2%',
  minMarketCap: '$1B',
  turnover: '30%',
  cash: '5%',
  morningstarStyle: 'Growth',
  launchDate: '2010-01-01',
  comparativeIndex: 'MSCI World Index',
  sector: 'Technology',
  fundStructure: 'Open-ended',
  fundSize: '$500M',
  ocf: '1.5%',
  isin: 'US1234567890',
  sendol: 'USD',
  fundPerformance: '15% annualized return over the last five years.',
  fundPositioning:
    'The fund is positioned to capitalize on emerging technology trends.',
};
