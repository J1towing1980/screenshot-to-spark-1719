import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Section, meta } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { listQuotes } from "@/lib/quote.functions";

const quotesQuery = queryOptions({ queryKey: ["admin-quotes"], queryFn: () => listQuotes() });

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [...meta("Admin Quote Requests", "Private quote request dashboard for the Caldren Technologies owner.").meta, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(quotesQuery),
  component: Admin,
});

function Admin() {
  const { data } = useSuspenseQuery(quotesQuery);
  const navigate = useNavigate();
  const { queryClient } = Route.useRouteContext();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-3xl font-medium md:text-4xl">Quote requests</h1>
        </div>
        <button onClick={signOut} className="text-sm font-semibold underline">Sign out</button>
      </div>
      {!data.authorized ? (
        <p className="mt-8 rounded-xl border border-border bg-card p-6 text-muted-foreground">This account does not have administrator access.</p>
      ) : data.quotes.length === 0 ? (
        <p className="mt-8 rounded-xl border border-border bg-card p-6 text-muted-foreground">No quote requests yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4">
          {data.quotes.map((q) => (
            <li key={q.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-medium">{q.business_name}</h2>
                <time className="text-sm text-muted-foreground">{new Date(q.created_at).toLocaleString()}</time>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div><dt className="inline font-semibold">Contact: </dt><dd className="inline">{q.contact_name}</dd></div>
                <div><dt className="inline font-semibold">Email: </dt><dd className="inline"><a className="underline" href={`mailto:${q.email}`}>{q.email}</a></dd></div>
                <div><dt className="inline font-semibold">Phone: </dt><dd className="inline">{q.phone || "—"}</dd></div>
                <div><dt className="inline font-semibold">Service: </dt><dd className="inline">{q.service}</dd></div>
                <div><dt className="inline font-semibold">Budget: </dt><dd className="inline">{q.budget || "Not given"}</dd></div>
                <div><dt className="inline font-semibold">Timeframe: </dt><dd className="inline">{q.timeframe || "Flexible"}</dd></div>
              </dl>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{q.description}</p>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
