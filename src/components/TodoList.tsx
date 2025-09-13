'use client';

import React from 'react';
import { Task, Weekday } from '@/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  selectedWeekday: Weekday;
}

export const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  selectedWeekday
}) => {
  // Sort tasks by priority and completion status
  const sortedTasks = [...tasks].sort((a, b) => {
    // Incomplete tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority (high -> medium -> low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Finally by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const incompleteTasks = sortedTasks.filter(task => !task.completed);
  const completedTasks = sortedTasks.filter(task => task.completed);

  if (tasks.length === 0) {
    const isWeekend = selectedWeekday === 'saturday' || selectedWeekday === 'sunday';
    
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center">
            <span className="text-3xl">
              {isWeekend ? '🌴' : '✨'}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {isWeekend ? 'Enjoy Your Weekend!' : 'Ready for a Productive Day!'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {isWeekend 
              ? 'No tasks yet for this weekend day. Add some fun activities or relaxing plans!'
              : 'No tasks yet for today. Start by adding your first task to get organized!'
            }
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>{isWeekend ? '🎊' : '🎯'}</span>
            <span>Click "Add Task" to get started</span>
            <span>{isWeekend ? '🎊' : '🎯'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Incomplete Tasks Section */}
      {incompleteTasks.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <span className="mr-2">📝</span>
                Active Tasks
                <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                  {incompleteTasks.length}
                </span>
              </h3>
              <div className="text-sm text-gray-600">
                Keep going! 💪
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {incompleteTasks.map((task, index) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks Section */}
      {completedTasks.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-b border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <span className="mr-2">✅</span>
                Completed Tasks
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  {completedTasks.length}
                </span>
              </h3>
              <div className="text-sm text-gray-600">
                Well done! 🎉
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {completedTasks.map((task, index) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      {tasks.length > 0 && (
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">
              {selectedWeekday.charAt(0).toUpperCase() + selectedWeekday.slice(1)} Progress
            </span>
            <span className="font-semibold text-gray-800">
              {Math.round((completedTasks.length / tasks.length) * 100)}% complete
            </span>
          </div>
          <div className="mt-2 w-full h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ 
                width: `${(completedTasks.length / tasks.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};