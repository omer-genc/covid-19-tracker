export enum CardTypeEnum {
  Infected = 'Infected',
  Recovered = 'Recovered',
  Deaths = 'Deaths',
  Active = 'Active',
}

export interface IProps {
  className?: string;
  data: ICardData;
  type: CardTypeEnum;
}
export interface ICardData {
  header: string;
  type: CardTypeEnum;
  date: string;
  hour: string;
  text: string;
  value: number;
  colour: string;
}
