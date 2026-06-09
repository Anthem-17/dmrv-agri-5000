"use client";

import { CheckCircle2, ShieldCheck, Users, FolderKanban, CreditCard, Building2, TriangleAlert } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { MetricBarChart, MetricPieChart } from "@/components/ui/charts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  carbonCredits,
  companies,
  creditDistribution,
  platformGrowth,
  projects,
  users,
  verificationDistribution,
  verificationRecords
} from "@/data/mock-data";
import { formatNumber } from "@/lib/utils";

export default function AdminPage() {
  const pendingQueue = verificationRecords.filter((record) => record.stage !== "Approved");

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Admin dashboard"
          title="Platform governance and verification center"
          description="Monitor users, companies, projects, credits, and the end-to-end verification pipeline from a premium command view."
          actions={
            <>
              <Button variant="outline">
                <ShieldCheck className="h-4 w-4" />
                Review queue
              </Button>
              <Button>
                <CheckCircle2 className="h-4 w-4" />
                Approve credits
              </Button>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-4">
          <KpiCard label="Total Users" value={`${users.length}`} delta="+8%" tone="brand" />
          <KpiCard label="Total Projects" value={`${projects.length}`} delta="+16%" tone="emerald" />
          <KpiCard label="Pending Verifications" value={`${pendingQueue.length}`} delta="-4" tone="amber" />
          <KpiCard label="Total Credits Issued" value={`${formatNumber(carbonCredits.reduce((sum, item) => sum + item.quantity, 0))}`} delta="+11%" tone="sky" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <MetricBarChart
            title="Platform growth"
            data={platformGrowth}
            xKey="month"
            bars={[
              { dataKey: "users", fill: "#9333ea", name: "Users" },
              { dataKey: "projects", fill: "#14b8a6", name: "Projects" },
              { dataKey: "credits", fill: "#0ea5e9", name: "Credits" }
            ]}
          />
          <MetricPieChart title="Verification status" data={verificationDistribution} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>All registered platform identities.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Company</TableHeader>
                    <TableHeader>Role</TableHeader>
                    <TableHeader>Credits</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-slate-950">{user.name}</TableCell>
                      <TableCell>{companies.find((item) => item.id === user.companyId)?.name}</TableCell>
                      <TableCell>
                        <Badge tone={user.role === "admin" ? "brand" : "emerald"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{formatNumber(user.credits)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Companies</CardTitle>
              <CardDescription>Enterprise accounts and aggregated ESG positions.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Company</TableHeader>
                    <TableHeader>Sector</TableHeader>
                    <TableHeader>Projects</TableHeader>
                    <TableHeader>ESG</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium text-slate-950">{company.name}</TableCell>
                      <TableCell>{company.sector}</TableCell>
                      <TableCell>{company.projects}</TableCell>
                      <TableCell>
                        <Badge tone={company.esgScore > 90 ? "emerald" : "brand"}>{company.esgScore}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Current portfolio with verification outcomes.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Project</TableHeader>
                    <TableHeader>Owner</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Credits</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium text-slate-950">{project.name}</TableCell>
                      <TableCell>{users.find((user) => user.id === project.ownerId)?.name}</TableCell>
                      <TableCell>
                        <Badge tone={project.verification === "Approved" ? "emerald" : "amber"}>{project.verification}</Badge>
                      </TableCell>
                      <TableCell>{formatNumber(project.carbonCredits)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification queue</CardTitle>
              <CardDescription>Approve, request changes, or escalate evidence gaps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {verificationRecords.map((record) => (
                <div key={record.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{record.projectName}</p>
                      <p className="text-sm text-slate-500">Reviewer: {record.reviewer}</p>
                    </div>
                    <Badge tone={record.stage === "Approved" ? "emerald" : record.stage === "Verified" ? "sky" : "amber"}>
                      {record.stage}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">Satellite</p>
                      <p className="mt-1 text-sm font-medium text-slate-950">{record.satelliteEvidence}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">Sensors</p>
                      <p className="mt-1 text-sm font-medium text-slate-950">{record.sensorData}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">Documents</p>
                      <p className="mt-1 text-sm font-medium text-slate-950">{record.documents.length} files</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="outline">
                      Request changes
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace management</CardTitle>
              <CardDescription>Published credit inventory and pricing intelligence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {carbonCredits.map((credit) => (
                <div key={credit.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="font-semibold text-slate-950">{credit.projectName}</p>
                    <p className="text-sm text-slate-500">{credit.companyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-950">{formatNumber(credit.quantity)} credits</p>
                    <p className="text-sm text-slate-500">${credit.price} / credit</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin quick stats</CardTitle>
              <CardDescription>Governance health and operational throughput.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Verified credits", value: formatNumber(carbonCredits.filter((item) => item.verificationStatus === "Approved").reduce((sum, item) => sum + item.quantity, 0)) },
                { label: "Companies onboarded", value: `${companies.length}` },
                { label: "Verification accuracy", value: "98%" },
                { label: "Compliance alerts", value: "2 open" }
              ].map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
