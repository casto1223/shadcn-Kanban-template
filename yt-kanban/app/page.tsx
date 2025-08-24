"use client";

import { useState } from "react";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Deal } from "@/types/deal";
import { initialColumns, initialDeals } from "@/data/fakedata";

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

  // Map column IDs to their corresponding stage suggestion names
  const getStageNameFromColumnId = (columnId: string): string => {
    const columnMap: Record<string, string> = {
      "new": "New",
      "negotiation": "Negotiation", 
      "contract": "Contract",
      "draft": "Draft",
      "live": "Live",
      "paid": "Paid",
    };
    return columnMap[columnId] || columnId;
  };

  // Custom data change handler that updates stage_suggestion when deals move
  const handleDataChange = (newDeals: Deal[]) => {
    const updatedDeals = newDeals.map(deal => ({
      ...deal,
      stage_suggestion: getStageNameFromColumnId(deal.column)
    }));
    setDeals(updatedDeals);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Brand Deals Tracker
          </p>
        </div>

        <div className="h-[calc(100vh-200px)]">
          <TooltipProvider delayDuration={300}>
            <KanbanProvider
              columns={initialColumns}
              data={deals}
              onDataChange={handleDataChange}
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
                        <Tooltip key={deal.id}>
                          <TooltipTrigger asChild>
                            <div>
                              <KanbanCard
                                id={deal.id}
                                name={deal.name}
                                column={deal.column}
                                className={getUsageColor(deal.usage.whitelist)}
                              >
                                {/* Compact Card Content - Only Name, Brand, Creator */}
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm line-clamp-2">{deal.name}</h4>
                                  
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-medium text-muted-foreground">Brand</span>
                                      <span className="text-xs font-semibold truncate ml-2">{deal.brand}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-medium text-muted-foreground">Creator</span>
                                      <span className="text-xs truncate ml-2">{deal.creator}</span>
                                    </div>
                                  </div>
                                </div>
                              </KanbanCard>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-sm p-4 bg-card border shadow-lg">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm border-b pb-2 text-card-foreground">{deal.name}</h4>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Brand</span>
                                  <span className="text-xs font-semibold text-card-foreground">{deal.brand}</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Creator</span>
                                  <span className="text-xs text-card-foreground">{deal.creator}</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Contact</span>
                                  <span className="text-xs text-card-foreground">{deal.contact_name}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Email</span>
                                  <span className="text-xs text-card-foreground break-all">{deal.contact_email}</span>
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
                                      <div className="text-xs font-medium text-card-foreground">{nextDeadline.name}</div>
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
                                  <span className="text-xs text-card-foreground">{deal.deliverables.length} items</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Usage Term</span>
                                  <span className="text-xs text-card-foreground">{deal.usage.term_days} days</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-muted-foreground">Exclusivity</span>
                                  <span className="text-xs text-card-foreground">{deal.exclusivity.term_days} days</span>
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
                                  <span className="text-xs font-medium text-muted-foreground block mb-1">Notes</span>
                                  <p className="text-xs text-muted-foreground">
                                    {deal.notes}
                                  </p>
                                </div>
                              )}

                              {deal.deliverables.length > 0 && (
                                <div className="pt-2 border-t">
                                  <span className="text-xs font-medium text-muted-foreground block mb-2">Deliverables</span>
                                  <div className="space-y-1 max-h-32 overflow-y-auto">
                                    {deal.deliverables.map((deliverable, idx) => (
                                      <div key={idx} className="text-xs flex justify-between text-card-foreground">
                                        <span>{deliverable.platform} - {deliverable.format}</span>
                                        <span className="font-medium">{deliverable.count}x</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }}
                  </KanbanCards>
                </KanbanBoard>
              )}
            </KanbanProvider>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
