import { AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { Activity, Roommate } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';

interface HomeProps {
  activities: Activity[];
  roommates: Roommate[];
  onNavigate: (screen: string) => void;
  onToggleComplete: (id: string) => void;
  onEditActivity: (activity: Activity) => void;
}

export function Home({ activities, roommates, onNavigate, onToggleComplete, onEditActivity }: HomeProps) {
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

  const chores = activities.filter((a) => a.type === 'chore' && !a.completed);
  const missedTasks = chores.filter((a) => a.dueDate && isOverdue(a.dueDate)).sort((a, b) => {
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  });
  const upcomingTasks = chores.filter((a) => a.dueDate && !isOverdue(a.dueDate)).sort((a, b) => {
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  });

  // Calculate fairness score (simple average for demo)
  const fairnessScore = 65;
  const scoreColor = fairnessScore >= 70 ? 'text-green-600' : fairnessScore >= 50 ? 'text-orange-500' : 'text-red-600';
  const strokeColor = fairnessScore >= 70 ? '#10b981' : fairnessScore >= 50 ? '#f97316' : '#ef4444';

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-full">
      <div className="max-w-2xl mx-auto p-6 pb-24 pt-14">
        <div className="text-center mb-8">
          <h1 className="text-blue-900 mb-2">Roommate Peacekeeper</h1>
          <p className="text-gray-600">Keep your household running smoothly</p>
        </div>

        {/* Missed Tasks */}
        {missedTasks.length > 0 && (
          <Card className="mb-6 border-red-300 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                {missedTasks.length} Overdue Task{missedTasks.length !== 1 ? 's' : ''}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {missedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm min-h-[60px] cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onEditActivity(task)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggleComplete(task.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900">{task.name}</p>
                      <p className="text-sm text-gray-600">
                        {task.assignedTo && getRoommateName(task.assignedTo)} •{' '}
                        {task.dueDate && formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Active Tasks */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Active Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors min-h-[60px] cursor-pointer"
                  onClick={() => onEditActivity(task)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggleComplete(task.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900">{task.name}</p>
                      <p className="text-sm text-gray-600">
                        {task.assignedTo && getRoommateName(task.assignedTo)} •{' '}
                        {task.dueDate && formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No active tasks</p>
            )}
          </CardContent>
        </Card>

        {/* Fairness Score */}
        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Household Fairness
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-36 h-36 mb-4">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#e5e7eb"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke={strokeColor}
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - fairnessScore / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-3xl ${scoreColor}`}>{fairnessScore}%</span>
                <span className="text-xs text-gray-500 mt-1">Fair</span>
              </div>
            </div>
            <p className="text-gray-700 text-center mb-3">
              Your household is working well together!
            </p>
            <button
              onClick={() => onNavigate('fairness')}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              View detailed breakdown →
            </button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-blue-600">{chores.length}</p>
              <p className="text-xs text-gray-600">Active Tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-green-600">
                {activities.filter(a => a.type === 'meal').length}
              </p>
              <p className="text-xs text-gray-600">Meals Logged</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl text-purple-600">{roommates.length}</p>
              <p className="text-xs text-gray-600">Roommates</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Activity Button */}
        <Button
          onClick={() => onNavigate('add')}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 h-14 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <span className="text-lg">+ Add Activity</span>
        </Button>
      </div>
    </div>
  );
}