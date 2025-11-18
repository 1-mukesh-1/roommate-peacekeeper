import { useState } from 'react';
import { ClipboardList, Utensils, ShoppingBag, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Roommate } from '../types';
import { toast } from 'sonner';

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roommates: Roommate[];
  onAddChore: (chore: {
    name: string;
    assignedTo: string;
    effort: number;
    dueDate: Date;
  }) => void;
  onAddMeal: (meal: {
    name: string;
    cookedBy: string;
    ateBy: string[];
  }) => void;
  onAddPurchase: (purchase: {
    name: string;
    amount: number;
    paidBy: string;
    splitAmong: string[];
  }) => void;
}

type DialogStep = 'selection' | 'chore' | 'meal' | 'purchase';
type SplitMethod = 'equal' | 'percentage' | 'custom';

export function AddActivityDialog({
  open,
  onOpenChange,
  roommates,
  onAddChore,
  onAddMeal,
  onAddPurchase,
}: AddActivityDialogProps) {
  const [step, setStep] = useState<DialogStep>('selection');

  // Chore state
  const [choreName, setChoreName] = useState('');
  const [choreAssignedTo, setChoreAssignedTo] = useState('');
  const [choreEffort, setChoreEffort] = useState([30]);
  const [choreDueDate, setChoreDueDate] = useState('');
  const [choreDueTime, setChoreDueTime] = useState('12:00');

  // Meal state
  const [mealName, setMealName] = useState('');
  const [mealCookedBy, setMealCookedBy] = useState('');
  const [mealAteBy, setMealAteBy] = useState<string[]>([]);

  // Purchase state
  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchasePaidBy, setPurchasePaidBy] = useState('');
  const [purchaseSplitAmong, setPurchaseSplitAmong] = useState<string[]>([]);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal');
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});
  const [percentages, setPercentages] = useState<Record<string, string>>({});

  const resetForm = () => {
    setStep('selection');
    setChoreName('');
    setChoreAssignedTo('');
    setChoreEffort([30]);
    setChoreDueDate('');
    setChoreDueTime('12:00');
    setMealName('');
    setMealCookedBy('');
    setMealAteBy([]);
    setPurchaseName('');
    setPurchaseAmount('');
    setPurchasePaidBy('');
    setPurchaseSplitAmong([]);
    setSplitMethod('equal');
    setCustomAmounts({});
    setPercentages({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleSelectType = (type: DialogStep) => {
    setStep(type);
  };

  const handleSaveChore = () => {
    if (choreName && choreAssignedTo && choreDueDate) {
      // Parse date string manually to avoid timezone issues
      const [year, month, day] = choreDueDate.split('-').map(Number);
      const [hours, minutes] = choreDueTime.split(':').map(Number);
      const dueDate = new Date(year, month - 1, day, hours, minutes);
      
      onAddChore({
        name: choreName,
        assignedTo: choreAssignedTo,
        effort: choreEffort[0],
        dueDate,
      });
      
      toast.success('Chore added successfully!', {
        description: `${choreName} assigned to ${roommates.find(r => r.id === choreAssignedTo)?.name}`,
      });
      
      handleClose();
    }
  };

  const handleSaveMeal = () => {
    if (mealName && mealCookedBy && mealAteBy.length > 0) {
      onAddMeal({
        name: mealName,
        cookedBy: mealCookedBy,
        ateBy: mealAteBy,
      });
      
      toast.success('Meal logged successfully!', {
        description: `${mealName} cooked by ${roommates.find(r => r.id === mealCookedBy)?.name}`,
      });
      
      handleClose();
    }
  };

  const handleSavePurchase = () => {
    if (purchaseName && purchaseAmount && purchasePaidBy && purchaseSplitAmong.length > 0) {
      onAddPurchase({
        name: purchaseName,
        amount: parseFloat(purchaseAmount),
        paidBy: purchasePaidBy,
        splitAmong: purchaseSplitAmong,
      });
      
      toast.success('Purchase added successfully!', {
        description: `$${purchaseAmount} split among ${purchaseSplitAmong.length} people`,
      });
      
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

  const calculateSplitPreview = () => {
    if (!purchaseAmount || purchaseSplitAmong.length === 0) return null;

    const total = parseFloat(purchaseAmount);
    
    if (splitMethod === 'equal') {
      const perPerson = total / purchaseSplitAmong.length;
      return purchaseSplitAmong.map(id => ({
        roommateId: id,
        amount: perPerson.toFixed(2)
      }));
    }
    
    return null;
  };

  const splitPreview = calculateSplitPreview();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[360px] max-h-[700px] overflow-y-auto">
        {step === 'selection' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Add New Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 border-blue-300 bg-blue-50/50 active:scale-[0.98]"
                onClick={() => handleSelectType('chore')}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ClipboardList className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">Chore</h3>
                      <p className="text-sm text-gray-600">
                        Track household tasks and responsibilities
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 border-green-200 active:scale-[0.98]"
                onClick={() => handleSelectType('meal')}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Utensils className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">Meal</h3>
                      <p className="text-sm text-gray-600">
                        Log who cooked and who enjoyed the meal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 border-purple-200 active:scale-[0.98]"
                onClick={() => handleSelectType('purchase')}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">Purchase</h3>
                      <p className="text-sm text-gray-600">
                        Split costs and track shared expenses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {step === 'chore' && (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Add Chore</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('selection')}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
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
                <p className="text-xs text-gray-500 mt-2">
                  How long will this task take?
                </p>
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
                <p className="text-xs text-gray-500 mt-2">
                  When should this task be completed?
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('selection')}
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSaveChore}
                  disabled={!choreName || !choreAssignedTo || !choreDueDate}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300"
                >
                  Add Chore
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'meal' && (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Add Meal</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('selection')}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
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
                  onClick={() => setStep('selection')}
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSaveMeal}
                  disabled={!mealName || !mealCookedBy || mealAteBy.length === 0}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-300"
                >
                  Add Meal
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'purchase' && (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Add Purchase</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep('selection')}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
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
                <Label>Splitting Method</Label>
                <div className="space-y-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setSplitMethod('equal')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all min-h-[60px] ${
                      splitMethod === 'equal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <p className="text-gray-900">Split Equally</p>
                      <p className="text-sm text-gray-600">
                        Divide the total amount evenly among all participants
                      </p>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSplitMethod('percentage')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all min-h-[60px] ${
                      splitMethod === 'percentage'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <p className="text-gray-900">Split by Percentage</p>
                      <p className="text-sm text-gray-600">
                        Assign a percentage of the total to each person
                      </p>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setSplitMethod('custom')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all min-h-[60px] ${
                      splitMethod === 'custom'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <p className="text-gray-900">Custom Amounts</p>
                      <p className="text-sm text-gray-600">
                        Enter a specific amount for each person manually
                      </p>
                    </div>
                  </button>
                </div>
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

              {splitPreview && splitPreview.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-900 mb-2">Split Preview:</p>
                  <div className="space-y-1">
                    {splitPreview.map((item) => (
                      <div key={item.roommateId} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {roommates.find(r => r.id === item.roommateId)?.name}
                        </span>
                        <span className="text-gray-900">${item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('selection')}
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSavePurchase}
                  disabled={
                    !purchaseName ||
                    !purchaseAmount ||
                    !purchasePaidBy ||
                    purchaseSplitAmong.length === 0
                  }
                  className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-300"
                >
                  Add Purchase
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}