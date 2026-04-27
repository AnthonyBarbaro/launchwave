'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { trackCalculatorUsed } from '@/lib/analytics';
import { formatCurrency, formatNumber } from '@/lib/format';
import { Card } from '@/components/ui/Card';

export function RoiCalculator() {
  const [visitors, setVisitors] = useState(2500);
  const [conversionRate, setConversionRate] = useState(2.4);
  const [customerValue, setCustomerValue] = useState(1800);
  const [improvement, setImprovement] = useState(60);

  const result = useMemo(() => {
    const currentLeads = Math.round(visitors * (conversionRate / 100));
    const projectedRate = conversionRate * (1 + improvement / 100);
    const projectedLeads = Math.round(visitors * (projectedRate / 100));
    const leadLift = Math.max(projectedLeads - currentLeads, 0);
    const revenueLift = leadLift * customerValue;
    return { currentLeads, projectedLeads, leadLift, revenueLift, projectedRate };
  }, [conversionRate, customerValue, improvement, visitors]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackCalculatorUsed({
        visitors,
        conversionRate,
        customerValue,
        improvement,
        estimatedRevenueLift: result.revenueLift
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [conversionRate, customerValue, improvement, result.revenueLift, visitors]);

  const chartData = [
    { label: 'Current', leads: result.currentLeads },
    { label: 'Projected', leads: result.projectedLeads }
  ];

  return (
    <Card className="grid gap-8 p-5 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
      <div className="grid gap-5">
        <NumberInput label="Monthly website visitors" max={100000} min={100} step={100} value={visitors} onChange={setVisitors} />
        <NumberInput
          label="Current conversion rate"
          max={25}
          min={0.1}
          step={0.1}
          suffix="%"
          value={conversionRate}
          onChange={setConversionRate}
        />
        <NumberInput
          label="Average customer value"
          max={100000}
          min={100}
          prefix="$"
          step={100}
          value={customerValue}
          onChange={setCustomerValue}
        />
        <NumberInput
          label="Target conversion improvement"
          max={300}
          min={5}
          step={5}
          suffix="%"
          value={improvement}
          onChange={setImprovement}
        />
      </div>

      <div className="grid gap-5">
        <div className="grid grid-cols-2 gap-3">
          <Result label="Current leads" value={formatNumber(result.currentLeads)} />
          <Result label="Projected leads" value={formatNumber(result.projectedLeads)} />
          <Result label="Lead lift" value={`+${formatNumber(result.leadLift)}`} />
          <Result label="Monthly revenue lift" value={formatCurrency(result.revenueLift)} />
        </div>

        <div className="h-72">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={chartData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="rgb(var(--color-border) / 0.16)" vertical={false} />
              <XAxis dataKey="label" stroke="rgb(var(--color-muted))" tickLine={false} />
              <YAxis stroke="rgb(var(--color-muted))" tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'rgb(var(--color-panel))',
                  border: '1px solid rgb(var(--color-border) / 0.25)',
                  borderRadius: 8,
                  color: 'rgb(var(--color-foreground))'
                }}
              />
              <Bar dataKey="leads" fill="rgb(var(--chart-color))" name="Estimated leads" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs leading-6 text-muted">
          Estimates only. Actual results depend on traffic quality, offer, pricing, follow-up speed, sales process, and market demand.
        </p>
      </div>
    </Card>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className="text-muted">
          {prefix}
          {value}
          {suffix}
        </span>
      </span>
      <input
        className="accent-[rgb(var(--color-accent))]"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/20 bg-background/45 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
