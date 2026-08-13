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
  demoHref: "#demo",
  url: "https://www.rentil.co.za",
} as const;

export const nav = {
  links: [
    { label: "Why Rentil", href: "#why" },
    { label: "How it works", href: "#how" },
    { label: "Visibility", href: "#see" },
    { label: "Who it's for", href: "#who" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export const hero = {
  eyebrow: "For letting agencies and managing agents",
  headingA: "AI that answers",
  headingB: "every tenant message.",
  lede: "Rentil answers routine tenant questions in seconds, on WhatsApp, email and phone. Anything unusual lands on your desk with the full story.",
  primaryCta: "Book a demo",
  secondaryCta: "See how it works",
  secondaryHref: "#how",
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
  lede: "Nobody notices until the mandate is gone.",
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
  ],
} as const;

export const flow = {
  sources: ["WhatsApp", "Email", "Phone"],
  hub: "Rentil",
  outcomes: [
    { label: "Answered in seconds", detail: "The routine, handled" },
    { label: "On your desk", detail: "With the story attached" },
  ],
} as const;

export const visibility = {
  eyebrow: "The dashboard",
  heading: "See trouble while it's still small.",
  lede: "Every promise on record, per property. One screen shows what's moving, what's stuck, and who has gone quiet.",
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
      body: "80 to 600 properties. Rent, deposits and renewals, too much for one head to hold.",
    },
    {
      title: "Managing agents",
      body: "Blocks and schemes. Levies, notices and boards to answer to.",
    },
    {
      title: "Self-managed schemes",
      body: "No agent appointed. The trustees carry the levies and the conduct rules.",
    },
  ],
} as const;

export const founder = {
  eyebrow: "From the founder",
  body: [
    "Agencies don't lose clients to bad service. They lose them to silence. The work gets done and nobody hears about it.",
    "We're building Rentil so the answering happens every time, and so the record outlives whoever carried it in their head.",
    "We're early. The first agencies shape the product with us. If that could be you, I'd like to talk.",
  ],
  name: "Rowan",
  role: "Founder, Rentil",
} as const;

export const faq = {
  eyebrow: "Questions",
  heading: "What every principal asks.",
  items: [
    {
      q: "What does Rentil sit on top of?",
      a: "The setup you already run. Tenants keep the same WhatsApp number, email and phone. Your management system stays the source of truth, and we scope what Rentil reads from it in the demo.",
    },
    {
      q: "What happens when the AI isn't sure?",
      a: "It doesn't guess. Anything unusual, sensitive or above a limit you set goes to a person on your team, with the history attached.",
    },
    {
      q: "How is tenant data handled?",
      a: "To POPIA and GDPR standards, from day one. Trust accounting, deposit rules, inspections and consent are in the model, not bolted on.",
    },
    {
      q: "What does it cost?",
      a: "Ask in the demo and you'll get a straight answer. Pricing depends on the size of your book, and you'll have the number before any commitment.",
    },
    {
      q: "How long does setup take?",
      a: "There's no migration weekend. Rentil sits under what you already run, and tenants have nothing to install or learn.",
    },
  ],
} as const;

export const cta = {
  heading: "Spend next week on clients, not admin.",
  lede: "A 30-minute demo on your own portfolio. No slides.",
  primaryCta: "Book a demo",
  note: "or write to us at",
  trustNote: "POPIA and GDPR ready. Trust accounting in the model from day one.",
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
  reassure: "We reply within one working day. A 30-minute call, no slides.",
  success: {
    title: "Thanks, talk soon.",
    body: "We'll come back to you within one working day to set a time.",
    note: "Want a time sooner? Write to",
  },
  error: "Something went wrong. Email us at hello@rello.work instead.",
  modal: {
    heading: "See it on your own portfolio.",
    body: "Leave your details. We'll set up a 30-minute walkthrough.",
    dismiss: "Not now",
  },
} as const;

export const notFound = {
  title: "That page is not on file.",
  body: "The page you're after has moved, or never existed. The record, at least, is honest about it.",
  cta: "Back to the site",
} as const;

export const footer = {
  motto: "On your behalf.",
  blurb: "For people who look after property that isn't their own.",
  productHeading: "Product",
  contactHeading: "Contact",
  legal: `© ${new Date().getFullYear()} Rentil. All rights reserved.`,
} as const;
