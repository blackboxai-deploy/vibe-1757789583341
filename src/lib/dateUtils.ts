import { Weekday, WeekdayInfo } from '@/types';

// Complete 7-day week configuration with colorful gradients
export const WEEKDAYS: WeekdayInfo[] = [
  {
    key: 'monday',
    label: 'Monday',
    shortLabel: 'Mon',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600',
    textColor: 'text-white'
  },
  {
    key: 'tuesday',
    label: 'Tuesday',
    shortLabel: 'Tue',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600',
    textColor: 'text-white'
  },
  {
    key: 'wednesday',
    label: 'Wednesday',
    shortLabel: 'Wed',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-orange-500 via-pink-500 to-red-500',
    textColor: 'text-white'
  },
  {
    key: 'thursday',
    label: 'Thursday',
    shortLabel: 'Thu',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600',
    textColor: 'text-white'
  },
  {
    key: 'friday',
    label: 'Friday',
    shortLabel: 'Fri',
    isWeekend: false,
    gradient: 'bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500',
    textColor: 'text-white'
  },
  {
    key: 'saturday',
    label: 'Saturday',
    shortLabel: 'Sat',
    isWeekend: true,
    gradient: 'bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500',
    textColor: 'text-white'
  },
  {
    key: 'sunday',
    label: 'Sunday',
    shortLabel: 'Sun',
    isWeekend: true,
    gradient: 'bg-gradient-to-br from-lavender-400 via-blue-400 to-indigo-500',
    textColor: 'text-white'
  }
];

// Get current weekday
export const getCurrentWeekday = (): Weekday => {
  const today = new Date();
  const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const weekdayMap: Record<number, Weekday> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };
  
  return weekdayMap[dayIndex];
};

// Get weekday info by key
export const getWeekdayInfo = (weekday: Weekday): WeekdayInfo => {
  const info = WEEKDAYS.find(w => w.key === weekday);
  if (!info) {
    throw new Error(`Invalid weekday: ${weekday}`);
  }
  return info;
};

// Check if a weekday is weekend
export const isWeekend = (weekday: Weekday): boolean => {
  return weekday === 'saturday' || weekday === 'sunday';
};

// Get weekdays by type
export const getWeekdays = (weekendOnly?: boolean): WeekdayInfo[] => {
  if (weekendOnly === undefined) return WEEKDAYS;
  return WEEKDAYS.filter(day => day.isWeekend === weekendOnly);
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Get next weekday
export const getNextWeekday = (current: Weekday): Weekday => {
  const currentIndex = WEEKDAYS.findIndex(w => w.key === current);
  const nextIndex = (currentIndex + 1) % WEEKDAYS.length;
  return WEEKDAYS[nextIndex].key;
};

// Get previous weekday
export const getPreviousWeekday = (current: Weekday): Weekday => {
  const currentIndex = WEEKDAYS.findIndex(w => w.key === current);
  const prevIndex = currentIndex === 0 ? WEEKDAYS.length - 1 : currentIndex - 1;
  return WEEKDAYS[prevIndex].key;
};