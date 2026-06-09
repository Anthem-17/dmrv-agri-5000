"use client";

import { useState } from "react";
import { Bell, Globe2, Lock, Palette, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    weeklyReport: true,
    darkAnalytics: false,
    emailAlerts: true
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Settings"
          title="Account, notification, and platform preferences"
          description="A polished configuration surface for personal settings, alerts, and enterprise controls."
          actions={<Badge tone="brand">Preferences</Badge>}
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Profile settings</CardTitle>
              <CardDescription>Edit account and communication preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Display name", "Email address", "Company", "Time zone"].map((label) => (
                <div key={label} className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{label}</label>
                  <Input placeholder={label} />
                </div>
              ))}
              <Button>Save changes</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Configuration overview</CardTitle>
              <CardDescription className="text-slate-300">
                Enterprise-ready toggles for platform behavior and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                [Bell, "Notifications", "Receive alerts for verification and project status."],
                [Globe2, "Regional settings", "Configure locale and market display preferences."],
                [SlidersHorizontal, "Dashboard density", "Choose the level of detail in tables and cards."],
                [ShieldCheck, "Security", "Role and session settings remain enterprise-ready."]
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

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>Toggle the alerts you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["notifications", "Platform alerts"],
                ["weeklyReport", "Weekly ESG report"],
                ["darkAnalytics", "Dark analytics mode"],
                ["emailAlerts", "Email alerts"]
              ].map(([key, label]) => (
                <label key={key} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-950">{label}</span>
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof typeof preferences]}
                    onChange={(event) =>
                      setPreferences((current) => ({ ...current, [key]: event.target.checked }))
                    }
                    className="h-5 w-5 rounded border-slate-300 text-brand-600"
                  />
                </label>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security and access</CardTitle>
              <CardDescription>Audit controls and permissions for enterprise deployments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Last login", "Today at 08:45"],
                ["Session timeout", "30 minutes"],
                ["2FA", "Enabled"],
                ["Access scope", "Role-based"]
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{label as string}</p>
                  <p className="mt-1 font-medium text-slate-950">{value as string}</p>
                </div>
              ))}
              <div className="rounded-3xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
                <div className="flex items-center gap-2 font-medium">
                  <Lock className="h-4 w-4" />
                  Security settings are designed for the mock frontend auth flow.
                </div>
                <p className="mt-1">
                  The prototype uses client-side state, but the layout is ready for real SSO, MFA, and role management.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
