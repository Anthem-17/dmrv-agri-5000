"use client";

import { CheckCircle2, Clock3, FileText, MapPin, Satellite, ShieldCheck, Sparkles } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verificationRecords } from "@/data/mock-data";

const stages = ["Pending", "Under Review", "Verified", "Approved"];

export default function VerificationPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Verification workflow"
          title="Admin review and approval pipeline"
          description="Move projects from pending to approved with evidence, satellite coverage, and sensor data in one workflow."
          actions={<Badge tone="brand">Verification queue</Badge>}
        />

        <Card>
          <CardHeader>
            <CardTitle>Workflow stages</CardTitle>
            <CardDescription>Visualize the state machine from pending to approved.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              {stages.map((stage, index) => (
                <div key={stage} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-950">{stage}</p>
                    <Badge tone={index === 3 ? "emerald" : index === 2 ? "sky" : "amber"}>{index + 1}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {index === 0 && "New project waiting in the queue."}
                    {index === 1 && "Documents and measurements are under review."}
                    {index === 2 && "Evidence passed technical verification."}
                    {index === 3 && "Credits are approved for issuance."}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Submitted documents</CardTitle>
              <CardDescription>Evidence packs ready for admin review.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {verificationRecords.map((record) => (
                <div key={record.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{record.projectName}</p>
                      <p className="text-sm text-slate-500">Submitted by {record.reviewer}</p>
                    </div>
                    <Badge tone={record.stage === "Approved" ? "emerald" : record.stage === "Verified" ? "sky" : "amber"}>
                      {record.stage}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {record.documents.map((document) => (
                      <div key={document} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <FileText className="mr-2 inline-block h-4 w-4 text-brand-600" />
                        {document}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Verification summary</CardTitle>
              <CardDescription className="text-slate-300">
                Satellite and sensor evidence matched against submission records.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                [Satellite, "Satellite evidence", "Canopy continuity and land-use change checked."],
                [Sparkles, "AI assisted review", "Flags anomalies and missing documentation."],
                [ShieldCheck, "Approval gate", "Only compliant records reach issuance."],
                [Clock3, "Audit trail", "Time-stamped events for every action."]
              ].map(([Icon, title, description]) => (
                <div key={title as string} className="rounded-3xl bg-white/[0.06] p-4">
                  <Icon className="h-5 w-5 text-brand-300" />
                  <p className="mt-3 font-medium">{title as string}</p>
                  <p className="mt-1 text-sm text-slate-300">{description as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verification timeline</CardTitle>
            <CardDescription>Project-by-project operational view with approval actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationRecords.map((record) => (
              <div key={record.id} className="rounded-3xl bg-slate-50 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">{record.projectName}</p>
                    <p className="text-sm text-slate-500">Updated {record.updatedAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={record.stage === "Approved" ? "emerald" : "amber"}>{record.stage}</Badge>
                    <Button variant="outline" size="sm">
                      View evidence
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Satellite", record.satelliteEvidence],
                    ["Sensor", record.sensorData],
                    ["Documents", `${record.documents.length} attached files`]
                  ].map(([label, value]) => (
                    <div key={label as string} className="rounded-2xl bg-white p-3">
                      <p className="text-xs text-slate-500">{label as string}</p>
                      <p className="mt-1 text-sm font-medium text-slate-950">{value as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
