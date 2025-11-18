import { useState } from 'react';
import { User, Bell, Shield, HelpCircle, LogOut, Users, Trash2, Edit2, Plus } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Roommate } from '../types';
import { toast } from 'sonner';

interface SettingsProps {
  roommates: Roommate[];
  onUpdateRoommate: (id: string, name: string) => void;
  onAddRoommate: (name: string) => void;
  onDeleteRoommate: (id: string) => void;
}

export function Settings({
  roommates,
  onUpdateRoommate,
  onAddRoommate,
  onDeleteRoommate,
}: SettingsProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoommatesOpen, setIsRoommatesOpen] = useState(false);
  const [editingRoommateId, setEditingRoommateId] = useState<string | null>(null);
  const [editingRoommateName, setEditingRoommateName] = useState('');
  const [newRoommateName, setNewRoommateName] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const handleSaveProfile = () => {
    // Save profile logic would go here
    setIsProfileOpen(false);
  };

  const handleAddRoommate = () => {
    if (newRoommateName.trim()) {
      onAddRoommate(newRoommateName);
      setNewRoommateName('');
    } else {
      toast.error('Roommate name cannot be empty');
    }
  };

  const handleUpdateRoommate = () => {
    if (editingRoommateId && editingRoommateName.trim()) {
      onUpdateRoommate(editingRoommateId, editingRoommateName);
      setEditingRoommateId(null);
      setEditingRoommateName('');
    } else {
      toast.error('Roommate name cannot be empty');
    }
  };

  const handleDeleteRoommate = (id: string) => {
    onDeleteRoommate(id);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-full">
      <div className="max-w-2xl mx-auto p-6 pb-24 pt-14">
        <h1 className="mb-8 text-center text-gray-900">Settings</h1>

        {/* Account Section */}
        <Card className="mb-4 hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors rounded-lg min-h-[76px]"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Account</p>
                <p className="text-sm text-gray-600">
                  Manage your profile and preferences
                </p>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Roommates */}
        <Card className="mb-4 hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <button
              onClick={() => setIsRoommatesOpen(true)}
              className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors rounded-lg min-h-[76px]"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Manage Roommates</p>
                <p className="text-sm text-gray-600">
                  Add or remove roommates
                </p>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">Control your alerts</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between min-h-[44px]">
                <Label htmlFor="task-reminders" className="cursor-pointer flex-1">
                  Task Reminders
                </Label>
                <Switch id="task-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between min-h-[44px]">
                <Label htmlFor="new-activities" className="cursor-pointer flex-1">
                  New Activities
                </Label>
                <Switch id="new-activities" defaultChecked />
              </div>
              <div className="flex items-center justify-between min-h-[44px]">
                <Label htmlFor="fairness-updates" className="cursor-pointer flex-1">
                  Fairness Updates
                </Label>
                <Switch id="fairness-updates" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-4 hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <button className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors rounded-lg min-h-[76px]">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Privacy & Security</p>
                <p className="text-sm text-gray-600">
                  Control your data and security settings
                </p>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="mb-4 hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <button className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors rounded-lg min-h-[76px]">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">Help & Support</p>
                <p className="text-sm text-gray-600">
                  Get help and contact support
                </p>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <p className="text-gray-900 mb-4">App Information</p>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between min-h-[40px] items-center">
                <span>Version</span>
                <span className="text-gray-900">1.0.0</span>
              </div>
              <Separator />
              <div className="flex justify-between min-h-[40px] items-center">
                <span>Terms of Service</span>
                <button className="text-blue-600 hover:underline min-h-[44px] px-2">
                  View
                </button>
              </div>
              <Separator />
              <div className="flex justify-between min-h-[40px] items-center">
                <span>Privacy Policy</span>
                <button className="text-blue-600 hover:underline min-h-[44px] px-2">
                  View
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-red-200">
          <CardContent className="p-0">
            <button className="w-full p-5 flex items-center justify-center gap-3 hover:bg-red-50 transition-colors text-red-600 rounded-lg min-h-[60px]">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your account information and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {profileData.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="min-h-[44px]">
                Change Photo
              </Button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="mt-2 h-12"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsProfileOpen(false)}
              className="h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 h-12"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Roommates Dialog */}
      <Dialog open={isRoommatesOpen} onOpenChange={setIsRoommatesOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Roommates</DialogTitle>
            <DialogDescription>
              Add or remove roommates from your account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Add Roommate Section */}
            <div className="flex flex-col items-center gap-3">
              <Label htmlFor="new-roommate-name">Add New Roommate</Label>
              <Input
                id="new-roommate-name"
                value={newRoommateName}
                onChange={(e) => setNewRoommateName(e.target.value)}
                className="mt-2 h-12"
              />
              <Button
                variant="outline"
                size="sm"
                className="min-h-[44px]"
                onClick={handleAddRoommate}
              >
                Add
              </Button>
            </div>

            {/* Roommates List */}
            <div className="space-y-4">
              {roommates.map((roommate) => (
                <div key={roommate.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {roommate.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900">{roommate.name}</p>
                      <p className="text-sm text-gray-600">Roommate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-[44px]"
                      onClick={() => {
                        setEditingRoommateId(roommate.id);
                        setEditingRoommateName(roommate.name);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-[44px]"
                      onClick={() => handleDeleteRoommate(roommate.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Roommate Section */}
            {editingRoommateId && (
              <div className="flex flex-col items-center gap-3">
                <Label htmlFor="edit-roommate-name">Edit Roommate</Label>
                <Input
                  id="edit-roommate-name"
                  value={editingRoommateName}
                  onChange={(e) => setEditingRoommateName(e.target.value)}
                  className="mt-2 h-12"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-[44px]"
                  onClick={handleUpdateRoommate}
                >
                  Update
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRoommatesOpen(false)}
              className="h-12"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}