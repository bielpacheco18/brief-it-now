
export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
};

export type BriefingField = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'dropdown' | 'number' | 'date' | 'email';
  options?: string[]; // For dropdown fields
  required: boolean;
  placeholder?: string;
  value?: string;
  tip?: string;
};

export type Briefing = {
  id: string;
  title: string;
  description?: string;
  fields: BriefingField[];
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string; // User ID
  responses: BriefingResponse[];
};

export type BriefingResponse = {
  id: string;
  briefingId: string;
  answers: Record<string, string>; // Field ID to answer
  submittedBy?: string; // Client name/email
  submittedAt: Date;
};

export type ProjectType = 
  | 'website' 
  | 'app' 
  | 'branding' 
  | 'marketing'
  | 'design'
  | 'other';
