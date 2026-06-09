"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Github, Mail, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const { signup } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"admin" | "user">("user");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", email: "", password: "" }
  });

  const onSubmit = async (values: FormValues) => {
    signup({
      name: values.name,
      company: values.company,
      email: values.email,
      role: selectedRole
    });
    router.push(selectedRole === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_25%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="order-2 flex items-center lg:order-1">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Create your organization</CardTitle>
                  <CardDescription>Start with a mock account and switch between admin or user mode.</CardDescription>
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
                    Signup as {role === "admin" ? "Admin" : "User"}
                  </button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {[
                  ["name", "Name", "Full name"],
                  ["company", "Company", "Company or organization"],
                  ["email", "Email", "name@company.com"],
                  ["password", "Password", "Create a secure password"]
                ].map(([field, label, placeholder]) => (
                  <div key={field} className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <Input
                      type={field === "password" ? "password" : "text"}
                      placeholder={placeholder}
                      {...register(field as keyof FormValues)}
                    />
                    {errors[field as keyof FormValues] ? (
                      <p className="text-xs text-rose-600">
                        {errors[field as keyof FormValues]?.message as string}
                      </p>
                    ) : null}
                  </div>
                ))}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

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

              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-brand-700">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="order-1 flex flex-col justify-between rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl lg:order-2">
          <div>
            <Badge tone="brand" className="bg-white/10 text-white ring-white/10">
              Sustainable product suite
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">
              Move from account creation to climate operations in one flow.
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              The signup flow immediately gives you a premium dashboard, project tools, and role-based access.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Register projects", "Submit land, fuel, energy, and crop data."],
              ["Track ESG", "See environmental, social, and governance scores."],
              ["Publish credits", "Move approved credits into the marketplace."],
              ["Lead rankings", "Benchmark performance across the leaderboard."]
            ].map(([title, text]) => (
              <Card key={title} className="border-white/10 bg-white/5 text-white">
                <CardContent>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-slate-300">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
