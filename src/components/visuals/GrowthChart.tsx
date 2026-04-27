'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', leads: 18 },
  { month: 'Feb', leads: 24 },
  { month: 'Mar', leads: 31 },
  { month: 'Apr', leads: 45 },
  { month: 'May', leads: 58 },
  { month: 'Jun', leads: 74 }
];

export function GrowthChart() {
  return (
    <div className="h-64 w-full" aria-label="Demo lead growth chart">
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={data} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="leadGrowth" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="rgb(var(--chart-color))" stopOpacity={0.55} />
              <stop offset="95%" stopColor="rgb(var(--chart-color))" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgb(var(--color-border) / 0.16)" vertical={false} />
          <XAxis dataKey="month" stroke="rgb(var(--color-muted))" tickLine={false} />
          <YAxis stroke="rgb(var(--color-muted))" tickLine={false} />
          <Tooltip
            contentStyle={{
              background: 'rgb(var(--color-panel))',
              border: '1px solid rgb(var(--color-border) / 0.25)',
              borderRadius: 8,
              color: 'rgb(var(--color-foreground))'
            }}
          />
          <Area dataKey="leads" fill="url(#leadGrowth)" name="Example leads" stroke="rgb(var(--chart-color))" strokeWidth={3} type="monotone" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
