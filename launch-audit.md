# Caldren Technologies launch audit

Checked October 25, 2026. Existing pages, layout, supplied logos, and quote fields preserved. No database schema or authentication settings changed.

## Working — actually tested

- All seven public pages and sign-in loaded on the live site and preview at widths 375, 506, 768, 1024, and 1280 pixels; no page errors or horizontal page overflow observed.
- Clicked 230 individual internal-link instances after corrections, including header, footer, page calls to action, and every mobile-menu destination. Tested opening/closing the menu and automatic closure after navigation. Email/phone link targets validated; operating-system mail/dialer apps were not launched.
- Submitted **Launch audit test — please ignore** through the live quote form. Confirmation appeared, and all eight submitted fields were read back in the authorized owner's dashboard using a secure test session.
- Submitted **Launch audit follow-up — please ignore** in the updated preview; confirmed saved record in the owner's dashboard and focus moving to the success message.
- Invalid requests were rejected by both the form and the callable server validation. Database-failure, notification-failure, spam-limit-query failure, and sixth-request rejection were verified with isolated automated tests, not deliberate outages or bulk live submissions.
- Anonymous direct quote-table read returned no records; anonymous administrator-function call failed; signed-out /admin visit redirected to /auth. Owner session read requests successfully; dashboard sign-out prevented subsequent access.
- Live database inspection confirmed row protection and an administrator-only quote-read policy. No publicly readable tables were found by the basic security scan.
- notify.caldrentech.com is verified. Managed delivery logs recorded **sent** to joelshop1900@hotmail.com at **03:33:54 UTC** for the live test and **03:39:31 UTC** for the follow-up. Recipient is not suppressed. “Sent” does not establish inbox delivery; logs do not track delivered/opened outcomes.
- Contact information matches the owner-provided email, (509) 964-6931, 1980 S Broadway Ave, Othello, WA, and confirmed Mon–Fri, 9am–5pm hours.
- Primary header and white footer logos rendered; the supplied standalone C favicon was visually checked from both local and live files. Browser automation is headless, so native browser-tab chrome was not directly inspected.
- Final automated WCAG A/AA and best-practice checks found **zero violations** on all eight public/sign-in pages at desktop and phone widths after animation settled. This is not a full manual screen-reader certification.
- Fifteen automated tests passed across validation, notification recipient/failure behavior, save safeguards, sitemap privacy, and routing. Latest automatic compilation reported build OK.

## Fixed in the preview — publication required

- Added self-referencing https://caldrentech.com canonical URLs and Open Graph page URLs to all seven public pages; retained distinct titles/descriptions and social metadata. Improved the contact description with actual locality and phone.
- Added router-derived /sitemap.xml, listing exactly seven public pages. Administrator, sign-in, and template-preview surfaces excluded. No invented last-modified dates. Preserved crawler blocks in robots.txt and added the sitemap reference.
- Fixed tablet header crowding: narrower screens now use the existing menu instead of squeezing navigation beside the logo. Logos remain unscaled in aspect ratio, with explicit dimensions to reduce layout movement.
- Increased menu tap target, added its control relationship, improved visible keyboard focus, corrected skipped service heading levels, and improved quote-error announcements and success focus.
- Darkened the existing copper accent slightly to meet text/button contrast requirements; navy, logo blue, fonts, overall layout, and page content were preserved. Portfolio decorative numbers no longer use unreadably low opacity.
- Made footer email and phone clickable. Reduced-motion preference now also disables smooth scrolling.
- A failed spam-limit lookup no longer permits submission. A saved quote still confirms success even if loading or running the email notification fails. Added regression tests for these safeguards.

## Loading performance

Browser-observed live desktop page response-start timings ranged **62–457 ms**; DOM readiness ranged **93–1,049 ms** across the public/sign-in pages in this session. An additional home-page check reported largest-content paint around 476 ms desktop and 160 ms phone, with negligible layout shift, but the phone run reused cached resources. These are sandbox/browser observations, not Lighthouse scores, throttled mobile tests, or real-customer Core Web Vitals. No obvious loading failures were seen. No unrelated performance rewrite was made.

## Security boundaries and limitations

- No exposed private credential or public customer-record response found in reviewed source paths and tested requests. Live /.env returned 403; live server-source URL returned 404; unauthorized email-template preview returned 401. Local development source is accessible to the development server but tested response contained no private credential; this is not a published source endpoint.
- Public quote submission is intentionally callable without login; it only returns success/error, not customer records. Protected quote reads independently verify the caller's admin role, rather than relying only on a hidden page.
- Hosted settings were read successfully: email sign-in enabled; public signup enabled; email confirmation required; anonymous sign-in disabled. Signup does not grant administrator privileges. No existing authenticated non-admin account was available, so a non-admin-session end-to-end test was not performed and no account was created solely for this audit. The policy and server role check were inspected instead.
- Owner access was tested with a minted owner session, not by re-entering a password. Password recovery was not exercised; no forgot-password option is currently offered on the sign-in page.
- Administrator data currently uses a shared cache key and only dashboard sign-out explicitly clears it. External account changes/cross-tab logout deserve additional testing and identity-aware cache handling before shared-device use.
- The existing five/hour limiter is a basic count-before-insert check: it is not atomic and does not prove resistance to simultaneous requests or forged forwarding headers. An atomic limiter/trusted edge abuse control would require separately explained changes.
- Validation checks required fields, email, phone and description, but service/budget/timeframe values are not restricted to the displayed choices, and some input is truncated. A stronger shared input schema is proposed, not implemented in this minor audit.
- Email sending failures do not lose the saved quote, but no durable notification retry system exists. Check the admin dashboard independently of email.
- This audit is not a penetration test, dependency vulnerability scan, exhaustive attack simulation, Google indexing/ranking check, or legal compliance review.

## What the owner needs to do

1. **Publish these corrections.** The live sitemap still returned 404 during this audit; the verified sitemap exists in the preview. Search tags and tablet/accessibility fixes also reach caldrentech.com only after publication. No publication was performed without a request.
2. Check Hotmail for both clearly labelled test emails, mark them **Not junk**, and add the sender shown on the emails to safe senders. Inbox placement is not guaranteed. No additional sending-domain DNS or provider credential setup is currently required.
3. Decide whether to disable public account registration; this site only needs owner sign-in. Approval is needed before changing authentication settings. Consider a tested owner password-recovery process and stronger protection for the owner account.
4. Confirm the three portfolio entries are genuine and may be displayed. They are labelled “In progress” and have no live links. Supply approved screenshots/live URLs when available; no project completion or results were invented.
5. Establish quote review frequency, customer response expectations, data retention/deletion practices, and a privacy notice with business-approved wording before collecting customer information at scale. These were not invented or added during the audit.
6. After publication, optionally verify ownership in Google Search Console and submit https://caldrentech.com/sitemap.xml. Sitemap availability alone does not establish Google indexing or rankings.

## Launch priority

**First:** publish, confirm receiving alerts in Hotmail, and check the owner dashboard daily. **Next:** decide on registration/recovery settings and approve privacy wording. **Then:** improve proof of work with authentic portfolio material. Before heavier traffic, authorize stronger abuse protection and administrator-session/cache tests. Major database/authentication/business-flow changes were intentionally deferred for approval.

The two audit records remain clearly labelled in the dashboard; no customer records were deleted. Workflows were checked in Chromium with phone/tablet/desktop viewport emulation, not on physical Safari/Firefox/iOS/Android devices.

Review workflows used: Accessibility Review and SEO Review.