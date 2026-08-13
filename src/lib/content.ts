/**
 * All page copy lives here so sections stay presentational
 * and tests can assert against a single source of truth.
 */

export const site = {
  name: "Rentil",
  tagline: "Handled, or on your desk.",
  description:
    "Rentil is the AI admin layer for property management. It answers every tenant and owner message on WhatsApp, email and phone, resolves the routine ones in seconds, and puts the rest on your desk with the full story attached.",
  email: "hello@rello.work",
  signInUrl: "https://app.rello.work/login",
  demoHref: "mailto:hello@rello.work?subject=Rentil%20demo",
  url: "https://www.rentil.co.za",
} as const;

export const nav = {
  links: [
    { label: "Why Rentil", href: "#why" },
    { label: "How it works", href: "#how" },
    { label: "Visibility", href: "#see" },
    { label: "Who it's for", href: "#who" },
  ],
} as const;

export const hero = {
  eyebrow: "The AI admin layer for property management",
  headingA: "Handled,",
  headingB: "or on your desk.",
  lede: "Every tenant and owner message — WhatsApp, email or call — answered in seconds, or escalated to you with the full story attached. Nothing slips. Nothing is forgotten.",
  primaryCta: "Book a demo",
  secondaryCta: "Sign in",
  note: "No migration weekend. Nothing for tenants to install.",
} as const;

export const inbox = {
  title: "Tuesday morning",
  caption: "Rentil, working",
  items: [
    { time: "07:12", text: "Answered Thabo about the geyser" },
    { time: "07:15", text: "Logged the job, briefed the plumber" },
    { time: "09:41", text: "Sent Nomsa her lease copy" },
  ],
  waiting: {
    label: "Waiting on you",
    amount: "R 4,200",
    text: "Cape Plumbing came back above your R 4,000 limit.",
    approve: "Approve",
    hold: "Hold",
  },
} as const;

export const problem = {
  eyebrow: "Why clients leave",
  heading: "Clients don't leave over bad service. They leave over silence.",
  lede: "As the book grows, attention runs out before the work does. Messages land in personal WhatsApps, follow-ups live in one person's head, and nobody notices until the mandate is gone.",
  quotes: [
    {
      quote: "I sent three messages and nobody came back.",
      cause: "It landed in a personal WhatsApp and never became a job.",
    },
    {
      quote: "Three weeks and the geyser still leaks.",
      cause: "It stalled on a quote nobody chased — and nothing flagged it.",
    },
    {
      quote: "I explained the whole history to someone new. Again.",
      cause: "The knowledge left with the portfolio manager.",
    },
  ],
} as const;

export const how = {
  eyebrow: "How it works",
  heading: "One layer under the whole operation.",
  lede: "Rentil isn't another system to run. It sits underneath the ones you already have.",
  steps: [
    {
      title: "Everything lands in one place",
      body: "A WhatsApp, email, call or voice note becomes a job with a name, a property and a clock. Tenants keep the number they already have.",
    },
    {
      title: "The routine answers itself",
      body: "Rent dates, lease copies, charges, banking details. Rentil reads the lease and replies in seconds — at any hour.",
    },
    {
      title: "The exceptions come to you",
      body: "A burst geyser, a quote above your limit, an owner who has complained twice. Routed to a human with the history attached.",
    },
    {
      title: "Nothing is forgotten",
      body: "Who asked, what was promised, who did it, when. A record per property that survives staff turnover.",
    },
  ],
} as const;

export const visibility = {
  eyebrow: "The dashboard",
  heading: "See trouble while it's still small.",
  lede: "Leading indicators, not post-mortems. One screen shows what's moving, what's stuck, and who has gone quiet.",
  stats: [
    {
      value: "18s",
      label: "Median first reply",
      detail: "Across WhatsApp, email and phone.",
    },
    {
      value: "3",
      label: "Clients at risk",
      detail: "Ranked by silence, not by who shouts loudest.",
    },
    {
      value: "41",
      label: "Jobs in motion",
      detail: "Every one with a named owner.",
    },
    {
      value: "R 62k",
      label: "Waiting on a yes",
      detail: "Approvals older than a day, and what each one blocks.",
    },
  ],
} as const;

export const audiences = {
  eyebrow: "Who it's for",
  heading: "If people hold you responsible for property you don't own, this is for you.",
  items: [
    {
      title: "Letting agencies",
      body: "80 to 600 properties. Past the point where one person can hold it all.",
      tags: ["Rent", "Deposits", "Renewals"],
    },
    {
      title: "Managing agents",
      body: "Blocks and sectional-title schemes, with boards to answer to.",
      tags: ["Levies", "Notices", "Board requests"],
    },
    {
      title: "Self-managed schemes",
      body: "No agent appointed — the trustees carry it themselves.",
      tags: ["Charges", "Conduct rules", "Approvals"],
    },
  ],
} as const;

export const assurances = {
  items: [
    {
      title: "POPIA & GDPR ready",
      body: "Tenant data handled to both standards.",
    },
    {
      title: "Trust accounting in the model",
      body: "Deposit rules, joint inspections and consent, from day one.",
    },
    {
      title: "No migration weekend",
      body: "Rentil sits under the systems you already run.",
    },
    {
      title: "Nothing to install",
      body: "Tenants keep messaging the number they already know.",
    },
  ],
} as const;

export const cta = {
  heading: "Spend next week on clients, not admin.",
  lede: "A 30-minute walkthrough using scenarios from your own portfolio.",
  primaryCta: "Book a demo",
  secondaryCta: "Sign in",
  note: "or write to us at",
} as const;

export const lead = {
  nameLabel: "Name",
  namePlaceholder: "Alex Naidoo",
  emailLabel: "Work email",
  emailPlaceholder: "you@agency.co.za",
  portfolioLabel: "Portfolio size",
  portfolioPlaceholder: "Select a range",
  portfolioOptions: [
    "Under 80 properties",
    "80–250 properties",
    "250–600 properties",
    "600+ properties",
    "Body corporate / scheme",
  ],
  submit: "Book a demo",
  submitting: "Sending…",
  success: {
    title: "Thanks — talk soon.",
    body: "We'll come back to you within one working day to set a time.",
  },
  error: "Something went wrong. Email us at hello@rello.work instead.",
  modal: {
    heading: "See it on your own portfolio.",
    body: "A 30-minute walkthrough, no slideware. Leave your details and we'll set it up.",
    dismiss: "Not now",
  },
} as const;

export const footer = {
  motto: "On your behalf.",
  blurb: "Operations for people who look after property that isn't their own.",
  productHeading: "Product",
  contactHeading: "Contact",
  legal: `© ${new Date().getFullYear()} Rentil. All rights reserved.`,
} as const;
