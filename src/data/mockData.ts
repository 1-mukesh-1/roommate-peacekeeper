import { Roommate, Activity, FairnessScore } from '../types';

export const roommates: Roommate[] = [
  { id: '1', name: 'Mukesh' },
  { id: '2', name: 'Suraj' },
  { id: '3', name: 'Parwaz' },
];

// Helper to get dates relative to today
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const threeDaysFromNow = new Date(today);
threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

export const initialActivities: Activity[] = [
  {
    id: '1',
    type: 'chore',
    name: 'Vacuum Living Room',
    assignedTo: '1', // Mukesh
    dueDate: twoDaysAgo, // Overdue
    completed: false,
    effort: 30,
  },
  {
    id: '2',
    type: 'chore',
    name: 'Replace Air Filters',
    assignedTo: '2', // Suraj
    dueDate: tomorrow,
    completed: false,
    effort: 15,
  },
  {
    id: '3',
    type: 'chore',
    name: 'Take Out Trash',
    assignedTo: '1', // Mukesh
    dueDate: threeDaysFromNow,
    completed: false,
    effort: 10,
  },
  {
    id: '4',
    type: 'chore',
    name: 'Clean Bathroom',
    assignedTo: '3', // Parwaz
    dueDate: nextWeek,
    completed: false,
    effort: 45,
  },
  {
    id: '5',
    type: 'meal',
    name: 'Dal Tadka',
    cookedBy: '3', // Parwaz
    ateBy: ['1', '2', '3'],
    completed: true,
  },
  {
    id: '6',
    type: 'meal',
    name: 'Pasta Primavera',
    cookedBy: '1', // Mukesh
    ateBy: ['1', '2'],
    completed: true,
  },
  {
    id: '7',
    type: 'purchase',
    name: 'Groceries',
    amount: 45.50,
    paidBy: '2', // Suraj
    splitAmong: ['1', '2', '3'], // Split equally among all
    completed: false,
  },
  {
    id: '8',
    type: 'purchase',
    name: 'Internet Bill',
    amount: 60.00,
    paidBy: '3', // Parwaz
    splitAmong: ['1', '2', '3'], // Split equally among all
    completed: false,
  },
];

export const initialFairnessScores: FairnessScore[] = [
  { roommateId: '1', score: 68 }, // Mukesh - highest
  { roommateId: '2', score: 52 }, // Suraj - medium
  { roommateId: '3', score: 50 }, // Parwaz - lowest
];
