import { Home, List, PlusCircle, BarChart3, Settings } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'activities', icon: List, label: 'Activities' },
    { id: 'add', icon: PlusCircle, label: 'Add' },
    { id: 'fairness', icon: BarChart3, label: 'Fairness' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-2 py-2 h-[72px] flex-shrink-0 shadow-lg">
      <div className="flex justify-around items-center h-full max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          const isAdd = item.id === 'add';
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all min-w-[60px] min-h-[56px] rounded-lg ${
                isActive && !isAdd
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50 active:bg-gray-100'
              } ${isAdd ? 'relative' : ''}`}
            >
              {isAdd ? (
                <>
                  <div className="absolute -top-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-gray-600 mt-8">{item.label}</span>
                </>
              ) : (
                <>
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                  <span
                    className={`text-xs transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full" />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
