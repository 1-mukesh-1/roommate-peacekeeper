import { useState } from 'react';
import { AlertTriangle, CheckCircle2, UtensilsCrossed, ShoppingCart, ClipboardList } from 'lucide-react';
import { Activity, Roommate } from '../types';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface AllActivitiesProps {
  activities: Activity[];
  roommates: Roommate[];
  onToggleComplete: (id: string) => void;
  onEditActivity: (activity: Activity) => void;
}

export function AllActivities({
  activities,
  roommates,
  onToggleComplete,
  onEditActivity,
}: AllActivitiesProps) {
  const [filter, setFilter] = useState<string>('all');

  const getRoommateName = (id: string) => {
    return roommates.find((r) => r.id === id)?.name || 'Unknown';
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activityDate = new Date(date);
    activityDate.setHours(0, 0, 0, 0);

    if (activityDate.getTime() === today.getTime()) {
      return 'Today';
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (activityDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }

    return activityDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  };

  const filteredActivities = activities
    .filter((activity) => {
      if (filter === 'all') return true;
      if (filter === 'chores') return activity.type === 'chore';
      if (filter === 'meals') return activity.type === 'meal';
      if (filter === 'purchases') return activity.type === 'purchase';
      return true;
    })
    .sort((a, b) => {
      // Sort chores: incomplete first, then by due date
      if (a.type === 'chore' && b.type === 'chore') {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1; // Incomplete tasks first
        }
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
      }
      // Keep other activities in their original order
      return 0;
    });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'chore':
        return ClipboardList;
      case 'meal':
        return UtensilsCrossed;
      case 'purchase':
        return ShoppingCart;
      default:
        return CheckCircle2;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'chore':
        return 'text-blue-600 bg-blue-100';
      case 'meal':
        return 'text-green-600 bg-green-100';
      case 'purchase':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const ActivityCard = ({ activity }: { activity: Activity }) => {
    const Icon = getActivityIcon(activity.type);
    const overdue =
      activity.type === 'chore' &&
      activity.dueDate &&
      isOverdue(activity.dueDate) &&
      !activity.completed;

    return (
      <Card
        className={`transition-all hover:shadow-md cursor-pointer ${
          overdue ? 'border-red-300 bg-red-50' : ''
        }`}
        onClick={() => onEditActivity(activity)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {activity.type === 'chore' && (
              <Checkbox
                checked={activity.completed}
                onCheckedChange={() => onToggleComplete(activity.id)}
                onClick={(e) => e.stopPropagation()}
                className="mt-1 w-5 h-5"
              />
            )}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(
                activity.type
              )}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900">{activity.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.type === 'chore' &&
                      activity.assignedTo &&
                      `${getRoommateName(activity.assignedTo)} • ${
                        activity.dueDate && formatDate(activity.dueDate)
                      }`}
                    {activity.type === 'meal' &&
                      activity.cookedBy &&
                      `Cooked by ${getRoommateName(activity.cookedBy)}`}
                    {activity.type === 'purchase' &&
                      activity.paidBy &&
                      activity.splitAmong &&
                      `${getRoommateName(activity.paidBy)} → ${activity.splitAmong
                        .map(getRoommateName)
                        .join(', ')} ($${activity.amount})`}
                  </p>
                  {activity.type === 'chore' && activity.effort && (
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.effort} min
                    </p>
                  )}
                </div>
                {overdue && (
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                )}
                {activity.completed && activity.type === 'chore' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto p-6 pb-24 pt-14">
        <h1 className="mb-6">All Activities</h1>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="all" className="text-sm">
              All
              <span className="ml-1.5 px-1.5 py-0.5 bg-gray-200 rounded-full text-xs">
                {activities.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="chores" className="text-sm">
              Chores
              <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                {activities.filter((a) => a.type === 'chore').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="text-sm">
              Meals
              <span className="ml-1.5 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                {activities.filter((a) => a.type === 'meal').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="purchases" className="text-sm">
              Purchases
              <span className="ml-1.5 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                {activities.filter((a) => a.type === 'purchase').length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Activities List */}
        <div className="space-y-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No activities found</p>
              <p className="text-sm text-gray-400 mt-1">
                Add your first activity to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}