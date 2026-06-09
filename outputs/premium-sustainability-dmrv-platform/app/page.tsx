"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Landmark,
  Leaf,
  LineChart,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users2,
  Workflow
} from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyEmissions, marketplaceListings, projects, verificationRecords } from "@/data/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

const features = [
  {
    icon: ShieldCheck,
    title: "dMRV verification",
    description: "Sensor, satellite, and document evidence flow into a single auditable verification timeline."
  },
  {
    icon: BarChart3,
    title: "ESG intelligence",
    description: "Track environmental, social, and governance performance with benchmark comparisons and trendlines."
  },
  {
    icon: Leaf,
    title: "Carbon credit engine",
    description: "Estimate emissions, reductions, and credit issuance from live project inputs and project telemetry."
  },
  {
    icon: Globe2,
    title: "Marketplace-ready",
    description: "Verified credits move into a premium marketplace experience with filters, pricing, and compliance metadata."
  }
];

const steps = [
  "Register a sustainability project.",
  "Capture field and IoT evidence continuously.",
  "Verify reductions through satellite and review workflows.",
  "Approve credits and publish them to the marketplace."
];

const testimonials = [
  {
    quote:
      "This feels like the product layer we needed to move carbon projects from spreadsheets into investor-grade operations.",
    name: "Priya Shah",
    title: "Head of Climate Finance, AgriSphere"
  },
  {
    quote:
      "The combination of verification, ESG analytics, and marketplace workflows makes the platform immediately credible.",
    name: "Luis Romero",
    title: "Program Director, TerraCapital"
  }
];

const pricing = [
  {
    name: "Starter",
    price: "$490",
    description: "For emerging sustainability teams and pilot projects.",
    features: ["5 projects", "Basic calculator", "Project register", "Dashboard access"]
  },
  {
    name: "Growth",
    price: "$1,200",
    description: "For enterprise programs with verification and marketplace needs.",
    features: ["Unlimited projects", "dMRV dashboards", "ESG analytics", "Marketplace publishing"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For governments, registries, and large-scale climate programs.",
    features: ["Multi-region governance", "Custom integrations", "SLA support", "Role-based controls"]
  }
];

function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-sm text-slate-300">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="group h-full transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent>
        <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700 ring-1 ring-brand-100">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function DashboardPreview() {
  return (
    <Card className="relative overflow-hidden border-slate-200/70 bg-slate-950 text-white shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.26),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Carbon Nexus control center</p>
            <h3 className="text-xl font-semibold">Investor-grade overview</h3>
          </div>
          <Badge tone="brand" className="bg-white/10 text-white ring-white/10">
            Live
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricChip value="120,000" label="Tons CO2 tracked" />
          <MetricChip value="5,000" label="Projects registered" />
          <MetricChip value="300" label="Organizations onboarded" />
          <MetricChip value="98%" label="Verification accuracy" />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-300">Monthly emissions vs reductions</p>
              <Badge tone="emerald" className="bg-emerald-500/10 text-emerald-200 ring-emerald-400/20">
                -18.4%
              </Badge>
            </div>
            <div className="grid h-52 grid-cols-6 items-end gap-2">
              {monthlyEmissions.map((item) => (
                <div key={item.month} className="flex flex-col gap-2">
                  <div className="rounded-t-2xl bg-brand-500/80" style={{ height: `${item.emissions}%` }} />
                  <div className="rounded-b-2xl bg-emerald-400/80" style={{ height: `${item.reductions}%` }} />
                  <span className="text-center text-xs text-slate-300">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            <div>
              <p className="text-sm text-slate-300">Marketplace pulse</p>
              <h4 className="text-lg font-medium">Premium credit listings</h4>
            </div>
            {marketplaceListings.slice(0, 2).map((listing) => (
              <div key={listing.id} className="rounded-2xl bg-white/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{listing.projectName}</p>
                    <p className="text-sm text-slate-300">{listing.companyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-300">Price</p>
                    <p className="font-semibold">{formatCurrency(listing.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative border-b border-slate-200/70 bg-hero-radial">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
          <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white/[0.85] px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
                C
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Carbon Nexus</p>
                <p className="text-xs text-slate-500">Sustainability, ESG and dMRV intelligence</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-glow"
              >
                Start free
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <Badge tone="brand" className="mb-6">
                Enterprise carbon intelligence platform
              </Badge>
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 lg:text-7xl">
                Build trust in every ton of carbon.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A premium sustainability platform for ESG teams, landowners, governments, and enterprise buyers to
                register projects, prove impact, approve credits, and move verified supply into the marketplace.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/signup" size="lg">
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/dashboard" variant="outline" size="lg">
                  <Play className="h-4 w-4" />
                  View dashboard
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <MetricChip value="120k" label="Tons tracked" />
                <MetricChip value="5k" label="Projects" />
                <MetricChip value="300" label="Orgs" />
                <MetricChip value="98%" label="Accuracy" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <DashboardPreview />
            </motion.div>
          </div>

          <div className="grid gap-4 pb-12 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Users2, title: "Trusted by global teams", text: "Enterprise-ready governance across every role." },
              { icon: Lock, title: "Role-based access", text: "Users see only their own projects and credits." },
              { icon: Landmark, title: "Audit-grade workflow", text: "Satellite, sensor, and document verification together." },
              { icon: TrendingUp, title: "Marketplace monetization", text: "Turn approved credits into a premium listing pipeline." }
            ].map((item) => (
              <Card key={item.title} className="bg-white/[0.8] backdrop-blur">
                <CardContent>
                  <item.icon className="h-5 w-5 text-brand-700" />
                  <h3 className="mt-3 font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <Badge tone="brand" className="mb-3">
              Trusted by
            </Badge>
            <h2 className="text-3xl font-semibold text-slate-950">Built for enterprise sustainability operations</h2>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
            <Sparkles className="h-4 w-4 text-brand-600" />
            Premium UX that feels launch-ready from day one
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {["AgriSphere", "TerraCapital", "Global Climate Registry"].map((brand) => (
            <Card key={brand} className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trusted by</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">{brand}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge tone="slate" className="bg-white/10 text-white ring-white/10">
                How it works
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">A clear path from registration to approved credits</h2>
              <p className="mt-4 max-w-xl text-slate-300">
                The platform turns climate operations into a guided workflow that can be understood by investors,
                auditors, and operational teams alike.
              </p>
              <div className="mt-6 space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="text-white">Carbon credit flow</CardTitle>
                <CardDescription className="text-slate-300">
                  Registration, monitoring, verification, approval, and marketplace distribution.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Project registration with rich metadata",
                  "Continuous dMRV monitoring",
                  "Verification queue and evidence review",
                  "Credit approval and marketplace publishing"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
                <div className="grid gap-4 pt-4 sm:grid-cols-3">
                  <MetricChip value={formatNumber(projects.length)} label="Live projects" />
                  <MetricChip value={formatNumber(verificationRecords.length)} label="Verification records" />
                  <MetricChip value={formatCurrency(0)} label="Platform commission" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>ESG analytics preview</CardTitle>
              <CardDescription>Score composition and trajectory over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Environmental", value: "92" },
                  { label: "Social", value: "88" },
                  { label: "Governance", value: "86" }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-6">
                {monthlyEmissions.map((point) => (
                  <div key={point.month} className="rounded-3xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">{point.month}</div>
                    <div className="mt-3 h-24 rounded-2xl bg-[linear-gradient(180deg,rgba(147,51,234,0.8),rgba(147,51,234,0.15))]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Dashboard preview</CardTitle>
              <CardDescription className="text-slate-300">
                Modern enterprise interface with cards, charts, and workflow actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Total credits", "12,480"],
                  ["Projects verified", "428"],
                  ["AI recommendations", "16"],
                  ["Approval rate", "98%"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl bg-white/[0.06] p-4">
                    <p className="text-sm text-slate-300">{label}</p>
                    <p className="mt-1 text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm text-slate-300">Recent verification</p>
                <p className="mt-2 text-lg font-medium">Mangrove Revival moved to approved status.</p>
                <p className="mt-2 text-sm text-slate-300">Credits are ready for marketplace publication.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="overflow-hidden bg-slate-50">
            <CardHeader>
              <CardTitle>Marketplace preview</CardTitle>
              <CardDescription>Verified supply flows directly into premium listings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketplaceListings.map((listing) => (
                <div key={listing.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{listing.projectName}</p>
                      <p className="text-sm text-slate-500">{listing.companyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Available</p>
                      <p className="font-semibold">{formatNumber(listing.creditsAvailable)} credits</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {testimonials.map((item) => (
              <Card key={item.name} className="h-full">
                <CardContent>
                  <Star className="h-5 w-5 text-amber-500" />
                  <p className="mt-4 text-lg leading-8 text-slate-700">"{item.quote}"</p>
                  <div className="mt-6">
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Badge tone="brand" className="mb-3">
                Pricing
              </Badge>
              <h2 className="text-3xl font-semibold text-slate-950">Choose the operating model that fits your climate program</h2>
            </div>
            <Link href="/signup" className="hidden text-sm font-medium text-brand-700 md:inline-flex">
              Talk to sales <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricing.map((tier) => (
              <Card
                key={tier.name}
                className={tier.featured ? "border-brand-200 shadow-xl ring-1 ring-brand-100" : ""}
              >
                <CardHeader>
                  <Badge tone={tier.featured ? "brand" : "slate"} className="w-fit">
                    {tier.featured ? "Most popular" : tier.name}
                  </Badge>
                  <CardTitle className="mt-2">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <p className="pt-2 text-4xl font-semibold text-slate-950">{tier.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button href="/signup" className="mt-6 w-full" variant={tier.featured ? "primary" : "outline"}>
                    Start now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Answers to the questions investors and operators ask first.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Is authentication real?", "It is mocked on the frontend with role-based local state."],
                ["Can users see only their data?", "Yes. The user role renders only their own projects and ESG metrics."],
                ["Can this connect to real registries?", "Yes. The structure is prepared for API integrations and external evidence sources."]
              ].map(([question, answer]) => (
                <details key={question} className="group rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-slate-950">
                    {question}
                    <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Ready to launch your sustainability product?</CardTitle>
              <CardDescription className="text-slate-300">
                Use this prototype as the launchpad for demos, investor conversations, and enterprise pilots.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button href="/signup" size="lg" className="w-full">
                Create account
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="/login"
                size="lg"
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Open demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Carbon Nexus. Premium sustainability and dMRV intelligence.</p>
          <div className="flex items-center gap-4">
            <span>Landing</span>
            <span>Dashboard</span>
            <span>Marketplace</span>
            <span>Verification</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
