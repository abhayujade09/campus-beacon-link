import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, User, Search, Filter, Calendar } from 'lucide-react';
import laptopIcon from '@/assets/laptop-icon.png';
import bookIcon from '@/assets/book-icon.png';
import jacketIcon from '@/assets/jacket-icon.png';
import chargerIcon from '@/assets/charger-icon.png';

interface Item {
  id: string;
  name: string;
  category: string;
  status: 'lost' | 'found';
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  reporter: string;
}

interface ItemGridProps {
  type: 'lost' | 'found' | 'all';
  title: string;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ type, title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const mockItems: Item[] = [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      category: 'Electronics',
      status: 'lost',
      date: '2025-01-20',
      time: '14:30',
      location: 'Computer Science Building',
      description: 'Silver MacBook Pro with university stickers',
      image: laptopIcon,
      reporter: 'John Smith'
    },
    {
      id: '2',
      name: 'Calculus Textbook',
      category: 'Books',
      status: 'found',
      date: '2025-01-21',
      time: '09:15',
      location: 'Library - 3rd Floor',
      description: 'Blue cover with highlighting inside',
      image: bookIcon,
      reporter: 'Sarah Johnson'
    },
    {
      id: '3',
      name: 'University Hoodie',
      category: 'Clothing',
      status: 'lost',
      date: '2025-01-19',
      time: '18:45',
      location: 'Student Center',
      description: 'Navy blue hoodie, size medium',
      image: jacketIcon,
      reporter: 'Mike Chen'
    },
    {
      id: '4',
      name: 'Phone Charger',
      category: 'Electronics',
      status: 'found',
      date: '2025-01-22',
      time: '11:00',
      location: 'Engineering Lab',
      description: 'USB-C cable, white color',
      image: chargerIcon,
      reporter: 'Emily Davis'
    }
  ];

  const categories = ['All', 'Electronics', 'Books', 'Clothing', 'Accessories', 'Other'];

  const filteredItems = mockItems.filter(item => {
    const matchesType = type === 'all' || item.status === type;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesType && matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    return status === 'lost' ? 'status-lost' : 'status-found';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-4xl font-bold text-gradient mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">
            {type === 'lost' ? 'Help find these lost items' : 
             type === 'found' ? 'Recently found items waiting to be claimed' :
             'All items in the system'}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-card p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items, descriptions, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-card/50 border-card-border"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card/50 border border-card-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="location">By Location</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredItems.length}</span> items
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="glass-card overflow-hidden card-hover spotlight group cursor-pointer"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-card-glass to-card/50 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-2" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-2" />
                    {formatDate(item.date)} at {item.time}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3 w-3 mr-2" />
                    Reported by {item.reporter}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="cosmic" size="sm" className="flex-1">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 animate-slide-up">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            <Button variant="cosmic" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};