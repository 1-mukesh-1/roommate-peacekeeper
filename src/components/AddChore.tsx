import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Roommate } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AddChoreProps {
  roommates: Roommate[];
  onSave: (chore: {
    name: string;
    assignedTo: string;
    effort: number;
    dueDate: Date;
  }) => void;
  onCancel: () => void;
}

export function AddChore({ roommates, onSave, onCancel }: AddChoreProps) {
  const [name, setName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [effort, setEffort] = useState('15');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (name && assignedTo && dueDate) {
      onSave({
        name,
        assignedTo,
        effort: parseInt(effort),
        dueDate: new Date(dueDate),
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1>Add Chore</h1>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              placeholder="e.g., Clean Kitchen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="assignTo">Assign To</Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select roommate" />
              </SelectTrigger>
              <SelectContent>
                {roommates.map((roommate) => (
                  <SelectItem key={roommate.id} value={roommate.id}>
                    {roommate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="effort">Estimated Effort (minutes)</Label>
            <Input
              id="effort"
              type="number"
              placeholder="15"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!name || !assignedTo || !dueDate}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
