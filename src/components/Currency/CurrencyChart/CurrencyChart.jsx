import { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

import useResponsive from '../../../hooks/useResponsive.js';
import s from './CurrencyChart.module.css';

const CurrencyChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { isDesktop } = useResponsive();

  const renderCustomDot = props => {
    const { cx, cy, index, payload } = props;
    if (payload && payload.showDot) {
      const isHovered = index === hoveredIndex;
      return (
        <g
          key={`dot-${index}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <circle
            cx={cx}
            cy={cy}
            r={isHovered ? 6 : 4}
            fill="#FF6596"
            stroke="#FF6596"
            strokeWidth={1}
          />
          <circle cx={cx} cy={cy} r={isHovered ? 4 : 3} fill="#563EAF" />
          {isDesktop && (
            <text
              x={cx}
              y={cy - 15}
              textAnchor="middle"
              fill="#FF6596"
              fontSize="12px"
            >
              {payload.uv}
            </text>
          )}
        </g>
      );
    }
    return null;
  };

  return (
    <div className={s.graphWrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: isDesktop ? 10 : 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6E78E8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6E78E8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="none"
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={false}
            activeDot={false}
            transform={isDesktop ? 'translate(0, 20)' : 'translate(0, 10)'}
          />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#FF6596"
            strokeWidth={2}
            fill="none"
            dot={renderCustomDot}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyChart;
