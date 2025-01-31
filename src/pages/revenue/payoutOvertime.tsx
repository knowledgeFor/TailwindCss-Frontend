import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', amount: 10 },
  { name: 'Feb', amount: 60 },
  { name: 'Mar', amount: 10 },
  { name: 'Apr', amount: 120 },
  { name: 'May', amount: 170 },
  { name: 'Jun', amount: 130 },
  { name: 'Jul', amount: 360 },
  { name: 'Aug', amount: 280 }
]

const PayoutOvertimeChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis orientation="right" tickLine={false} axisLine={false} />
        <Bar dataKey="amount" fill="#00FF5B" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PayoutOvertimeChart
