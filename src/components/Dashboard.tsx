import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Search, Plus, Clock, MapPin, Users } from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const quickStats = [
    { label: 'Active Lost Items', value: '47', trend: '+12%', color: 'text-destructive' },
    { label: 'Items Found Today', value: '23', trend: '+8%', color: 'text-success' },
    { label: 'Successful Matches', value: '156', trend: '+25%', color: 'text-accent' },
    { label: 'Active Users', value: '1,289', trend: '+5%', color: 'text-primary' },
  ];

  const recentActivity = [
    { id: 1, type: 'found', item: 'MacBook Pro', location: 'Library', time: '2 mins ago', status: 'pending' },
    { id: 2, type: 'lost', item: 'Blue Hoodie', location: 'Cafeteria', time: '15 mins ago', status: 'active' },
    { id: 3, type: 'matched', item: 'iPhone 14', location: 'Science Building', time: '1 hour ago', status: 'matched' },
    { id: 4, type: 'found', item: 'Textbook', location: 'Dormitory', time: '2 hours ago', status: 'active' },
  ];

  const hotspots = [
    { location: 'Library', count: 23, change: '+5' },
    { location: 'Student Center', count: 18, change: '+3' },
    { location: 'Cafeteria', count: 15, change: '-2' },
    { location: 'Gym', count: 12, change: '+7' },
  ];

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-4xl font-bold text-gradient mb-4">Dashboard</h2>
          <p className="text-muted-foreground text-lg">Real-time insights into campus lost & found activity</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {quickStats.map((stat, index) => (
            <Card key={stat.label} className="glass-card p-6 card-hover">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-all duration-300">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'found' ? 'bg-accent' : 
                      activity.type === 'lost' ? 'bg-destructive' : 'bg-success'
                    } animate-pulse`}></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{activity.item}</span>
                        <Badge variant={activity.status === 'matched' ? 'default' : 'outline'} className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {activity.location}
                        <Clock className="h-3 w-3 ml-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions & Hotspots */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {/* Quick Actions */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="cosmic" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('report')}
                >
                  <Plus className="h-4 w-4 mr-3" />
                  Report Item
                </Button>
                <Button 
                  variant="glass" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('lost')}
                >
                  <Search className="h-4 w-4 mr-3" />
                  Search Lost Items
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('found')}
                >
                  <Users className="h-4 w-4 mr-3" />
                  Browse Found Items
                </Button>
              </div>
            </Card>

            {/* Hotspots */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
              <div className="space-y-3">
                {hotspots.map((spot, index) => (
                  <div key={spot.location} className="flex items-center justify-between p-3 rounded-lg bg-card/20 hover:bg-card/40 transition-all duration-300">
                    <div>
                      <div className="font-medium text-sm">{spot.location}</div>
                      <div className="text-xs text-muted-foreground">{spot.count} items this week</div>
                    </div>
                    <Badge variant={spot.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                      {spot.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};