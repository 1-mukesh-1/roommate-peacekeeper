# Roommate Peacekeeper - Testing Checklist

## ✅ Functionality Testing

### Home Screen
- [ ] Overdue tasks appear in red section
- [ ] Active tasks display correctly
- [ ] Checkboxes toggle task completion
- [ ] Fairness score circle displays (65%)
- [ ] Quick stats show correct counts
- [ ] "Add Activity" button opens dialog
- [ ] Date shows "Today" / "Tomorrow" correctly
- [ ] Navigation highlights Home tab

### All Activities Screen  
- [ ] "All" tab shows all activities
- [ ] "Chores" tab filters to chores only
- [ ] "Meals" tab filters to meals only
- [ ] "Purchases" tab filters to purchases only
- [ ] Count badges display correct numbers
- [ ] Activity cards show all details
- [ ] Checkboxes work for chores
- [ ] Overdue tasks have warning icon
- [ ] Empty state shows when no activities
- [ ] Navigation highlights Activities tab

### Add Activity Dialog

#### Selection Screen
- [ ] Three cards display (Chore, Meal, Purchase)
- [ ] Icons are large (64x64dp)
- [ ] Descriptions are readable
- [ ] Cards are clickable
- [ ] Press animation works
- [ ] Colors match (blue, green, purple)

#### Add Chore
- [ ] Task name input works
- [ ] Assign dropdown shows all roommates
- [ ] Duration slider works (5-120)
- [ ] Date picker is native HTML5
- [ ] **Time picker is native HTML5** ⭐
- [ ] Helper text displays
- [ ] Back button returns to selection
- [ ] Add button disabled when invalid
- [ ] Add button enabled when valid
- [ ] **Toast notification shows on success** ⭐
- [ ] Dialog closes after adding

#### Add Meal
- [ ] Meal name input works
- [ ] Cooked by dropdown works
- [ ] "Who Ate" checkboxes work
- [ ] All checkboxes are 44x44dp
- [ ] Back button works
- [ ] Add button validation works
- [ ] **Toast notification shows** ⭐
- [ ] Dialog closes after adding

#### Add Purchase
- [ ] Item name input works
- [ ] Amount input accepts decimals
- [ ] Paid by dropdown works
- [ ] **Three split method buttons display** ⭐
- [ ] **"Split Equally" button has description** ⭐
- [ ] **"Split by Percentage" button has description** ⭐
- [ ] **"Custom Amounts" button has description** ⭐
- [ ] **Active split method is highlighted (blue)** ⭐
- [ ] Participant checkboxes work
- [ ] **Live preview box displays** ⭐
- [ ] **Preview shows correct calculations** ⭐
- [ ] Back button works
- [ ] **Toast notification shows** ⭐
- [ ] Dialog closes after adding

### Fairness Score Screen
- [ ] **Scores are sorted lowest to highest** ⭐
- [ ] **Lowest score has red background** ⭐
- [ ] **"Lowest" badge appears on lowest** ⭐
- [ ] **"Needs more tasks" label shows** ⭐
- [ ] **Progress bars are color-coded** ⭐
  - [ ] Red for scores < 55
  - [ ] Orange for scores 55-64
  - [ ] Green for scores 65+
- [ ] **Status labels display correctly** ⭐
- [ ] Score numbers display
- [ ] Info banner shows
- [ ] Bar chart displays
- [ ] **Bar colors match scores** ⭐
- [ ] **Bouncing arrow on lowest bar** ⭐
- [ ] Names appear below bars
- [ ] Navigation highlights Fairness tab

### Settings Screen
- [ ] Account button works
- [ ] Manage Roommates button works
- [ ] Notification toggles work
- [ ] All buttons are ≥ 44dp tall
- [ ] Privacy & Security button present
- [ ] Help & Support button present
- [ ] Version number displays (1.0.0)
- [ ] Terms link present
- [ ] Privacy Policy link present
- [ ] Logout button in red
- [ ] Navigation highlights Settings tab

#### Profile Dialog
- [ ] Opens from Account button
- [ ] Avatar shows initials
- [ ] Name input works (48dp)
- [ ] Email input works (48dp)
- [ ] Phone input works (48dp)
- [ ] Change Photo button present
- [ ] Cancel button closes dialog
- [ ] Save button closes dialog

---

## 🎨 Visual Testing

### Design Consistency
- [ ] All buttons ≥ 48dp height
- [ ] All touch targets ≥ 44x44dp
- [ ] Border radius consistent (8dp)
- [ ] Spacing consistent (16/24dp)
- [ ] Shadows present on cards
- [ ] Colors match design system
- [ ] Typography hierarchy clear

### Mobile Optimization
- [ ] Phone frame displays (iPhone 16)
- [ ] Dynamic Island visible
- [ ] Content fits within phone screen
- [ ] No horizontal scrolling
- [ ] Bottom nav fixed at bottom
- [ ] Content scrolls under nav
- [ ] All text readable (not too small)

### Animations
- [ ] Page transitions smooth
- [ ] Button press states work
- [ ] Checkbox animations smooth
- [ ] Toast slides in/out
- [ ] Progress bars animate
- [ ] Bouncing arrow bounces
- [ ] Card hover effects work
- [ ] Scale animations on press

### Color Verification
- [ ] Blue: #007AFF
- [ ] Green: #34C759
- [ ] Orange: #FF9500
- [ ] Red: #FF3B30
- [ ] Purple: #9333EA
- [ ] Contrast ≥ 4.5:1

---

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Enter activates buttons
- [ ] Escape closes dialogs

### Screen Reader
- [ ] All images have alt text
- [ ] All inputs have labels
- [ ] ARIA labels present where needed
- [ ] Heading hierarchy correct (h1, h2, h3)

### Visual
- [ ] High contrast mode works
- [ ] Text is readable
- [ ] Icons have text labels
- [ ] Color is not only indicator

---

## 📱 Interaction Testing

### Touch Gestures
- [ ] Tap opens/closes elements
- [ ] Scroll works smoothly
- [ ] Checkboxes tap easily
- [ ] Buttons tap easily
- [ ] Dropdowns open on tap
- [ ] No accidental taps (targets spaced)

### Form Validation
- [ ] Required fields prevent submission
- [ ] Invalid data shows error
- [ ] Valid data enables submit
- [ ] Helpful error messages

---

## 🔧 Data Flow Testing

### State Management
- [ ] Adding chore updates activities list
- [ ] Adding meal updates activities list
- [ ] Adding purchase updates activities list
- [ ] Completing task updates checkbox
- [ ] Completed task appears in activities
- [ ] Filters update activity display
- [ ] Navigation preserves state

### Calculations
- [ ] Equal split divides correctly
- [ ] Preview shows right amounts
- [ ] Overdue detection works
- [ ] Date formatting correct
- [ ] Score sorting correct

---

## 🌐 Cross-Browser Testing

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Simulation
- [ ] iPhone 16 viewport (393x852)
- [ ] Touch events work
- [ ] Native pickers appear
- [ ] No layout breaks

---

## ⚡ Performance Testing

### Load Time
- [ ] Initial load < 3 seconds
- [ ] Interactions feel instant
- [ ] No lag on scrolling
- [ ] Animations smooth (60fps)

### Memory
- [ ] No memory leaks
- [ ] Multiple navigation cycles work
- [ ] Adding many items works
- [ ] No console errors

---

## 🎯 User Testing Scenarios

### Scenario 1: New User
1. [ ] Open app → See home screen
2. [ ] Read tasks → Understand overdue vs. active
3. [ ] Tap Add → See 3 clear options
4. [ ] Select Chore → Fill form easily
5. [ ] Pick time → Native picker appears
6. [ ] Save → See toast notification
7. [ ] Return home → See new task

### Scenario 2: Add Purchase
1. [ ] Tap Add → Select Purchase
2. [ ] Enter item and amount
3. [ ] See splitting options → Understand choices
4. [ ] Select "Split Equally"
5. [ ] Check 3 roommates
6. [ ] See preview → Verify math
7. [ ] Save → See toast
8. [ ] Check activities → Find purchase

### Scenario 3: Check Fairness
1. [ ] Tap Fairness tab
2. [ ] See sorted list → Lowest is obvious
3. [ ] Red highlight draws attention
4. [ ] "Needs more tasks" is clear
5. [ ] Colors indicate status
6. [ ] Bar chart reinforces
7. [ ] Understand who needs more tasks

### Scenario 4: Complete Tasks
1. [ ] See overdue task (red)
2. [ ] Tap checkbox
3. [ ] Task marks complete
4. [ ] Task disappears from home
5. [ ] Still visible in activities
6. [ ] Fairness score updates (ideally)

---

## 🐛 Edge Cases

### Empty States
- [ ] No activities → Helpful message
- [ ] No overdue tasks → Section hidden
- [ ] No active tasks → "No active tasks"
- [ ] Filter with no results → Empty state

### Extreme Values
- [ ] Single roommate works
- [ ] All roommates selected works
- [ ] Very long names don't break layout
- [ ] Large amounts ($9999.99) display
- [ ] Many activities scroll properly

### Error Conditions
- [ ] Invalid date → Can't submit
- [ ] Empty required field → Can't submit
- [ ] Zero amount → Can't submit
- [ ] No participants → Can't submit

---

## ✅ Critical UX Fixes Verification

### ⭐ Priority 1: Time Picker
- [ ] Native time input appears
- [ ] 12-hour format available
- [ ] AM/PM selector works
- [ ] Familiar to iOS/Android users
- [ ] No custom multi-column picker

### ⭐ Priority 2: Splitting Options
- [ ] NO icon-only buttons
- [ ] "Split Equally" has full text + description
- [ ] "Split by Percentage" has full text + description
- [ ] "Custom Amounts" has full text + description
- [ ] Live preview box shows
- [ ] Preview updates when participants change
- [ ] Preview shows correct math

### ⭐ Priority 3: Fairness Display
- [ ] Automatic sorting (lowest first)
- [ ] Red background on lowest
- [ ] "Lowest" badge visible
- [ ] Down arrow icon present
- [ ] "Needs more tasks" label shows
- [ ] Color gradient works (red/orange/green)
- [ ] Bouncing arrow in chart

### ⭐ Priority 4: Add Dialog
- [ ] Icons are 64x64dp (not 48x48)
- [ ] Text labels under all icons
- [ ] Centered layout (not side-by-side)
- [ ] Descriptions visible
- [ ] Easy to tap

### ⭐ Priority 5: Data Consistency
- [ ] All roommates: Mukesh, Parwaz, Suraj
- [ ] IDs consistent (1, 2, 3)
- [ ] Sample data realistic
- [ ] Dates make sense

---

## 📋 Final Checks

### Before Delivery
- [ ] All console errors fixed
- [ ] All warnings addressed
- [ ] TypeScript errors: 0
- [ ] Code formatted
- [ ] Comments added where needed
- [ ] README complete
- [ ] Documentation accurate

### Polish
- [ ] Animations smooth
- [ ] Colors consistent
- [ ] Spacing uniform
- [ ] Typography clean
- [ ] Shadows subtle
- [ ] Interactions delightful

---

## 🎉 Acceptance Criteria

**App is ready when**:
- ✅ All 5 screens work
- ✅ All 5 critical fixes implemented
- ✅ All user flows complete
- ✅ All touch targets ≥ 44dp
- ✅ All forms validate
- ✅ All toasts show
- ✅ All colors correct
- ✅ All animations smooth
- ✅ No console errors
- ✅ Documentation complete

---

**Tester**: _______________  
**Date**: _______________  
**Status**: ⬜ Pass | ⬜ Fail  
**Notes**: _______________
