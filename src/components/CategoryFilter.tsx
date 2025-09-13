'use client';

import React from 'react';
import { TaskCategory, Task, Weekday } from '@/types';
import { getSuggestedCategories } from '@/lib/weekendUtils';

interface CategoryFilterProps {
  selectedCategory?: TaskCategory;
  onCategoryChange: (category?: TaskCategory) => void;
  selectedWeekday: Weekday;
  tasks: Task[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedWeekday,
  tasks
}) => {
  // Get task counts for each category
  const getCategoryTaskCount = (category: TaskCategory) => {
    const categoryTasks = tasks.filter(task => 
      task.category === category && task.weekday === selectedWeekday
    );
    const completed = categoryTasks.filter(task => task.completed).length;
    return { total: categoryTasks.length, completed };
  };

  // Get all task count for selected weekday
  const getAllTaskCount = () => {
    const weekdayTasks = tasks.filter(task => task.weekday === selectedWeekday);
    const completed = weekdayTasks.filter(task => task.completed).length;
    return { total: weekdayTasks.length, completed };
  };

  const suggestedCategories = getSuggestedCategories(selectedWeekday);
  const allTaskCount = getAllTaskCount();

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">🏷️</span>
        Filter by Category
      </h3>

      <div className="space-y-2">
        {/* All Tasks Option */}
        <button
          onClick={() => onCategoryChange(undefined)}
          className={`
            w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between
            ${!selectedCategory 
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white shadow-md' 
              : 'bg-white/80 hover:bg-white text-gray-700 hover:shadow-md'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">📋</span>
            <span className="font-medium">All Tasks</span>
          </div>
          <div className={`
            px-2 py-1 rounded-full text-xs font-bold
            ${!selectedCategory 
              ? 'bg-white/20 text-white' 
              : 'bg-gray-100 text-gray-600'
            }
          `}>
            {allTaskCount.completed}/{allTaskCount.total}
          </div>
        </button>

        {/* Category Options */}
        {suggestedCategories.map((category) => {
          const taskCount = getCategoryTaskCount(category.key);
          const isSelected = selectedCategory === category.key;
          const hasNoTasks = taskCount.total === 0;

          return (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              disabled={hasNoTasks}
              className={`
                w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between
                ${isSelected 
                  ? `${category.color} text-white shadow-md` 
                  : hasNoTasks
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-white/80 hover:bg-white text-gray-700 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-lg ${hasNoTasks ? 'grayscale' : ''}`}>
                  {category.icon}
                </span>
                <div>
                  <span className="font-medium">{category.label}</span>
                  {category.isWeekendCategory && (
                    <div className="text-xs opacity-75 mt-1">
                      Weekend Category
                    </div>
                  )}
                </div>
              </div>
              
              {taskCount.total > 0 && (
                <div className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {taskCount.completed}/{taskCount.total}
                </div>
              )}
            </button>
          );
        })}

        {/* Weekend/Weekday Categories Toggle Info */}
        <div className="mt-6 p-3 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl">
          <div className="text-sm text-gray-600">
            <div className="font-medium mb-2">
              {selectedWeekday === 'saturday' || selectedWeekday === 'sunday' 
                ? '🌈 Weekend Categories' 
                : '📅 Weekday Focus'
              }
            </div>
            <p className="text-xs">
              {selectedWeekday === 'saturday' || selectedWeekday === 'sunday'
                ? 'Weekend categories are prioritized for a balanced lifestyle!'
                : 'Productivity categories help you stay focused during the week.'
              }
            </p>
          </div>
        </div>

        {/* Category Stats Summary */}
        {allTaskCount.total > 0 && (
          <div className="mt-4 space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {selectedWeekday.charAt(0).toUpperCase() + selectedWeekday.slice(1)} Overview
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 text-green-700 p-2 rounded-lg text-center">
                <div className="font-bold">{allTaskCount.completed}</div>
                <div>Completed</div>
              </div>
              <div className="bg-blue-50 text-blue-700 p-2 rounded-lg text-center">
                <div className="font-bold">{allTaskCount.total - allTaskCount.completed}</div>
                <div>Remaining</div>
              </div>
            </div>
            
            {/* Completion Percentage */}
            <div className="bg-white/50 rounded-lg p-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((allTaskCount.completed / allTaskCount.total) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-500"
                  style={{ 
                    width: `${(allTaskCount.completed / allTaskCount.total) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};