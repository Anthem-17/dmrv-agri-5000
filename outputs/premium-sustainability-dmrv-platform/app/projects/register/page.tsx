"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, MapPinned, NotebookText, SearchCheck, ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const schema = z.object({
  projectName: z.string().min(3),
  ownerName: z.string().min(2),
  companyName: z.string().min(2),
  location: z.string().min(2),
  country: z.string().min(2),
  landSize: z.coerce.number().min(1),
  treesPlanted: z.coerce.number().min(0),
  cropType: z.string().min(2),
  fuelUsage: z.coerce.number().min(0),
  electricityUsage: z.coerce.number().min(0),
  waterUsage: z.coerce.number().min(0),
  fertilizerUsage: z.coerce.number().min(0),
  activity: z.string().min(3)
});

type FormValues = z.infer<typeof schema>;

const steps = [
  "Basic Details",
  "Location",
  "Sustainability Activities",
  "Documents Upload",
  "Review",
  "Submit"
];

export default function ProjectRegisterPage() {
  const [step, setStep] = useState(0);
  const [documents, setDocuments] = useState<string[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectName: "",
      ownerName: "",
      companyName: "",
      location: "",
      country: "",
      landSize: 100,
      treesPlanted: 0,
      cropType: "Agroforestry",
      fuelUsage: 0,
      electricityUsage: 0,
      waterUsage: 0,
      fertilizerUsage: 0,
      activity: ""
    }
  });

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const values = form.watch();

  const next = async () => {
    const keysByStep: Array<Array<keyof FormValues>> = [
      ["projectName", "ownerName", "companyName"],
      ["location", "country"],
      ["cropType", "activity", "landSize", "treesPlanted"],
      ["fuelUsage", "electricityUsage", "waterUsage", "fertilizerUsage"],
      []
    ];
    const ok = await form.trigger(keysByStep[step]);
    if (ok) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const prev = () => setStep((current) => Math.max(current - 1, 0));

  const submit = () => setStep(5);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Project registration"
          title="Multi-step sustainability project onboarding"
          description="Capture the core evidence needed to kick off dMRV verification and carbon credit issuance."
          actions={<Badge tone="brand">{steps[step]}</Badge>}
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Progress</CardTitle>
                <CardDescription>{progress}% complete</CardDescription>
              </div>
              <Badge tone="emerald">{step + 1} of {steps.length}</Badge>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-gradient-to-r from-brand-600 to-violet-600" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {steps.map((label, index) => (
                <div key={label} className={`rounded-2xl px-3 py-2 text-center text-xs font-medium ${index <= step ? "bg-brand-50 text-brand-700" : "bg-slate-50 text-slate-500"}`}>
                  {label}
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        <form className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" onSubmit={form.handleSubmit(submit)}>
          <Card>
            <CardHeader>
              <CardTitle>{steps[step]}</CardTitle>
              <CardDescription>Step {step + 1} of {steps.length} in the sustainability onboarding flow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 0 ? (
                <>
                  {[
                    ["projectName", "Project name"],
                    ["ownerName", "Owner name"],
                    ["companyName", "Company name"]
                  ].map(([field, label]) => (
                    <div key={field} className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">{label}</label>
                      <Input {...form.register(field as keyof FormValues)} />
                    </div>
                  ))}
                </>
              ) : null}
              {step === 1 ? (
                <>
                  {[
                    ["location", "Location"],
                    ["country", "Country"]
                  ].map(([field, label]) => (
                    <div key={field} className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">{label}</label>
                      <Input {...form.register(field as keyof FormValues)} />
                    </div>
                  ))}
                </>
              ) : null}
              {step === 2 ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Crop type</label>
                    <Select {...form.register("cropType")}>
                      {["Agroforestry", "Mangrove", "Rice", "Soy", "Forest"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Sustainability activity</label>
                    <Input {...form.register("activity")} placeholder="Low till, cover crop, water recovery..." />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["landSize", "Land size"],
                      ["treesPlanted", "Trees planted"]
                    ].map(([field, label]) => (
                      <div key={field} className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">{label}</label>
                        <Input type="number" {...form.register(field as keyof FormValues)} />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              {step === 3 ? (
                <div className="space-y-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                  <FileUp className="mx-auto h-6 w-6 text-brand-600" />
                  <p className="font-medium text-slate-950">Upload supporting evidence</p>
                  <p className="text-sm text-slate-500">Land deeds, planting logs, drone scans, and audit certificates.</p>
                  <Input
                    type="file"
                    multiple
                    onChange={(event) =>
                      setDocuments(Array.from(event.target.files ?? []).map((file) => file.name))
                    }
                  />
                  {documents.length ? (
                    <div className="space-y-2 pt-2 text-sm text-slate-600">
                      {documents.map((file) => (
                        <div key={file} className="rounded-2xl bg-white px-4 py-2">{file}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {step === 4 ? (
                <div className="space-y-4">
                  <Card className="bg-slate-50">
                    <CardContent>
                      <p className="text-sm text-slate-500">Review summary</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {[
                          ["Project", values.projectName],
                          ["Owner", values.ownerName],
                          ["Company", values.companyName],
                          ["Location", values.location],
                          ["Country", values.country],
                          ["Crop", values.cropType]
                        ].map(([label, value]) => (
                          <div key={label as string} className="rounded-2xl bg-white p-3">
                            <p className="text-xs text-slate-500">{label as string}</p>
                            <p className="font-medium text-slate-950">{value as string}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Evidence", documents.length ? `${documents.length} files` : "Pending"],
                      ["Verification", "Ready"],
                      ["Submission", "Queued"]
                    ].map(([label, value]) => (
                      <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">{label as string}</p>
                        <p className="mt-1 font-semibold text-slate-950">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {step === 5 ? (
                <div className="rounded-3xl bg-emerald-50 p-6 text-emerald-900 ring-1 ring-emerald-100">
                  <CheckCircle2 className="h-6 w-6" />
                  <p className="mt-3 text-lg font-semibold">Project submitted successfully.</p>
                  <p className="mt-2 text-sm">
                    Your sustainability project is now in the verification queue and ready for dMRV review.
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission intelligence</CardTitle>
              <CardDescription>Guided data capture for a polished enterprise onboarding experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Project readiness", value: "93%", Icon: SearchCheck },
                { label: "Data completeness", value: "87%", Icon: NotebookText },
                { label: "Verification confidence", value: "91%", Icon: ShieldCheck },
                { label: "Document coverage", value: documents.length ? `${documents.length} files` : "None", Icon: FileUp }
              ].map(({ label, value, Icon }) => (
                <div key={label} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-brand-600" />
                      <p className="font-medium text-slate-950">{label}</p>
                    </div>
                    <Badge tone="brand">{value}</Badge>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="button" variant="outline" onClick={prev} disabled={step === 0}>
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={next}>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    Submit project
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="rounded-3xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
                <div className="flex items-center gap-2 font-medium">
                  <SearchCheck className="h-4 w-4" />
                  The review screen is optimized for verification teams.
                </div>
                <div className="mt-2 flex items-center gap-2 font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Built for future API integration and evidence ingestion.
                </div>
                <div className="mt-2 flex items-center gap-2 font-medium">
                  <MapPinned className="h-4 w-4" />
                  Location, ownership, and activity data stay structured.
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}
