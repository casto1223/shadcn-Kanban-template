import { Deal, Column } from "@/types/deal";

export const initialColumns: Column[] = [
  { id: "new", name: "New" },
  { id: "negotiation", name: "Negotiation" },
  { id: "contract", name: "Contract" },
  { id: "draft", name: "Draft" },
  { id: "live", name: "Live" },
  { id: "paid", name: "Paid" },
];

export const initialDeals: Deal[] = [
  {
    id: "1",
    name: "Nike Air Max Campaign",
    column: "new",
    brand: "Nike",
    contact_name: "Sarah Johnson",
    contact_email: "sarah@nike.com",
    creator: "MrBeast",
    budget: { amount: 250000, currency: "USD" },
    deliverables: [
      { platform: "YouTube", format: "integration", count: 1 },
      { platform: "Instagram", format: "story", count: 3 }
    ],
    deadlines: [
      { name: "Script approval", date: "2025-09-01" },
      { name: "Video delivery", date: "2025-09-15" }
    ],
    usage: { whitelist: true, term_days: 365 },
    exclusivity: { category: "Footwear", term_days: 90 },
    stage_suggestion: "New",
    notes: "Back-to-school campaign targeting Gen Z"
  },
  {
    id: "2",
    name: "iPhone 16 Pro Review",
    column: "negotiation",
    brand: "Apple",
    contact_name: "Mike Chen",
    contact_email: "mike@apple.com",
    creator: "MKBHD",
    budget: { amount: 150000, currency: "USD" },
    deliverables: [
      { platform: "YouTube", format: "dedicated video", count: 1 }
    ],
    deadlines: [
      { name: "Embargo lift", date: "2025-09-01" },
      { name: "Video live", date: "2025-09-03" }
    ],
    usage: { whitelist: false, term_days: 180 },
    exclusivity: { category: "Smartphones", term_days: 60 },
    stage_suggestion: "Negotiation",
    notes: "Exclusive early access review"
  },
  {
    id: "3",
    name: "Gaming Setup Showcase",
    column: "contract",
    brand: "Razer",
    contact_name: "Alex Kim",
    contact_email: "alex@razer.com",
    creator: "PewDiePie",
    budget: { amount: 75000, currency: "USD" },
    deliverables: [
      { platform: "YouTube", format: "integration", count: 1 },
      { platform: "Twitch", format: "stream mention", count: 5 }
    ],
    deadlines: [
      { name: "Setup delivery", date: "2025-08-30" },
      { name: "Content live", date: "2025-09-15" }
    ],
    usage: { whitelist: true, term_days: 270 },
    exclusivity: { category: "Gaming peripherals", term_days: 120 },
    stage_suggestion: "Contract",
    notes: "Partnership includes custom equipment"
  },
  {
    id: "4",
    name: "Fitness Challenge Series",
    column: "draft",
    brand: "Adidas",
    contact_name: "Emma Davis",
    contact_email: "emma@adidas.com",
    creator: "Dude Perfect",
    budget: { amount: 180000, currency: "USD" },
    deliverables: [
      { platform: "YouTube", format: "series", count: 3 }
    ],
    deadlines: [
      { name: "Episode 1 draft", date: "2025-09-10" },
      { name: "Series completion", date: "2025-10-15" }
    ],
    usage: { whitelist: false, term_days: 365 },
    exclusivity: { category: "Athletic wear", term_days: 180 },
    stage_suggestion: "Draft",
    notes: "Multi-part series with custom challenges"
  },
  {
    id: "5",
    name: "Car Review Video",
    column: "live",
    brand: "Tesla",
    contact_name: "David Wilson",
    contact_email: "david@tesla.com",
    creator: "Doug DeMuro",
    budget: { amount: 120000, currency: "USD" },
    deliverables: [
      { platform: "YouTube", format: "dedicated video", count: 1 }
    ],
    deadlines: [
      { name: "Filming complete", date: "2025-08-25" },
      { name: "Video published", date: "2025-09-05" }
    ],
    usage: { whitelist: true, term_days: 90 },
    exclusivity: { category: "Electric vehicles", term_days: 30 },
    stage_suggestion: "Live",
    notes: "First drive review of new model"
  },
  {
    id: "6",
    name: "Beauty Tutorial Collab",
    column: "paid",
    brand: "Sephora",
    contact_name: "Lisa Rodriguez",
    contact_email: "lisa@sephora.com",
    creator: "James Charles",
    budget: { amount: 95000, currency: "USD" },
    deliverables: [
      { platform: "YouTube", format: "tutorial", count: 1 },
      { platform: "TikTok", format: "short form", count: 3 }
    ],
    deadlines: [
      { name: "Tutorial complete", date: "2025-08-20" },
      { name: "Campaign end", date: "2025-08-25" }
    ],
    usage: { whitelist: false, term_days: 60 },
    exclusivity: { category: "Beauty", term_days: 45 },
    stage_suggestion: "Paid",
    notes: "Holiday collection launch campaign"
  },
];
