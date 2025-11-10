import { format, formatDistance, isPast, isFuture, startOfDay, endOfDay } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM d, yyyy h:mm a');
};

export const formatRelativeDate = (date: string | Date): string => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const isOverdue = (dueDate: string | Date): boolean => {
  return isPast(new Date(dueDate)) && !isToday(dueDate);
};

export const isDueSoon = (dueDate: string | Date, daysThreshold = 3): boolean => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= daysThreshold;
};

export const isToday = (date: string | Date): boolean => {
  const today = startOfDay(new Date());
  const compareDate = startOfDay(new Date(date));
  return today.getTime() === compareDate.getTime();
};

export const getStartOfDay = (date: string | Date): Date => {
  return startOfDay(new Date(date));
};

export const getEndOfDay = (date: string | Date): Date => {
  return endOfDay(new Date(date));
};
