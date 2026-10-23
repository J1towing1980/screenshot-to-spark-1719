import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Section } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign In" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    setBusy(false);
    if (error) return setError("Sign in failed. Check your email and password.");
    navigate({ to: "/admin" });
  }

  return (
    <Section>
      <form onSubmit={onSubmit} className="mx-auto grid max-w-sm gap-4">
        <h1 className="text-3xl font-medium">Admin sign in</h1>
        <label className="text-sm font-semibold">Email<input name="email" type="email" required autoComplete="email" className="field mt-1.5" /></label>
        <label className="text-sm font-semibold">Password<input name="password" type="password" required autoComplete="current-password" className="field mt-1.5" /></label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary">{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </Section>
  );
}
