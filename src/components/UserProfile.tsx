import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Calendar,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';

interface UserProfileProps {
  onNavigate: (section: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'STU2024001',
    department: 'Computer Science',
    year: 'Junior',
    bio: 'Third-year Computer Science student passionate about technology and helping the campus community.',
    joinDate: 'September 2022'
  });

  const [editInfo, setEditInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditInfo(userInfo);
    setIsEditing(false);
  };

  const recentActivity = [
    { type: 'found', item: 'iPhone 14', date: '2 days ago', status: 'returned' },
    { type: 'lost', item: 'Math Textbook', date: '1 week ago', status: 'found' },
    { type: 'found', item: 'Blue Backpack', date: '2 weeks ago', status: 'returned' },
  ];

  const stats = {
    itemsFound: 12,
    itemsLost: 3,
    itemsReturned: 10,
    reputation: 98
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-cosmic">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-card-border/50">
              <CardHeader className="text-center">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <Avatar className="w-24 h-24 border-2 border-primary/30">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary to-accent text-white">
                      {userInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse-glow"></div>
                </div>
                <CardTitle className="text-xl text-gradient">{userInfo.name}</CardTitle>
                <p className="text-muted-foreground/80">{userInfo.department}</p>
                <Badge variant="secondary" className="mt-2">
                  {userInfo.year} Student
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground/80">{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground/80">{userInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground/80">ID: {userInfo.studentId}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground/80">Joined {userInfo.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="glass-card border-card-border/50 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{stats.itemsFound}</div>
                  <div className="text-sm text-muted-foreground/80">Items Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{stats.itemsLost}</div>
                  <div className="text-sm text-muted-foreground/80">Items Lost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.itemsReturned}</div>
                  <div className="text-sm text-muted-foreground/80">Items Returned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{stats.reputation}%</div>
                  <div className="text-sm text-muted-foreground/80">Reputation</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="glass-card border-card-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editInfo.name}
                        onChange={(e) => setEditInfo({...editInfo, name: e.target.value})}
                      />
                    ) : (
                      <div className="p-2 text-muted-foreground/80">{userInfo.name}</div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editInfo.email}
                        onChange={(e) => setEditInfo({...editInfo, email: e.target.value})}
                      />
                    ) : (
                      <div className="p-2 text-muted-foreground/80">{userInfo.email}</div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editInfo.phone}
                        onChange={(e) => setEditInfo({...editInfo, phone: e.target.value})}
                      />
                    ) : (
                      <div className="p-2 text-muted-foreground/80">{userInfo.phone}</div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    {isEditing ? (
                      <Input
                        id="department"
                        value={editInfo.department}
                        onChange={(e) => setEditInfo({...editInfo, department: e.target.value})}
                      />
                    ) : (
                      <div className="p-2 text-muted-foreground/80">{userInfo.department}</div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editInfo.bio}
                      onChange={(e) => setEditInfo({...editInfo, bio: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 text-muted-foreground/80">{userInfo.bio}</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card border-card-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card-glass/30 border border-card-border/30">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'found' ? 'bg-success' : 'bg-warning'
                        }`}></div>
                        <div>
                          <div className="font-medium">
                            {activity.type === 'found' ? 'Found' : 'Lost'}: {activity.item}
                          </div>
                          <div className="text-sm text-muted-foreground/60">{activity.date}</div>
                        </div>
                      </div>
                      <Badge 
                        variant={activity.status === 'returned' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};