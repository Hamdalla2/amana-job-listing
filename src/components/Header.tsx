import React from 'react';
import { Briefcase, Bookmark, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  currentPage: 'map' | 'details' | 'saved';
  onNavigate: (page: 'map' | 'details' | 'saved') => void;
  savedJobsCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ currentPage, onNavigate, savedJobsCount, darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">JobMap</span>
            </button>
            
            <nav className="flex items-center gap-4">
              <Button
                variant={currentPage === 'map' ? 'default' : 'ghost'}
                onClick={() => onNavigate('map')}
                className="dark:text-gray-300"
              >
                Explore Jobs
              </Button>
              <Button
                variant={currentPage === 'saved' ? 'default' : 'ghost'}
                onClick={() => onNavigate('saved')}
                className="flex items-center gap-2 dark:text-gray-300"
              >
                <Bookmark className="w-4 h-4" />
                Saved Jobs
                {savedJobsCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {savedJobsCount}
                  </Badge>
                )}
              </Button>
            </nav>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="dark:text-gray-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
