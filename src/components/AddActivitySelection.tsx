import { CheckSquare, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface AddActivitySelectionProps {
  onSelectType: (type: 'chore' | 'meal' | 'purchase') => void;
}

export function AddActivitySelection({ onSelectType }: AddActivitySelectionProps) {
  const activityTypes = [
    {
      type: 'chore' as const,
      icon: CheckSquare,
      label: 'Chores',
      description: 'Add a household task',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      type: 'meal' as const,
      icon: UtensilsCrossed,
      label: 'Meal',
      description: 'Log a meal you cooked',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      type: 'purchase' as const,
      icon: ShoppingCart,
      label: 'Purchase',
      description: 'Split a shared expense',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="mb-8">Add Activity</h1>

        <div className="space-y-4">
          {activityTypes.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card
                key={activity.type}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSelectType(activity.type)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${activity.bgColor}`}>
                      <Icon className={`w-6 h-6 ${activity.color}`} />
                    </div>
                    <div>
                      <h3 className="text-gray-900">{activity.label}</h3>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
