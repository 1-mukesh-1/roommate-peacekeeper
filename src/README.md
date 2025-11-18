# Roommate Peacekeeper

A mobile-first web application designed to help roommates manage shared responsibilities, track fairness, and maintain harmony in their living situation.

## 📱 Overview

Roommate Peacekeeper is a comprehensive household management app that helps roommates:
- Track and assign chores with due dates and effort estimation
- Log meals and who cooked/ate them
- Split shared purchases and expenses
- Monitor fairness scores to ensure balanced contributions
- Maintain transparency and accountability

## ✨ Key Features

### 1. **Activity Management**
- **Chores**: Assign tasks, set due dates/times, estimate effort
- **Meals**: Track who cooked and who enjoyed the meal
- **Purchases**: Log shared expenses with flexible splitting options

### 2. **Fairness Tracking**
- Real-time contribution scores for each roommate
- Visual indicators for lowest contributors
- Color-coded progress bars (Red → Orange → Green)
- Automatic sorting with lowest scores highlighted
- Bar chart visualization for easy comparison

### 3. **Smart Features**
- Native iOS/Android time pickers for better UX
- Multiple splitting methods for purchases:
  - Split Equally (default)
  - Split by Percentage
  - Custom Amounts
- Live preview of split amounts
- Toast notifications for user feedback
- Overdue task alerts

### 4. **Mobile-Optimized Design**
- iPhone 16 frame presentation
- Fixed bottom navigation (inside phone frame)
- Touch-friendly 44x44dp minimum touch targets
- Smooth animations and transitions
- Material Design shadows and cards

## 🎨 Design System

### Colors
- **Primary Blue**: `#007AFF` - Main actions and active states
- **Success Green**: `#34C759` - Confirmations and positive feedback
- **Warning Orange**: `#FF9500` - Medium priority alerts
- **Danger Red**: `#FF3B30` - Overdue tasks and critical alerts
- **Purple**: `#9333EA` - Purchase-related features

### Typography
- **Headers**: Medium weight, 20-24pt
- **Body**: Regular weight, 16pt
- **Labels**: Medium weight, 16pt
- **Small Text**: Regular weight, 12-14pt

### Spacing
- Standard padding: 16dp (1rem)
- Section padding: 24dp (1.5rem)
- Button height: 48-56dp (3-3.5rem)
- Touch targets: Minimum 44x44dp

### Accessibility
- High contrast (4.5:1 minimum)
- Clear focus indicators
- Descriptive labels for all inputs
- Screen reader friendly

## 📂 Project Structure

```
roommate-peacekeeper/
├── components/
│   ├── AddActivityDialog.tsx      # Multi-step dialog for adding activities
│   ├── AllActivities.tsx          # Filtered list of all activities
│   ├── BottomNav.tsx             # Fixed bottom navigation bar
│   ├── FairnessScore.tsx         # Detailed fairness breakdown
│   ├── Home.tsx                  # Dashboard with key metrics
│   ├── PhoneFrame.tsx            # iPhone 16 frame wrapper
│   ├── Settings.tsx              # User preferences and settings
│   └── ui/                       # Shadcn UI components
├── data/
│   └── mockData.ts               # Sample data for demo
├── types/
│   └── index.ts                  # TypeScript interfaces
├── styles/
│   └── globals.css               # Global styles and design tokens
└── App.tsx                       # Main app component

```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern browser with ES6+ support

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Screens & Navigation

### 1. **Home Dashboard**
- Overdue tasks (highlighted in red)
- Active upcoming tasks
- Household fairness score (circular progress)
- Quick stats cards
- Prominent "Add Activity" button

### 2. **All Activities**
- Tabbed filter (All, Chores, Meals, Purchases)
- Activity count badges
- Status icons and completion checkboxes
- Overdue indicators

### 3. **Fairness Score**
- Sorted list (lowest to highest)
- Visual indicators for lowest contributor
- Color-coded progress bars
- Bar chart visualization
- Explanatory text

### 4. **Add Activity Dialog**
- Three-card selection screen
- Step-based forms for each activity type
- Native date/time pickers
- Smart splitting options for purchases
- Live preview of calculations
- Toast notifications on success

### 5. **Settings**
- Profile management
- Roommate management
- Notification preferences
- Privacy & security
- Help & support
- App information

## 🎯 User Experience Improvements

### Based on User Testing Feedback

#### ✅ Time Picker (FIXED)
- **Before**: Custom multi-column picker (confusing)
- **After**: Native HTML5 time input with AM/PM support
- **Result**: Familiar interface, better mobile experience

#### ✅ Purchase Splitting (FIXED)
- **Before**: Icon buttons (%, 123, +) without labels
- **After**: Full-width text buttons with descriptions
- **Features**: 
  - "Split Equally" with clear description
  - "Split by Percentage" option
  - "Custom Amounts" for manual entry
  - Live preview showing calculated amounts

#### ✅ Fairness Display (FIXED)
- **Before**: Unsorted list, hard to identify issues
- **After**: 
  - Automatic sorting (lowest first)
  - Red highlight for lowest contributor
  - "Needs more tasks" label
  - Color gradient visualization
  - Animated arrow indicator

#### ✅ Add Dialog (IMPROVED)
- **Before**: Small icons
- **After**: 
  - Larger 64x64dp icon containers
  - Centered layout with descriptive text
  - Press animation feedback
  - First option (Chore) highlighted

#### ✅ Visual Feedback (ENHANCED)
- Active button states (color changes)
- Animated checkbox selections
- Toast notifications for all actions
- Loading states where applicable
- Navigation active indicators

## 🔧 Technical Details

### Technologies
- **React 18+**: Component-based architecture
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **Shadcn/ui**: Accessible component library
- **Sonner**: Toast notifications
- **Lucide React**: Icon library

### Key Components

#### AddActivityDialog
- Multi-step wizard pattern
- Form validation
- State management for 3 activity types
- Smart defaults and live calculations

#### FairnessScore
- Dynamic sorting algorithm
- Color-coded visualization
- Responsive bar chart
- Contextual help text

#### Home
- Real-time task filtering
- Overdue detection logic
- Circular progress visualization
- Quick action access

## 📊 Data Model

### Roommate
```typescript
{
  id: string;
  name: string;
  avatar?: string;
}
```

### Activity
```typescript
{
  id: string;
  type: 'chore' | 'meal' | 'purchase';
  name: string;
  
  // Chore-specific
  assignedTo?: string;
  dueDate?: Date;
  effort?: number;
  
  // Meal-specific
  cookedBy?: string;
  ateBy?: string[];
  
  // Purchase-specific
  amount?: number;
  paidBy?: string;
  splitAmong?: string[];
  
  completed: boolean;
}
```

### FairnessScore
```typescript
{
  roommateId: string;
  score: number; // 0-100
}
```

## 🎓 Best Practices

### Component Design
- Single Responsibility Principle
- Prop type safety with TypeScript
- Consistent naming conventions
- Reusable UI components

### Performance
- Lazy loading where applicable
- Optimized re-renders
- Efficient state management
- Minimal bundle size

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast mode compatible
- Screen reader optimized

## 🐛 Known Limitations

- Fairness score calculation is simplified (demo purposes)
- No backend persistence (uses local state)
- No user authentication
- No real-time sync between devices
- Mock data for demonstration

## 🔮 Future Enhancements

- [ ] Backend integration with Supabase
- [ ] Real-time notifications
- [ ] Recurring chore scheduling
- [ ] Photo uploads for receipts
- [ ] Calendar view for tasks
- [ ] Analytics dashboard
- [ ] Multi-household support
- [ ] Payment integration (Venmo, PayPal)
- [ ] Gamification (badges, streaks)
- [ ] Dark mode

## 📝 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- Shadcn/ui for the component library
- Lucide for the icon set
- Figma Make for the development platform
