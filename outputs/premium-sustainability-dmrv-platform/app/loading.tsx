export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.08),transparent_25%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="h-3 w-28 animate-pulse rounded-full bg-brand-200" />
        <div className="mt-5 h-8 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
