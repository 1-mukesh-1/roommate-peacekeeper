import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Activity, Roommate } from '../types';
import { toast } from 'sonner';

interface EditActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity | null;
  roommates: Roommate[];
  onUpdate: (id: string, updates: Partial<Activity>) => void;
  onDelete: (id: string) => void;
}

export function EditActivityDialog({
  open,
  onOpenChange,
  activity,
  roommates,
  onUpdate,
  onDelete,
}: EditActivityDialogProps) {
  // Chore state
  const [choreName, setChoreName] = useState('');
  const [choreAssignedTo, setChoreAssignedTo] = useState('');
  const [choreEffort, setChoreEffort] = useState([30]);
  const [choreDueDate, setChoreDueDate] = useState('');
  const [choreDueTime, setChoreDueTime] = useState('12:00');
  const [choreCompleted, setChoreCompleted] = useState(false);

  // Meal state
  const [mealName, setMealName] = useState('');
  const [mealCookedBy, setMealCookedBy] = useState('');
  const [mealAteBy, setMealAteBy] = useState<string[]>([]);

  // Purchase state
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchasePaidBy, setPurchasePaidBy] = useState('');
  const [purchaseSplitAmong, setPurchaseSplitAmong] = useState<string[]>([]);

  // Initialize form with activity data
  useEffect(() => {
    if (activity) {
      if (activity.type === 'chore') {
        setChoreName(activity.name);
        setChoreAssignedTo(activity.assignedTo || '');
        setChoreEffort([activity.effort || 30]);
        setChoreCompleted(activity.completed);
        
        if (activity.dueDate) {
          const date = new Date(activity.dueDate);
          setChoreDueDate(date.toISOString().split('T')[0]);
          setChoreDueTime(
            `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
          );
        }
      } else if (activity.type === 'meal') {
        setMealName(activity.name);
        setMealCookedBy(activity.cookedBy || '');
        setMealAteBy(activity.ateBy || []);
      } else if (activity.type === 'purchase') {
        setPurchaseName(activity.name);
        setPurchaseAmount(activity.amount?.toString() || '');
        setPurchasePaidBy(activity.paidBy || '');
        setPurchaseSplitAmong(activity.splitAmong || []);
      }
    }
  }, [activity]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    if (!activity) return;

    if (activity.type === 'chore') {
      if (choreName && choreAssignedTo && choreDueDate) {
        // Parse date string manually to avoid timezone issues
        const [year, month, day] = choreDueDate.split('-').map(Number);
        const [hours, minutes] = choreDueTime.split(':').map(Number);
        const dueDate = new Date(year, month - 1, day, hours, minutes);

        onUpdate(activity.id, {
          name: choreName,
          assignedTo: choreAssignedTo,
          effort: choreEffort[0],
          dueDate,
          completed: choreCompleted,
        });

        toast.success('Chore updated successfully!');
        handleClose();
      }
    } else if (activity.type === 'meal') {
      if (mealName && mealCookedBy && mealAteBy.length > 0) {
        onUpdate(activity.id, {
          name: mealName,
          cookedBy: mealCookedBy,
          ateBy: mealAteBy,
        });

        toast.success('Meal updated successfully!');
        handleClose();
      }
    } else if (activity.type === 'purchase') {
      if (purchaseName && purchaseAmount && purchasePaidBy && purchaseSplitAmong.length > 0) {
        onUpdate(activity.id, {
          name: purchaseName,
          amount: parseFloat(purchaseAmount),
          paidBy: purchasePaidBy,
          splitAmong: purchaseSplitAmong,
        });

        toast.success('Purchase updated successfully!');
        handleClose();
      }
    }
  };

  const handleDelete = () => {
    if (activity && confirm('Are you sure you want to delete this activity?')) {
      onDelete(activity.id);
      toast.success('Activity deleted successfully!');
      handleClose();
    }
  };

  const toggleMealAteBy = (roommateId: string) => {
    setMealAteBy((prev) =>
      prev.includes(roommateId)
        ? prev.filter((id) => id !== roommateId)
        : [...prev, roommateId]
    );
  };

  const togglePurchaseSplitAmong = (roommateId: string) => {
    setPurchaseSplitAmong((prev) =>
      prev.includes(roommateId)
        ? prev.filter((id) => id !== roommateId)
        : [...prev, roommateId]
    );
  };

  if (!activity) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] max-h-[700px] overflow-y-auto">
        {activity.type === 'chore' && (
          <>
            <DialogHeader>
              <DialogTitle>Edit Chore</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="chore-name">Task Name</Label>
                <Input
                  id="chore-name"
                  placeholder="e.g., Clean the kitchen"
                  value={choreName}
                  onChange={(e) => setChoreName(e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="assigned-to">Assigned To</Label>
                <select
                  id="assigned-to"
                  className="mt-2 w-full h-12 rounded-lg border border-gray-300 px-4 py-2 bg-white text-base"
                  value={choreAssignedTo}
                  onChange={(e) => setChoreAssignedTo(e.target.value)}
                >
                  <option value="">Select roommate</option>
                  {roommates.map((roommate) => (
                    <option key={roommate.id} value={roommate.id}>
                      {roommate.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Estimated Duration: {choreEffort[0]} minutes</Label>
                <Slider
                  value={choreEffort}
                  onValueChange={setChoreEffort}
                  max={120}
                  min={5}
                  step={5}
                  className="mt-3"
                />
              </div>

              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={choreDueDate}
                  onChange={(e) => setChoreDueDate(e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="due-time">Due Time</Label>
                <Input
                  id="due-time"
                  type="time"
                  value={choreDueTime}
                  onChange={(e) => setChoreDueTime(e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="completed"
                  checked={choreCompleted}
                  onCheckedChange={(checked) => setChoreCompleted(checked as boolean)}
                  className="w-5 h-5"
                />
                <Label htmlFor="completed" className="cursor-pointer flex-1">
                  Mark as completed
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!choreName || !choreAssignedTo || !choreDueDate}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </>
        )}

        {activity.type === 'meal' && (
          <>
            <DialogHeader>
              <DialogTitle>Edit Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="meal-name">Meal Name</Label>
                <Input
                  id="meal-name"
                  placeholder="e.g., Spaghetti Bolognese"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="cooked-by">Cooked By</Label>
                <select
                  id="cooked-by"
                  className="mt-2 w-full h-12 rounded-lg border border-gray-300 px-4 py-2 bg-white text-base"
                  value={mealCookedBy}
                  onChange={(e) => setMealCookedBy(e.target.value)}
                >
                  <option value="">Select roommate</option>
                  {roommates.map((roommate) => (
                    <option key={roommate.id} value={roommate.id}>
                      {roommate.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Who Ate?</Label>
                <div className="space-y-3 mt-3">
                  {roommates.map((roommate) => (
                    <div key={roommate.id} className="flex items-center gap-3 min-h-[44px]">
                      <Checkbox
                        id={`ate-${roommate.id}`}
                        checked={mealAteBy.includes(roommate.id)}
                        onCheckedChange={() => toggleMealAteBy(roommate.id)}
                        className="w-5 h-5"
                      />
                      <Label
                        htmlFor={`ate-${roommate.id}`}
                        className="cursor-pointer flex-1"
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
                  onClick={handleDelete}
                  className="h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!mealName || !mealCookedBy || mealAteBy.length === 0}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-300"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </>
        )}

        {activity.type === 'purchase' && (
          <>
            <DialogHeader>
              <DialogTitle>Edit Purchase</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div>
                <Label htmlFor="purchase-name">Item Name</Label>
                <Input
                  id="purchase-name"
                  placeholder="e.g., Groceries"
                  value={purchaseName}
                  onChange={(e) => setPurchaseName(e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="paid-by">Paid By</Label>
                <select
                  id="paid-by"
                  className="mt-2 w-full h-12 rounded-lg border border-gray-300 px-4 py-2 bg-white text-base"
                  value={purchasePaidBy}
                  onChange={(e) => setPurchasePaidBy(e.target.value)}
                >
                  <option value="">Select roommate</option>
                  {roommates.map((roommate) => (
                    <option key={roommate.id} value={roommate.id}>
                      {roommate.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Split Among</Label>
                <div className="space-y-3 mt-3">
                  {roommates.map((roommate) => (
                    <div key={roommate.id} className="flex items-center gap-3 min-h-[44px]">
                      <Checkbox
                        id={`split-${roommate.id}`}
                        checked={purchaseSplitAmong.includes(roommate.id)}
                        onCheckedChange={() =>
                          togglePurchaseSplitAmong(roommate.id)
                        }
                        className="w-5 h-5"
                      />
                      <Label
                        htmlFor={`split-${roommate.id}`}
                        className="cursor-pointer flex-1"
                      >
                        {roommate.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {purchaseAmount && purchaseSplitAmong.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-900 mb-2">Split Preview:</p>
                  <div className="space-y-1">
                    {purchaseSplitAmong.map((id) => (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {roommates.find(r => r.id === id)?.name}
                        </span>
                        <span className="text-gray-900">
                          ${(parseFloat(purchaseAmount) / purchaseSplitAmong.length).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={
                    !purchaseName ||
                    !purchaseAmount ||
                    !purchasePaidBy ||
                    purchaseSplitAmong.length === 0
                  }
                  className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-300"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}