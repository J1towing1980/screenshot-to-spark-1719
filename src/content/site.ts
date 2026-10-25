// All editable site content lives here. Update text, services, and projects
// without touching page components.

export const site = {
  name: "Caldren Technologies",
  // Wordmark shown in the header/footer: stacked lines, second letter-spaced.
  logo: { line1: "CALDREN", line2: "TECHNOLOGIES" },
  tagline: "Websites & business software",
  email: "joelshop1900@hotmail.com",
  phone: "(509) 964-6931",
  // PLACEHOLDER: still needs a real location.
  location: "Your City, State",
  hours: "Mon–Fri, 9am–5pm",
};

export const nav = [
  { to: "/websites", label: "Websites" },
  { to: "/software", label: "Software" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const websiteServices = [
  { title: "Business websites", body: "Custom-designed sites that explain what you do, build trust, and turn visitors into calls and quote requests." },
  { title: "Redesigns", body: "Modernize an outdated site with a fresh look, clearer structure, and faster pages — keeping what already works." },
  { title: "Landing pages", body: "Focused single pages for a service, promotion, or ad campaign, built around one clear action." },
  { title: "Mobile optimization", body: "Most of your customers find you on a phone. Every page we build is designed for small screens first." },
  { title: "Maintenance & updates", body: "Ongoing content changes, fixes, and improvements so your site stays current without taking your time." },
  { title: "Forms & custom features", body: "Contact forms, quote requests, booking links, and features specific to how your business works." },
];

export const softwareServices = [
  { title: "Receipt management", body: "Create, organize, and search receipts in one place instead of paper piles and spreadsheets." },
  { title: "Employee time tracking", body: "Simple clock-in and hours tracking that fits the way your crew actually works." },
  { title: "Appointment scheduling", body: "Booking and calendar tools that reduce back-and-forth phone calls." },
  { title: "Invoicing", body: "Generate and track invoices so you know what's been paid and what's outstanding." },
  { title: "Inventory", body: "Know what you have, what's running low, and what needs reordering." },
  { title: "Custom solutions", body: "If a task eats your week, we can likely build a tool for it. Tell us the problem." },
];

export type Project = {
  name: string;
  category: string;
  summary: string;
  status: "In progress" | "Live" | "Concept";
  url?: string;
};

// PLACEHOLDER projects — update status and add a url when each is ready.
export const projects: Project[] = [
  { name: "J1 Towing", category: "Business website", summary: "Website for a towing company focused on fast mobile calls and service-area info.", status: "In progress" },
  { name: "J1 Auto Repair", category: "Business website", summary: "Website for an auto repair shop presenting services and making it easy to request work.", status: "In progress" },
  { name: "Receipt Hub", category: "Business software", summary: "Receipt creation and tracking application, in active development.", status: "In progress" },
];

export const reasons = [
  { title: "Built for small business", body: "We focus on what brings you customers — not features you'll never use." },
  { title: "Websites and software, one partner", body: "Start with a website and add tools for your operations as you grow." },
  { title: "Clear, honest pricing", body: "You'll get a written quote before any work begins. No surprises." },
  { title: "Modern and fast", body: "Clean code, quick-loading pages, and designs that work on every device." },
];

export const process = [
  { step: "01", title: "Discover", body: "We talk about your business, customers, and goals." },
  { step: "02", title: "Plan & quote", body: "You receive a clear scope, timeline, and price." },
  { step: "03", title: "Design & build", body: "We design, build, and share progress for your feedback." },
  { step: "04", title: "Launch & support", body: "We go live and stay available for updates and maintenance." },
];

export const serviceOptions = [
  "New business website",
  "Website redesign",
  "Landing page",
  "Website maintenance",
  "Custom business software",
  "Not sure yet",
];
