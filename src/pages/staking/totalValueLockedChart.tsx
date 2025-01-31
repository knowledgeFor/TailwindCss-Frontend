import React from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

interface DataPoint {
  month: string
  value: number
}

const data: DataPoint[] = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 10 },
  { month: 'Mar', value: 15 },
  { month: 'Apr', value: 20 },
  { month: 'May', value: 25 },
  { month: 'Jun', value: 20 },
  { month: 'Jul', value: 30 },
  { month: 'Aug', value: 35 },
  { month: 'Sep', value: 50 },
  { month: 'Oct', value: 55 },
  { month: 'Nov', value: 60 },
  { month: 'Dec', value: 60 }
]

const TotalValueLockedChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="5%" stopColor="#00FF5B" stopOpacity={1} />
            <stop offset="98%" stopColor="#00FF5B" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="0"
          stroke="#fff"
          vertical={false}
          horizontal={true}
          strokeWidth={1}
        />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Area
          type="linear"
          dataKey="value"
          stroke="#00FF5B"
          fill="url(#gradientColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default TotalValueLockedChart
