'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { label: 'Before', rate: 2.1 },
  { label: 'After', rate: 4.6 }
];

export function ConversionGraph() {
  return (
    <div className="h-56 w-full" aria-label="Demo conversion rate graph">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid stroke="rgb(var(--color-border) / 0.16)" vertical={false} />
          <XAxis dataKey="label" stroke="rgb(var(--color-muted))" tickLine={false} />
          <YAxis stroke="rgb(var(--color-muted))" tickFormatter={(value) => `${value}%`} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: 'rgb(var(--color-panel))',
              border: '1px solid rgb(var(--color-border) / 0.25)',
              borderRadius: 8,
              color: 'rgb(var(--color-foreground))'
            }}
            formatter={(value) => [`${value}%`, 'Example conversion rate']}
          />
          <Bar dataKey="rate" fill="rgb(var(--chart-color))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
