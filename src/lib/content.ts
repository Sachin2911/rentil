/**
 * All page copy lives here so sections stay presentational
 * and tests can assert against a single source of truth.
 *
 * House style: short sentences. No em or en dashes (enforced by content.test.ts).
 */

export const site = {
  name: "Rentil",
  tagline: "The AI assistant for property managers",
  description:
    "Rentil is an AI assistant for letting agencies and property managers. It answers routine tenant messages on WhatsApp, email and phone in seconds, hands the rest to you with context, and keeps a record of every promise.",
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
  eyebrow: "For letting agencies and managing agents",
  headingA: "AI that answers",
  headingB: "every tenant message.",
  lede: "Rentil sits on the WhatsApp, email and phone lines you already have. Routine questions get answered in seconds. Anything unusual lands on your desk with the full story.",
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
  heading: "Clients leave over silence, not service.",
  lede: "As the book grows, messages land in personal WhatsApps and follow-ups live in one person's head. Nobody notices until the mandate is gone.",
  quotes: [
    {
      quote: "I sent three messages and nobody came back.",
      cause: "It landed in a personal WhatsApp and never became a job.",
    },
    {
      quote: "Three weeks and the geyser still leaks.",
      cause: "It stalled on a quote nobody chased. Nothing flagged it.",
    },
    {
      quote: "I explained the whole history to someone new. Again.",
      cause: "The knowledge left with the portfolio manager.",
    },
  ],
} as const;

export const how = {
  eyebrow: "How it works",
  heading: "You keep your systems. Rentil handles the noise.",
  lede: "It is not another platform to run. It works underneath the ones you already have.",
  steps: [
    {
      title: "Everything lands in one place",
      body: "WhatsApps, emails, calls and voice notes become jobs with a name, a property and a clock.",
    },
    {
      title: "The routine answers itself",
      body: "Rent dates, lease copies, balances. Rentil reads the lease and replies in seconds, at any hour.",
    },
    {
      title: "The exceptions come to you",
      body: "A burst geyser or a quote above your limit reaches a human, with the history attached.",
    },
    {
      title: "Nothing is forgotten",
      body: "Every promise and repair goes on record, per property. It survives staff turnover.",
    },
  ],
} as const;

export const visibility = {
  eyebrow: "The dashboard",
  heading: "See trouble while it's still small.",
  lede: "One screen shows what's moving, what's stuck, and who has gone quiet.",
  stats: [
    {
      value: "18s",
      label: "Median first reply",
      detail: "Across every channel.",
    },
    {
      value: "3",
      label: "Clients at risk",
      detail: "Ranked by silence, not noise.",
    },
    {
      value: "41",
      label: "Jobs in motion",
      detail: "Each with a named owner.",
    },
    {
      value: "R 62k",
      label: "Waiting on a yes",
      detail: "Approvals older than a day.",
    },
  ],
} as const;

export const audiences = {
  eyebrow: "Who it's for",
  heading: "If people hold you responsible for property you don't own, this is for you.",
  items: [
    {
      title: "Letting agencies",
      body: "80 to 600 properties. Too big for one head to hold.",
      tags: ["Rent", "Deposits", "Renewals"],
    },
    {
      title: "Managing agents",
      body: "Blocks and schemes, with boards to answer to.",
      tags: ["Levies", "Notices", "Board requests"],
    },
    {
      title: "Self-managed schemes",
      body: "No agent appointed. The trustees carry it.",
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
      body: "Deposit rules, inspections and consent, from day one.",
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
  lede: "A 30-minute demo on your own portfolio. No slides.",
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
    "80 to 250 properties",
    "250 to 600 properties",
    "600+ properties",
    "Body corporate / scheme",
  ],
  submit: "Book a demo",
  submitting: "Sending…",
  success: {
    title: "Thanks, talk soon.",
    body: "We'll come back to you within one working day to set a time.",
  },
  error: "Something went wrong. Email us at hello@rello.work instead.",
  modal: {
    heading: "See it on your own portfolio.",
    body: "Leave your details. We'll set up a 30-minute walkthrough.",
    dismiss: "Not now",
  },
} as const;

export const footer = {
  motto: "On your behalf.",
  blurb: "For people who look after property that isn't their own.",
  productHeading: "Product",
  contactHeading: "Contact",
  legal: `© ${new Date().getFullYear()} Rentil. All rights reserved.`,
} as const;
