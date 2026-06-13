'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type DataPoint = {
  date: string
  rate30: number | null
  rate15: number | null
}

type Props = {
  data: DataPoint[]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  const date = new Date(label + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">{date}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value?.toFixed(2)}%
        </p>
      ))}
    </div>
  )
}

export default function RateChart({ data }: Props) {
  const minRate = Math.min(...data.flatMap(d => [d.rate30, d.rate15].filter(Boolean) as number[])) - 0.3
  const maxRate = Math.max(...data.flatMap(d => [d.rate30, d.rate15].filter(Boolean) as number[])) + 0.3

  // Show every ~8th label so x-axis isn't crowded
  const tickInterval = Math.floor(data.length / 6)

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#888888', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          interval={tickInterval}
          tickFormatter={(val) =>
            new Date(val + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }
        />
        <YAxis
          domain={[minRate, maxRate]}
          tick={{ fill: '#888888', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `${val.toFixed(1)}%`}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#555555', strokeWidth: 1 }} />
        <Line
          type="monotone"
          dataKey="rate30"
          name="30-Year Fixed"
          stroke="#7A9E5C"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: '#7A9E5C', strokeWidth: 0 }}
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="rate15"
          name="15-Year Fixed"
          stroke="#4A7FA5"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: '#4A7FA5', strokeWidth: 0 }}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
