export interface Roommate {
  id: string;
  name: string;
  avatar?: string;
}

export interface Activity {
  id: string;
  type: 'chore' | 'meal' | 'purchase';
  name: string;
  assignedTo?: string;
  dueDate?: Date;
  completed: boolean;
  effort?: number; // in minutes
  cookedBy?: string;
  ateBy?: string[];
  amount?: number;
  paidBy?: string;
  splitAmong?: string[];
}

export interface FairnessScore {
  roommateId: string;
  score: number;
}
