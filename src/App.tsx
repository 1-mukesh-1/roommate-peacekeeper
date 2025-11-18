import { useState } from 'react';
import { Activity, Roommate, FairnessScore } from './types';
import { roommates as initialRoommates, initialActivities, initialFairnessScores } from './data/mockData';
import { Home } from './components/Home';
import { AllActivities } from './components/AllActivities';
import { FairnessScore as FairnessScoreScreen } from './components/FairnessScore';
import { Settings } from './components/Settings';
import { BottomNav } from './components/BottomNav';
import { PhoneFrame } from './components/PhoneFrame';
import { AddActivityDialog } from './components/AddActivityDialog';
import { EditActivityDialog } from './components/EditActivityDialog';
import { Toaster } from './components/ui/sonner';

type Screen = 'home' | 'activities' | 'fairness' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [roommates, setRoommates] = useState<Roommate[]>(initialRoommates);
  const [scores, setScores] = useState<FairnessScore[]>(initialFairnessScores);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleNavigate = (screen: string) => {
    if (screen === 'add') {
      setIsAddDialogOpen(true);
    } else {
      setCurrentScreen(screen as Screen);
    }
  };

  const handleToggleComplete = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const handleAddChore = (chore: {
    name: string;
    assignedTo: string;
    effort: number;
    dueDate: Date;
  }) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'chore',
      name: chore.name,
      assignedTo: chore.assignedTo,
      dueDate: chore.dueDate,
      effort: chore.effort,
      completed: false,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const handleAddMeal = (meal: {
    name: string;
    cookedBy: string;
    ateBy: string[];
  }) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'meal',
      name: meal.name,
      cookedBy: meal.cookedBy,
      ateBy: meal.ateBy,
      completed: true,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const handleAddPurchase = (purchase: {
    name: string;
    amount: number;
    paidBy: string;
    splitAmong: string[];
  }) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'purchase',
      name: purchase.name,
      amount: purchase.amount,
      paidBy: purchase.paidBy,
      splitAmong: purchase.splitAmong,
      completed: false,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsEditDialogOpen(true);
  };

  const handleUpdateActivity = (id: string, updates: Partial<Activity>) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
    setIsEditDialogOpen(false);
    setEditingActivity(null);
  };

  const handleUpdateRoommate = (id: string, name: string) => {
    setRoommates((prev) =>
      prev.map((roommate) =>
        roommate.id === id ? { ...roommate, name } : roommate
      )
    );
  };

  const handleAddRoommate = (name: string) => {
    const newRoommate: Roommate = {
      id: Date.now().toString(),
      name,
    };
    setRoommates((prev) => [...prev, newRoommate]);
  };

  const handleDeleteRoommate = (id: string) => {
    setRoommates((prev) => prev.filter((roommate) => roommate.id !== id));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home
            activities={activities}
            roommates={roommates}
            onNavigate={handleNavigate}
            onToggleComplete={handleToggleComplete}
            onEditActivity={handleEditActivity}
          />
        );
      case 'activities':
        return (
          <AllActivities
            activities={activities}
            roommates={roommates}
            onToggleComplete={handleToggleComplete}
            onEditActivity={handleEditActivity}
          />
        );
      case 'fairness':
        return <FairnessScoreScreen roommates={roommates} scores={scores} />;
      case 'settings':
        return (
          <Settings
            roommates={roommates}
            onUpdateRoommate={handleUpdateRoommate}
            onAddRoommate={handleAddRoommate}
            onDeleteRoommate={handleDeleteRoommate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PhoneFrame>
        <div className="h-full flex flex-col bg-gray-50">
          <div className="flex-1 overflow-y-auto">
            {renderScreen()}
          </div>
          <BottomNav activeScreen={currentScreen} onNavigate={handleNavigate} />
          
          <AddActivityDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            roommates={roommates}
            onAddChore={handleAddChore}
            onAddMeal={handleAddMeal}
            onAddPurchase={handleAddPurchase}
          />

          <EditActivityDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            activity={editingActivity}
            roommates={roommates}
            onUpdate={handleUpdateActivity}
            onDelete={handleDeleteActivity}
          />
        </div>
      </PhoneFrame>
      <Toaster position="top-center" richColors />
    </>
  );
}