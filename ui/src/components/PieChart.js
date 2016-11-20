import React from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts';

// Default colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
function RadialLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + 0.8 * radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + 0.8 * radius * Math.sin(-midAngle * RADIAN);

  return <text x={x} y={y} fill="#111" textAnchor={x > cx ? 'start' : 'end'} fontFamily="sans-serif" dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
};

function SimplePieChart(props) {
  const colors = props.colors || COLORS;

  return <PieChart width={180} height={180}>
      <Pie
        data={props.data}
        cx={90}
        cy={90}
        labelLine={false}
        label={RadialLabel}
        outerRadius={80}
        fill="#8884d8"
        stroke="#111"
        strokeWidth={5}
      >
      {
        props.data.map((entry, index) => <Cell fill={colors[index % colors.length]}/>)
      }
      </Pie>
  </PieChart>
}
export default SimplePieChart;