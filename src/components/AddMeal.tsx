import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Roommate } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AddMealProps {
  roommates: Roommate[];
  onSave: (meal: { name: string; cookedBy: string; ateBy: string[] }) => void;
  onCancel: () => void;
}

export function AddMeal({ roommates, onSave, onCancel }: AddMealProps) {
  const [name, setName] = useState('');
  const [cookedBy, setCookedBy] = useState('');
  const [ateBy, setAteBy] = useState<string[]>([]);

  const handleToggleAteBy = (roommateId: string) => {
    setAteBy((prev) =>
      prev.includes(roommateId)
        ? prev.filter((id) => id !== roommateId)
        : [...prev, roommateId]
    );
  };

  const handleSave = () => {
    if (name && cookedBy && ateBy.length > 0) {
      onSave({ name, cookedBy, ateBy });
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
          <h1>Add Meal</h1>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <Label htmlFor="mealName">Meal Name</Label>
            <Input
              id="mealName"
              placeholder="e.g., Pasta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="cookedBy">Who Cooked?</Label>
            <Select value={cookedBy} onValueChange={setCookedBy}>
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
            <Label>Who Ate?</Label>
            <div className="space-y-3 mt-3">
              {roommates.map((roommate) => (
                <div key={roommate.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`ate-${roommate.id}`}
                    checked={ateBy.includes(roommate.id)}
                    onCheckedChange={() => handleToggleAteBy(roommate.id)}
                  />
                  <Label
                    htmlFor={`ate-${roommate.id}`}
                    className="cursor-pointer"
                  >
                    {roommate.name}
                  </Label>
                </div>
              ))}
            </div>
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
              disabled={!name || !cookedBy || ateBy.length === 0}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
