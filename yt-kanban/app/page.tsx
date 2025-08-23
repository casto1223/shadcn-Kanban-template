"use client";

import { useState } from "react";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban";
import { Deal, Column } from "@/types/deal";

const initialColumns: Column[] = [
  { id: "new", name: "New" },
  { id: "negotiation", name: "Negotiation" },
  { id: "contract", name: "Contract" },
  { id: "draft", name: "Draft" },
  { id: "live", name: "Live" },
  { id: "paid", name: "Paid" },
];

const initialDeals: Deal[] = [
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

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const getUsageColor = (whitelist: boolean) => {
    return whitelist 
      ? "border-l-4 border-l-blue-500" 
      : "border-l-4 border-l-green-500";
  };

  const formatCurrency = (budget: { amount: number; currency: string }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budget.currency,
      minimumFractionDigits: 0,
    }).format(budget.amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getNextDeadline = (deadlines: Array<{ name: string; date: string }>) => {
    if (deadlines.length === 0) return null;
    return deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            YT AI Talent Manager
          </h1>
          <p className="text-muted-foreground">
            Brand Partnership Deals Tracker
          </p>
        </div>

        <div className="h-[calc(100vh-200px)]">
          <KanbanProvider
            columns={initialColumns}
            data={deals}
            onDataChange={setDeals}
          >
            {(column) => (
              <KanbanBoard key={column.id} id={column.id}>
                <KanbanHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{column.name}</h3>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">
                      {deals.filter((deal) => deal.column === column.id).length}
                    </span>
                  </div>
                </KanbanHeader>
                <KanbanCards id={column.id}>
                  {(deal: Deal) => {
                    const nextDeadline = getNextDeadline(deal.deadlines);
                    return (
                      <KanbanCard
                        key={deal.id}
                        id={deal.id}
                        name={deal.name}
                        column={deal.column}
                        className={getUsageColor(deal.usage.whitelist)}
                      >
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{deal.name}</h4>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Brand</span>
                              <span className="text-xs font-semibold">{deal.brand}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Creator</span>
                              <span className="text-xs">{deal.creator}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Contact</span>
                              <span className="text-xs">{deal.contact_name}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Budget</span>
                              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                {formatCurrency(deal.budget)}
                              </span>
                            </div>
                            
                            {nextDeadline && (
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">Next Deadline</span>
                                <div className="text-right">
                                  <div className="text-xs font-medium">{nextDeadline.name}</div>
                                  <div className={`text-xs ${
                                    getDaysUntilDeadline(nextDeadline.date) <= 3 
                                      ? "text-red-600 dark:text-red-400" 
                                      : getDaysUntilDeadline(nextDeadline.date) <= 7
                                      ? "text-yellow-600 dark:text-yellow-400"
                                      : "text-green-600 dark:text-green-400"
                                  }`}>
                                    {formatDate(nextDeadline.date)} ({getDaysUntilDeadline(nextDeadline.date)}d)
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Deliverables</span>
                              <span className="text-xs">{deal.deliverables.length} items</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              deal.usage.whitelist
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}>
                              {deal.usage.whitelist ? "Whitelist" : "Standard"}
                            </span>
                            
                            <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              {deal.exclusivity.category}
                            </span>
                          </div>

                          {deal.notes && (
                            <div className="pt-2 border-t">
                              <p className="text-xs text-muted-foreground italic">
                                {deal.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </KanbanCard>
                    );
                  }}
                </KanbanCards>
              </KanbanBoard>
            )}
          </KanbanProvider>
        </div>
      </div>
    </div>
  );
}
