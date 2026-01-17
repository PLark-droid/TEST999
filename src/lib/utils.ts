/**
 * TEST999 - Utility Functions
 *
 * Common utility functions used throughout the project
 */

import type { Result, Task, TaskStatus, LogLevel, LogEntry } from '../types/index.js';

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format a date to ISO string
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * Parse ISO date string to Date object
 */
export function parseDate(dateString: string): Result<Date> {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return { success: false, error: new Error(`Invalid date string: ${dateString}`) };
  }
  return { success: true, data: date };
}

/**
 * Create a new task
 */
export function createTask(title: string, description?: string): Task {
  const now = new Date();
  return {
    id: generateId(),
    title,
    description,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update task status
 */
export function updateTaskStatus(task: Task, status: TaskStatus): Task {
  return {
    ...task,
    status,
    updatedAt: new Date(),
  };
}

/**
 * Check if task is completed
 */
export function isTaskCompleted(task: Task): boolean {
  return task.status === 'completed';
}

/**
 * Check if task is active (pending or in_progress)
 */
export function isTaskActive(task: Task): boolean {
  return task.status === 'pending' || task.status === 'in_progress';
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<Result<T>> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await fn();
      return { success: true, data: result };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  return { success: false, error: lastError ?? new Error('Unknown error') };
}

/**
 * Create a log entry
 */
export function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date(),
    context,
  };
}

/**
 * Format log entry to string
 */
export function formatLogEntry(entry: LogEntry): string {
  const timestamp = formatDate(entry.timestamp);
  const level = entry.level.toUpperCase().padEnd(5);
  const context = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
  return `[${timestamp}] ${level} ${entry.message}${context}`;
}

/**
 * Truncate string to specified length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Filter out null/undefined values from array
 */
export function filterDefined<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter(isDefined);
}
