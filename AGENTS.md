<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Structure
- All editable copy (company info, services, projects, nav) lives in src/content/site.ts so pages never need rewriting for content changes.
- Shared page shell/sections live in src/components/site/Layout.tsx; quote validation is a pure function in src/lib/quote.ts with tests.
- Quote submissions go through the submitQuote server fn (src/lib/quote.functions.ts), which re-validates, rate-limits by hashed IP and inserts with the admin client; the table has no anon access so customer data never leaves the server except to admins.
- Admin access is a row in public.user_roles checked via has_role; the /admin page lives under _authenticated and its server fn re-checks the role.
