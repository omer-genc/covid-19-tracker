import { CardTypeEnum, ICardData } from '../../components/Card/types';
import moment from 'moment';

import { IGlobalEntity } from '../models/entites';

export const handleCardData = (data: IGlobalEntity): ICardData[] => {
  const date = moment(data.lastUpdate).format('dd MMMM DD YYYY');
  const hour = moment(data.lastUpdate).format('HH:mm:ss');
  return [
    {
      date,
      header: 'Infected',
      type: CardTypeEnum.Infected,
      hour,
      value: data.confirmed.value,
      colour: '#3491bc',
      text: 'Number of infect cases of ',
    },
    {
      date,
      header: 'Recovered',
      type: CardTypeEnum.Recovered,
      hour,
      value: data.recovered.value,
      colour: '#34bc5d' ,
      text: 'Number of recoveries from',
    },

    {
      date,
      header: 'Deaths',
      type: CardTypeEnum.Deaths,
      hour,
      value: data.deaths.value,
      colour: '#f2e602',
      text: 'Number of deaths caused by',
    },
    {
      date,
      header: 'Active',
      type: CardTypeEnum.Active,
      hour,
      value: data.confirmed.value - data.deaths.value,
      colour: '#272fc2',
      text: 'Number of active cases of',
    },
  ];
};
