"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Github, Mail, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { loginAs } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"admin" | "user">("user");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (values: FormValues) => {
    loginAs(selectedRole, {
      email: values.email
    });
    router.push(selectedRole === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.12),transparent_25%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex flex-col justify-between rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
          <div>
            <Badge tone="brand" className="bg-white/10 text-white ring-white/10">
              Carbon Nexus
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">
              Sign in to operate the sustainability control plane.
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Use the admin toggle for governance workflows or switch to user mode for project dashboards and
              calculations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["99.8%", "verification visibility"],
              ["24/7", "dashboard monitoring"],
              ["Role-based", "access control"],
              ["Premium", "enterprise UI"]
            ].map(([value, label]) => (
              <Card key={label} className="border-white/10 bg-white/5 text-white">
                <CardContent>
                  <p className="text-3xl font-semibold">{value}</p>
                  <p className="mt-1 text-sm text-slate-300">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Sign in to continue your dMRV and ESG workflows.</CardDescription>
                </div>
                <Sparkles className="h-5 w-5 text-brand-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-3 rounded-3xl bg-slate-100 p-1">
                {["user", "admin"].map((role) => (
                  <button
                    key={role}
                    className={`rounded-3xl px-4 py-3 text-sm font-medium transition ${
                      selectedRole === role ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                    }`}
                    onClick={() => setSelectedRole(role as "admin" | "user")}
                    type="button"
                  >
                    Login as {role === "admin" ? "Admin" : "User"}
                  </button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input type="email" placeholder="name@company.com" {...register("email")} />
                  {errors.email ? <p className="text-xs text-rose-600">{errors.email.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <Input type="password" placeholder="••••••••" {...register("password")} />
                  {errors.password ? <p className="text-xs text-rose-600">{errors.password.message}</p> : null}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input type="checkbox" className="rounded border-slate-300" />
                    Remember me
                  </label>
                  <Link href="#" className="font-medium text-brand-700">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="relative py-2 text-center text-sm text-slate-400">
                <span className="relative z-10 bg-white px-3">or continue with</span>
                <div className="absolute left-0 top-1/2 h-px w-full bg-slate-200" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="h-4 w-4" />
                  Microsoft
                </Button>
              </div>

              <div className="rounded-3xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
                <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Mock auth enabled
                </div>
                <p className="mt-1">
                  Login as Admin for verification and marketplace governance, or User for project dashboards.
                </p>
              </div>

              <p className="text-sm text-slate-600">
                New to Carbon Nexus?{" "}
                <Link href="/signup" className="font-medium text-brand-700">
                  Create an account
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
