import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Dashboard } from '@/components/Dashboard';
import { ItemGrid } from '@/components/ItemGrid';
import { ReportForm } from '@/components/ReportForm';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Dashboard onNavigate={handleNavigate} />
          </>
        );
      case 'lost':
        return <ItemGrid type="lost" title="Lost Items" />;
      case 'found':
        return <ItemGrid type="found" title="Found Items" />;
      case 'report':
        return <ReportForm onSubmit={() => setActiveSection('dashboard')} />;
      case 'history':
        return <ItemGrid type="all" title="Activity History" />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Dashboard onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      <main className="relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
