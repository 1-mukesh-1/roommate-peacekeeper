# Roommate Peacekeeper - Quick Reference Card

## 🚀 Quick Start (30 seconds)

1. **View the app** - It loads with the Home screen
2. **Check tasks** - See overdue (red) and active tasks
3. **Add an activity** - Tap the blue ➕ button
4. **Check fairness** - Tap the 📊 Fairness tab

---

## 📱 Navigation Cheat Sheet

| Icon | Screen | What's Here |
|------|--------|-------------|
| 🏠 Home | Dashboard | Tasks, fairness score, quick stats |
| 📋 Activities | All Activities | Filtered list of everything |
| ➕ Add | Add Dialog | Create chores, meals, purchases |
| 📊 Fairness | Scores | Detailed contribution breakdown |
| ⚙️ Settings | Preferences | Account, notifications, help |

---

## ⚡ Quick Actions

### ✅ Complete a Task
**Home/Activities screen** → Tap checkbox → Done!

### ➕ Add a Chore  
**Add button** → Chore → Name → Assign → Date → Time → Save

### 🍽️ Log a Meal
**Add button** → Meal → Name → Chef → Who ate → Save

### 💰 Record Purchase
**Add button** → Purchase → Name → Amount → Payer → Split method → Participants → Save

---

## 🎨 Color Code Guide

| Color | Meaning | Where |
|-------|---------|-------|
| 🔴 Red | Overdue / Low score | Tasks, fairness |
| 🟠 Orange | Warning / Medium score | Fairness |
| 🟢 Green | Success / High score | Completed, fairness |
| 🔵 Blue | Chores / Actions | Activity type, buttons |
| 🟣 Purple | Purchases | Activity type |
| 💚 Green | Meals | Activity type |

---

## 🎯 Key Features at a Glance

### Time Picker
- Native iOS/Android picker
- 12-hour format with AM/PM
- Familiar interface

### Purchase Splitting
- **Split Equally** - Divide evenly
- **Split by Percentage** - Custom percentages  
- **Custom Amounts** - Manual entry
- **Live Preview** - See the math!

### Fairness Scores
- **Auto-sorted** - Lowest first
- **Color-coded** - Red/Orange/Green
- **Labels** - "Needs more tasks"
- **Visual** - Progress bars + chart

---

## 📊 Fairness Score Reference

| Score | Color | Status | Action |
|-------|-------|--------|--------|
| 65-100 | 🟢 Green | Great | Keep it up! |
| 55-64 | 🟠 Orange | Fair | Doing okay |
| 0-54 | 🔴 Red | Low | Take more tasks |

**Lowest scorer** = Red background + "Needs more tasks"

---

## 🎯 Pro Tips

1. **Check daily** - Stay on top of tasks
2. **Log meals immediately** - Don't forget the cook
3. **Use equal split** - Simplest for most purchases
4. **Watch fairness** - Balance contributions
5. **Complete on time** - Avoid red alerts

---

## 🐛 Common Questions

**Q**: How do I delete an activity?  
**A**: Currently not supported. Mark as complete instead.

**Q**: Can I edit after adding?  
**A**: Not yet. Double-check before saving.

**Q**: What if I'm the lowest score?  
**A**: Take the next chore to balance out!

**Q**: How is fairness calculated?  
**A**: Chores (by effort) + Meals cooked + Purchases paid

---

## 🎨 Design Token Reference

### Touch Targets
- Minimum: 44x44dp
- Buttons: 48-60dp
- Inputs: 48dp

### Spacing
- Small: 8dp
- Medium: 16dp
- Large: 24dp

### Colors (Hex)
- Blue: `#007AFF`
- Green: `#34C759`
- Orange: `#FF9500`
- Red: `#FF3B30`
- Purple: `#9333EA`

---

## 📱 Mobile Specs

- **Device**: iPhone 16 frame
- **Screen**: 393x852px
- **Layout**: Mobile-first
- **Navigation**: Fixed bottom
- **Scrolling**: Vertical only

---

## ⌨️ Keyboard Shortcuts

None currently - touch-optimized!

---

## 🔧 Developer Reference

### Key Files
- `/App.tsx` - Main app
- `/components/AddActivityDialog.tsx` - Add dialog
- `/components/FairnessScore.tsx` - Scores
- `/data/mockData.ts` - Sample data

### Tech Stack
- React 18+
- TypeScript
- Tailwind CSS v4
- Shadcn/ui
- Sonner (toasts)

---

## 📚 Documentation Index

1. **README.md** - Full project overview
2. **USAGE_GUIDE.md** - Detailed user guide
3. **FEATURES.md** - Complete feature list  
4. **IMPLEMENTATION_SUMMARY.md** - Technical details
5. **QUICK_REFERENCE.md** - This card!

---

## ✨ Remember

**Goal**: Fair contributions = Happy roommates!

**Method**: Track everything → Check scores → Balance tasks

**Result**: Peaceful household 🏡

---

**Last Updated**: November 10, 2025  
**Version**: 1.0.0  
**Made with**: React + TypeScript + ❤️
