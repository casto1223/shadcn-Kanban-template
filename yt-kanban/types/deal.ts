export type Deal = {
  id: string;
  name: string;
  column: string;
  brand: string;
  contact_name: string;
  contact_email: string;
  creator: string;
  budget: {
    amount: number;
    currency: string;
  };
  deliverables: Array<{
    platform: string;
    format: string;
    count: number;
  }>;
  deadlines: Array<{
    name: string;
    date: string;
  }>;
  usage: {
    whitelist: boolean;
    term_days: number;
  };
  exclusivity: {
    category: string;
    term_days: number;
  };
  stage_suggestion: string;
  notes: string;
};

export type Column = {
  id: string;
  name: string;
};
