'use client';

import React from 'react';
import { Task, Weekday } from '@/types';
import { WEEKDAYS, getCurrentWeekday } from '@/lib/dateUtils';

interface WeekdayNavigationProps {
  selectedWeekday: Weekday;
  onSelectWeekday: (weekday: Weekday) => void;
  tasks: Task[];
  isWeekendMode: boolean;
}

export const WeekdayNavigation: React.FC<WeekdayNavigationProps> = ({
  selectedWeekday,
  onSelectWeekday,
  tasks,
  isWeekendMode
}) => {
  const currentWeekday = getCurrentWeekday();

  // Filter weekdays based on weekend mode
  const visibleWeekdays = isWeekendMode 
    ? WEEKDAYS.filter(day => day.isWeekend)
    : WEEKDAYS;

  // Get task counts for each day
  const getTaskCounts = (weekday: Weekday) => {
    const dayTasks = tasks.filter(task => task.weekday === weekday);
    const completed = dayTasks.filter(task => task.completed).length;
    return { total: dayTasks.length, completed };
  };

  return (
    <div className="w-full">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isWeekendMode ? '🌈 Weekend Days' : '📅 Your Week'}
          </h3>
          <div className="text-sm text-gray-600">
            {isWeekendMode ? 'Weekend Mode' : 'Full Week View'}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:grid grid-cols-7 gap-2">
          {visibleWeekdays.map((weekday) => {
            const isSelected = selectedWeekday === weekday.key;
            const isCurrent = currentWeekday === weekday.key;
            const { total, completed } = getTaskCounts(weekday.key);
            const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <button
                key={weekday.key}
                onClick={() => onSelectWeekday(weekday.key)}
                className={`
                  relative p-4 rounded-xl transition-all duration-300 transform
                  ${isSelected 
                    ? `${weekday.gradient} text-white shadow-xl scale-105` 
                    : 'bg-white/80 hover:bg-white hover:shadow-md text-gray-700 hover:scale-102'
                  }
                  ${isCurrent && !isSelected ? 'ring-2 ring-purple-400 ring-offset-2' : ''}
                `}
              >
                {/* Current day indicator */}
                {isCurrent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                )}

                <div className="text-center">
                  <div className="font-semibold text-sm mb-1">
                    {weekday.shortLabel}
                  </div>
                  <div className="text-xs opacity-90 mb-2">
                    {weekday.label}
                  </div>
                  
                  {/* Task count badge */}
                  {total > 0 && (
                    <div className={`
                      inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                      ${isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-700'
                      }
                    `}>
                      {completed}/{total}
                    </div>
                  )}
                  
                  {/* Progress bar */}
                  {total > 0 && (
                    <div className={`
                      mt-2 w-full h-1 rounded-full overflow-hidden
                      ${isSelected ? 'bg-white/20' : 'bg-gray-200'}
                    `}>
                      <div
                        className={`
                          h-full transition-all duration-500 rounded-full
                          ${isSelected 
                            ? 'bg-white' 
                            : completed === total 
                              ? 'bg-green-500' 
                              : 'bg-purple-500'
                          }
                        `}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Weekend emoji */}
                  {weekday.isWeekend && (
                    <div className="mt-1 text-xs">
                      {weekday.key === 'saturday' ? '🎉' : '😌'}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            {visibleWeekdays.map((weekday) => {
              const isSelected = selectedWeekday === weekday.key;
              const isCurrent = currentWeekday === weekday.key;
              const { total, completed } = getTaskCounts(weekday.key);

              return (
                <button
                  key={weekday.key}
                  onClick={() => onSelectWeekday(weekday.key)}
                  className={`
                    relative flex-shrink-0 w-20 p-3 rounded-xl transition-all duration-300
                    ${isSelected 
                      ? `${weekday.gradient} text-white shadow-lg` 
                      : 'bg-white/80 hover:bg-white text-gray-700'
                    }
                    ${isCurrent && !isSelected ? 'ring-2 ring-purple-400' : ''}
                  `}
                >
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                  )}

                  <div className="text-center">
                    <div className="font-semibold text-xs mb-1">
                      {weekday.shortLabel}
                    </div>
                    {total > 0 && (
                      <div className={`
                        text-xs font-bold
                        ${isSelected ? 'text-white/90' : 'text-gray-600'}
                      `}>
                        {completed}/{total}
                      </div>
                    )}
                    {weekday.isWeekend && (
                      <div className="text-xs mt-1">
                        {weekday.key === 'saturday' ? '🎉' : '😌'}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Week Overview Stats */}
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {isWeekendMode ? 'Weekend Progress' : 'Week Progress'}
            </span>
            <span className="font-semibold text-gray-800">
              {tasks.filter(t => isWeekendMode ? t.isWeekend : true).filter(t => t.completed).length}/
              {tasks.filter(t => isWeekendMode ? t.isWeekend : true).length} tasks completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};