"use client";

import { Trophy, Medal, Crown } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leaderboard } from "@/data/mock-data";
import { formatNumber } from "@/lib/utils";

export default function LeaderboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Leaderboard"
          title="Performance rankings across carbon and ESG outcomes"
          description="Compare users and teams by credits, emissions reduced, and ESG scores."
          actions={<Badge tone="brand">Updated daily</Badge>}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <Card
              key={entry.rank}
              className={`relative overflow-hidden ${index === 0 ? "border-brand-200 shadow-xl" : ""}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.12),transparent_26%)]" />
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <Badge tone={index === 0 ? "brand" : "slate"}>Rank #{entry.rank}</Badge>
                  {index === 0 ? <Crown className="h-5 w-5 text-amber-500" /> : <Medal className="h-5 w-5 text-brand-500" />}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar initials={entry.avatar} className="h-14 w-14 rounded-3xl" />
                  <div>
                    <p className="text-xl font-semibold text-slate-950">{entry.userName}</p>
                    <p className="text-sm text-slate-500">{entry.company}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Credits saved", formatNumber(entry.carbonCreditsSaved)],
                    ["Emissions reduced", `${formatNumber(entry.emissionsReduced)}t`],
                    ["ESG score", `${entry.esgScore}`]
                  ].map(([label, value]) => (
                    <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">{label as string}</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">{value as string}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rankings table</CardTitle>
            <CardDescription>Track top performers across the sustainability network.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>User</TableHeader>
                  <TableHeader>Company</TableHeader>
                  <TableHeader>Credits saved</TableHeader>
                  <TableHeader>Emissions reduced</TableHeader>
                  <TableHeader>ESG score</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((entry) => (
                  <TableRow key={entry.rank}>
                    <TableCell className="font-semibold text-slate-950">#{entry.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar initials={entry.avatar} />
                        <span className="font-medium">{entry.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{entry.company}</TableCell>
                    <TableCell>{formatNumber(entry.carbonCreditsSaved)}</TableCell>
                    <TableCell>{formatNumber(entry.emissionsReduced)}t</TableCell>
                    <TableCell>
                      <Badge tone={entry.rank <= 3 ? "brand" : "slate"}>{entry.esgScore}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
