import cn from 'classnames';

import { IProps } from './types';

function Card({ className, data, type }: IProps) {
  const colour = {
    Active: ['bg-yellow-100', 'bg-yellow-400'],
    Deaths: ['bg-red-100', 'bg-red-400'],
    Recovered: ['bg-green-200', 'bg-green-400'],
    Infected: ['bg-blue-200', 'bg-blue-400'],
  };

  return (
    <div
      className={cn(
        className,
        'rounded-lg shadow-md flex flex-col justify-between',
        colour[type][0]
      )}
    >
      <div className="p-5 flex flex-col">
        <h3 className="font-bold text-xl mb-2 first-letter:capitalize">
          {data.header}
        </h3>
        <span className="text-2xl">{data.value}</span>
        <span className="font-bold">Last Updated at :</span>
        <span className="text-gray-500">{data.date} </span>
        <span className="text-gray-500">{data.hour}</span>
        <span>{data.text}</span>
        <span>COVID-19</span>
      </div>
      <div className={cn('h-2 rounded-b-lg', colour[type][1])}></div>
    </div>
  );
}

export default Card;
