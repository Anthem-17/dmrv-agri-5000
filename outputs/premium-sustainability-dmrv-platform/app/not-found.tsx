import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
            <Leaf className="h-6 w-6" />
          </div>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>
            The requested route does not exist in this prototype. You can return to the landing page or open the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Button>
          <Button href="/dashboard" variant="outline">
            Open dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
