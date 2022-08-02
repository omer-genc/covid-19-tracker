import axios, { AxiosError, AxiosResponse } from 'axios';

import {
  ICountry,
  ICountryEntity,
  IDaily,
  IDailyEntity,
  IGlobalEntity,
} from '../models/entites';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://covid19.mathdro.id/api/';

const responseBody = (response: AxiosResponse) => response.data;
const responseError = (error: AxiosError) => error.response?.data;

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') await sleep();

    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody).catch(responseError),
  getDaily: (url: string) =>
    axios
      .get(url)
      .then((res) => {
        const data = res.data.map((item: IDailyEntity) => ({
          totalConfirmed: item.totalConfirmed,
          totalDeaths: item.deaths.total,
        }));

        return data;
      })
      .catch(responseError),
};

const agent = {
  getGlobal: (): Promise<IGlobalEntity> => requests.get(''),
  getByCountry: (country: string): Promise<ICountryEntity> =>
    requests.get(`countries/${country}`),
  getCountries: (): Promise<ICountry[]> =>
    axios.get('countries').then((res) => res.data.countries),
  getDaily: (): Promise<IDaily[]> => requests.getDaily('daily'),
};

export default agent;
