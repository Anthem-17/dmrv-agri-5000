"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, MapPin, ShieldCheck, Sparkles, TreePine } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchBar } from "@/components/ui/search-bar";
import { Select } from "@/components/ui/select";
import { marketplaceListings } from "@/data/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

type SortMode = "Recommended" | "Price: Low to High" | "Price: High to Low" | "Credits: High to Low";

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<SortMode>("Recommended");
  const [generated, setGenerated] = useState(marketplaceListings);
  const [submission, setSubmission] = useState({
    landSize: 180,
    cropType: "Agroforestry",
    fuelUsage: 4200,
    energyConsumption: 7500,
    reduction: 620
  });

  const listings = useMemo(() => {
    return generated
      .filter((item) => item.projectName.toLowerCase().includes(query.toLowerCase()) || item.companyName.toLowerCase().includes(query.toLowerCase()))
      .filter((item) => (filter === "All" ? true : item.verificationStatus === filter))
      .sort((a, b) => {
        if (sort === "Price: Low to High") return a.price - b.price;
        if (sort === "Price: High to Low") return b.price - a.price;
        if (sort === "Credits: High to Low") return b.creditsAvailable - a.creditsAvailable;
        return b.esgImpact - a.esgImpact;
      });
  }, [filter, generated, query, sort]);
  const totalCredits = listings.reduce((sum, item) => sum + item.creditsAvailable, 0);
  const averagePrice = listings.length ? Math.round(listings.reduce((sum, item) => sum + item.price, 0) / listings.length) : 0;
  const averageImpact = listings.length ? Math.round(listings.reduce((sum, item) => sum + item.esgImpact, 0) / listings.length) : 0;

  const createListing = () => {
    setGenerated((current) => [
      {
        id: `mkt_${Date.now()}`,
        projectName: `${submission.cropType} Project`,
        companyName: "Your Project",
        creditsAvailable: Math.round(submission.reduction * 2.1),
        price: Math.max(18, Math.round(24 - submission.fuelUsage / 1000)),
        verificationStatus: "Pending",
        esgImpact: 84,
        location: "New submission",
        cropType: submission.cropType,
        reduction: submission.reduction
      },
      ...current
    ]);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Carbon marketplace"
          title="Verified carbon credits, premium listings, and ESG impact"
          description="Search, sort, and publish marketplace-ready supply with clean filters and modern enterprise presentation."
          actions={
            <>
              <Badge tone="brand" className="h-11 px-4">
                <Sparkles className="h-4 w-4" />
                Premium supply
              </Badge>
              <Badge tone="emerald" className="h-11 px-4">
                <ShieldCheck className="h-4 w-4" />
                Verified credits
              </Badge>
            </>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Publish a listing</CardTitle>
              <CardDescription>Generate a mock marketplace listing from project inputs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["landSize", "Land size (ha)"],
                ["fuelUsage", "Fuel usage"],
                ["energyConsumption", "Energy consumption"],
                ["reduction", "Carbon reduction"]
              ].map(([field, label]) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{label}</label>
                  <Input
                    type="number"
                    value={submission[field as keyof typeof submission]}
                    onChange={(event) =>
                      setSubmission((current) => ({ ...current, [field]: Number(event.target.value) }))
                    }
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Crop type</label>
                <Select
                  value={submission.cropType}
                  onChange={(event) => setSubmission((current) => ({ ...current, cropType: event.target.value }))}
                >
                  {["Agroforestry", "Mangrove", "Soy", "Rice", "Forest"].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Select>
              </div>
              <Button onClick={createListing} className="w-full">
                Generate marketplace listing
              </Button>
              <div className="rounded-3xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
                Estimated credits: <strong>{formatNumber(Math.round(submission.reduction * 2.1))}</strong>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Marketplace intelligence</CardTitle>
              <CardDescription className="text-slate-300">
                Premium buyers evaluate price, verification status, and ESG impact before purchasing.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                ["Inventory", `${formatNumber(totalCredits)} credits`],
                ["Verified", `${listings.filter((item) => item.verificationStatus === "Approved").length} listings`],
                ["Average price", formatCurrency(averagePrice)],
                ["ESG avg", `${averageImpact}`]
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-3xl bg-white/[0.06] p-4">
                  <p className="text-sm text-slate-300">{label as string}</p>
                  <p className="mt-2 text-2xl font-semibold">{value as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft lg:flex-row lg:items-center">
          <SearchBar value={query} onChange={setQuery} placeholder="Search projects, companies..." />
          <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option>All</option>
              <option>Approved</option>
              <option>Verified</option>
              <option>Under Review</option>
              <option>Pending</option>
            </Select>
            <Select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Credits: High to Low</option>
            </Select>
            <Button variant="outline">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id} className="group transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{listing.projectName}</CardTitle>
                    <CardDescription>{listing.companyName}</CardDescription>
                  </div>
                  <Badge tone={listing.verificationStatus === "Approved" ? "emerald" : listing.verificationStatus === "Verified" ? "sky" : "amber"}>
                    {listing.verificationStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Credits</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">{formatNumber(listing.creditsAvailable)}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">{formatCurrency(listing.price)}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-600" />
                    {listing.location}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <TreePine className="h-4 w-4 text-emerald-600" />
                    {listing.cropType}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">ESG impact</span>
                  <Badge tone="brand">{listing.esgImpact}</Badge>
                </div>
                <Button className="w-full">Open listing</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
