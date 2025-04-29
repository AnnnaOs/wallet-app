import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import s from './CurrencyChart.module.css';

const CurrencyChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && payload[0].payload.label) {
      return (
        <div className={s.customTooltip}>
          <p
            className={s.label}
          >{`${payload[0].payload.name}: ${payload[0].payload.label}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={s.chartContainer}>
      <ResponsiveContainer width="100%" height={93}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: -10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorCurrency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A56E2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4A56E2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(255, 255, 255, 0.2)"
          />
          <XAxis
            dataKey="name"
            tick={{ fill: '#FBFBFB', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval={0}
            tickFormatter={value => {
              return value === 'USD' || value === 'EURO' ? value : '';
            }}
          />
          <YAxis hide={true} domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="currency"
            stroke="#4A56E2"
            fillOpacity={0.5}
            fill="url(#colorCurrency)"
            activeDot={{
              r: 8,
              stroke: '#4A56E2',
              strokeWidth: 1,
              fill: '#6E78E8',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyChart;
