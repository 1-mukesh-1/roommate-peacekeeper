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

interface AddPurchaseProps {
  roommates: Roommate[];
  onSave: (purchase: {
    name: string;
    amount: number;
    paidBy: string;
    splitAmong: string[];
  }) => void;
  onCancel: () => void;
}

export function AddPurchase({ roommates, onSave, onCancel }: AddPurchaseProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitAmong, setSplitAmong] = useState<string[]>([]);

  const handleToggleSplitAmong = (roommateId: string) => {
    setSplitAmong((prev) =>
      prev.includes(roommateId)
        ? prev.filter((id) => id !== roommateId)
        : [...prev, roommateId]
    );
  };

  const handleSave = () => {
    if (name && amount && paidBy && splitAmong.length > 0) {
      onSave({
        name,
        amount: parseFloat(amount),
        paidBy,
        splitAmong,
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
          <h1>Add Purchase</h1>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              placeholder="e.g., Milk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="paidBy">Paid By</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
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
            <Label>Split Among</Label>
            <div className="space-y-3 mt-3">
              {roommates.map((roommate) => (
                <div key={roommate.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`split-${roommate.id}`}
                    checked={splitAmong.includes(roommate.id)}
                    onCheckedChange={() => handleToggleSplitAmong(roommate.id)}
                  />
                  <Label
                    htmlFor={`split-${roommate.id}`}
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
              disabled={!name || !amount || !paidBy || splitAmong.length === 0}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
