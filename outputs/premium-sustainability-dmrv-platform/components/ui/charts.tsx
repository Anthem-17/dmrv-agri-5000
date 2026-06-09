"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

const palette = ["#9333ea", "#14b8a6", "#0ea5e9", "#f59e0b", "#475569"];

function ChartFrame({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">{children}</CardContent>
    </Card>
  );
}

export function MetricAreaChart({
  title,
  data,
  xKey,
  lines
}: {
  title: string;
  data: Record<string, number | string>[];
  xKey: string;
  lines: Array<{ dataKey: string; stroke: string; fill?: string; name?: string }>;
}) {
  return (
    <ChartFrame title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {lines.map((line, index) => (
              <linearGradient id={`fill-${index}`} key={line.dataKey} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.fill ?? line.stroke} stopOpacity={0.4} />
                <stop offset="95%" stopColor={line.fill ?? line.stroke} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={xKey} stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          {lines.map((line, index) => (
            <Area
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              fill={`url(#fill-${index})`}
              name={line.name}
              strokeWidth={2.2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function MetricBarChart({
  title,
  data,
  xKey,
  bars
}: {
  title: string;
  data: Record<string, number | string>[];
  xKey: string;
  bars: Array<{ dataKey: string; fill: string; name?: string }>;
}) {
  return (
    <ChartFrame title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={xKey} stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          {bars.map((bar) => (
            <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} radius={[12, 12, 0, 0]} name={bar.name} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function MetricLineChart({
  title,
  data,
  xKey,
  lines
}: {
  title: string;
  data: Record<string, number | string>[];
  xKey: string;
  lines: Array<{ dataKey: string; stroke: string; name?: string }>;
}) {
  return (
    <ChartFrame title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={xKey} stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          {lines.map((line) => (
            <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.stroke} strokeWidth={2.5} name={line.name} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function MetricPieChart({
  title,
  data
}: {
  title: string;
  data: Array<{ name: string; value: number }>;
}) {
  return (
    <ChartFrame title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} innerRadius={58} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
