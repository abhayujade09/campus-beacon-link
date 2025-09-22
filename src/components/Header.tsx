import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import logoImage from '@/assets/logo.png';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'lost', label: 'Lost Items' },
    { id: 'found', label: 'Found Items' },
    { id: 'report', label: 'Report Item' },
    { id: 'history', label: 'History' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-card-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="relative">
              <img src={logoImage} alt="Campus Lost & Found" className="h-12 w-12 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl animate-pulse-slow"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Campus Lost & Found</h1>
              <p className="text-xs text-muted-foreground">University Hub</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="relative"
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse-glow"></div>
                )}
              </Button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-accent text-accent-foreground animate-pulse">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <Button variant="glass" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-card-border/50 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  className="justify-start"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button variant="glass" className="justify-start mt-4">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};