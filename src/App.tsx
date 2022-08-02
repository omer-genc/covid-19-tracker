import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useStore } from 'zustand';
import agent from './App/api/agent';
import { handleCardData } from './App/shared/functions';
import store from './App/store';
import Card from './components/Card';
import { ICardData } from './components/Card/types';

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

function App() {
  const state = useStore(store);
  const [chartData, setChartData] = useState<ICardData[]>([]);
  const [chartType, setChartType] = useState<'daily' | 'country'>('daily');

  const handleChangeSelect = async (e: SelectChangeEvent) => {
    if (e.target.value === 'global') {
      const res = await agent.getGlobal();
      state.setResult(res);
      setChartData(handleCardData(res));
      setChartType('daily');
      return;
    }

    const res = await agent.getByCountry(e.target.value);
    state.setResult(res);
    setChartData(handleCardData(res));
    setChartType('country');
  };

  const renderChart = () => {
    if (chartType === 'daily')
      return (
        <ResponsiveContainer width="100%" height={600}>
          <AreaChart
            width={500}
            height={400}
            data={state.daily}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis angle={15} dataKey="reportDate" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalConfirmed"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="totalDeaths"
              stackId="2"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      );

    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="header" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.colour} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  useEffect(() => {
    const countries = agent.getCountries();
    const result = agent.getGlobal();
    const daily = agent.getDaily();

    Promise.all([countries, result, daily]).then(
      ([countries, result, daily]) => {
        state.setState({ ...state, countries, result, daily });
        setChartData(handleCardData(result));
      }
    );
  }, []);

  if (!state.result || !state.daily) return null;

  return (
    <React.Fragment>
      <div className="container max-w-5xl mx-auto space-y-8 px-4 pt-16">
        <section className="flex justify-center">
          <img alt="logo" src="/mainImage.png" />
        </section>

        <section className="space-y-4">
          <p className="text-center font-bold">
            Global and Country Wise Cases of Corona Virus
          </p>
          <p className="text-center italic">
            (For a Particular country, select a Country from below)
          </p>
        </section>

        <section className="grid grid-cols-4 gap-4">
          {chartData.map((item) => (
            <Card
              key={item.header}
              type={item.type}
              data={item}
              className="col-span-4 sm:col-span-2 md:col-span-1"
            />
          ))}
        </section>

        <section className="flex justify-center">
          <select
            className="border border-blue-300"
            onChange={handleChangeSelect}
          >
            <option value="global">Global</option>
            {state.countries.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </section>
        {renderChart()}
        <div className="flex flex-col justify-center items-center">
          <span>Created with care by: Ömer Genç</span>
          <a href="https://www.linkedin.com/in/omer-genc/" className='text-blue-500' target="_blank">
            Linkedin: omer-genc
          </a>
          <a href="https://www.github.com/omer-genc/" className='text-blue-500' target="_blank">
            Github: omer-genc
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
