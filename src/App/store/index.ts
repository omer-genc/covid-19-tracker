import create from 'zustand';
import {
  ICountry,
  ICountryEntity,
  IDaily,
  IGlobalEntity,
} from '../models/entites';

interface IStore {
  countries: ICountry[];
  result: IGlobalEntity | null;
  daily: IDaily[];

  setState: (state: IStore) => void;

  setCountries: (countries: ICountry[]) => void;
  setResult: (result: IGlobalEntity) => void;
  setDaily: (daily: IDaily[]) => void;
}

const store = create<IStore>((set) => ({
  countries: [],
  result: null,
  daily: [],

  setState: (state: IStore) => set(state),

  setCountries: (countries: ICountry[]) => {
    set((state) => ({ ...state, countries }));
  },
  setResult: (result: ICountryEntity | IGlobalEntity) => {
    set((state) => ({ ...state, result }));
  },
  setDaily: (daily: IDaily[]) => {
    set((state) => ({ ...state, daily }));
  },
}));

export default store;
