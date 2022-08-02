export interface ICountry {
  name: string;
  iso2: string;
  iso3: string;
}

export interface ICountryEntity {
  confirmed: {
    value: number;
    detail: string;
  };
  recovered: {
    value: 0;
    detail: string;
  };
  deaths: {
    value: 3548;
    detail: string;
  };
  lastUpdate: string;
}

export interface IGlobalEntity extends ICountryEntity {
  dailySummary?: string;
  dailyTimeSeries?: {
    pattern: string;
    example: string;
  };
  image?: string;
  source?: string;
  countries?: string;
  detail?: string;
}

export interface IDailyEntity {
  totalConfirmed: number;
  mainlandChina: number;
  otherLocations: number;
  deltaConfirmed: number;
  totalRecovered: number;
  confirmed: {
    total: number;
    china: number;
    outsideChina: number;
  };
  deltaConfirmedDetail: {
    total: number;
    china: number;
    outsideChina: number;
  };
  deaths: {
    total: number;
    china: number;
    outsideChina: number;
  };
  recovered: {
    total: number;
    china: number;
    outsideChina: number;
  };
  active: number;
  deltaRecovered: number;
  incidentRate: number;
  peopleTested: number;
  reportDate: string;
}

export interface IDaily {
  totalConfirmed: number;
  totalDeaths: number;
}
