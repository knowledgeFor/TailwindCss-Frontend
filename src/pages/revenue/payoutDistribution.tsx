import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Marketplace', value: 72 },
  { name: 'Build An Agent', value: 20 },
  { name: 'Token Creation', value: 8 }
]

const COLORS = ['#00FF5B', '#00D24B', '#00A53B']

const PayoutDistribution: React.FC = () => {
  return (
    <>
      <div className="flex w-[50%] flex-col gap-2">
        <div className="font-bold text-xl">Payouts Distribution</div>
        <div className="flex flex-row items-center text-base gap-1 font-bold pt-4">
          <div className="w-[32px] h-[32px] bg-green rounded-lg"></div>
          <div>Marketplace: 72%</div>
        </div>
        <div className="flex flex-row items-center text-base gap-1 font-bold">
          <div className="w-[32px] h-[32px] bg-green rounded-lg"></div>
          <div>Build An Agent: 20%</div>
        </div>
        <div className="flex flex-row items-center text-base gap-1 font-bold">
          <div className="w-[32px] h-[32px] bg-green rounded-lg"></div>
          <div>Token Creation: 8%</div>
        </div>
      </div>
      <div className="flex w-[50%] items-center justify-center">
        <div className="w-full h-[152px] z-100000">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius="100%"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default PayoutDistribution
