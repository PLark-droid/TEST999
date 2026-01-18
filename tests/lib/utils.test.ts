/**
 * TEST999 - Utils Unit Tests
 *
 * Comprehensive tests for utility functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateId,
  formatDate,
  parseDate,
  createTask,
  updateTaskStatus,
  isTaskCompleted,
  isTaskActive,
  sleep,
  retry,
  createLogEntry,
  formatLogEntry,
  truncate,
  deepClone,
  isDefined,
  filterDefined,
} from '../../src/lib/utils.js';
// Types imported for documentation purposes
// import type { Task } from '../../src/types/index.js';

describe('generateId', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should generate IDs with expected format', () => {
    const id = generateId();
    expect(id).toMatch(/^\d+-[a-z0-9]+$/);
  });
});

describe('formatDate', () => {
  it('should format date to ISO string', () => {
    const date = new Date('2025-01-17T12:00:00.000Z');
    expect(formatDate(date)).toBe('2025-01-17T12:00:00.000Z');
  });
});

describe('parseDate', () => {
  it('should parse valid date string', () => {
    const result = parseDate('2025-01-17T12:00:00.000Z');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.toISOString()).toBe('2025-01-17T12:00:00.000Z');
    }
  });

  it('should return error for invalid date string', () => {
    const result = parseDate('invalid-date');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain('Invalid date string');
    }
  });
});

describe('createTask', () => {
  it('should create task with title only', () => {
    const task = createTask('Test Task');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBeUndefined();
    expect(task.status).toBe('pending');
    expect(task.id).toBeDefined();
  });

  it('should create task with title and description', () => {
    const task = createTask('Test Task', 'Task description');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Task description');
  });
});

describe('updateTaskStatus', () => {
  it('should update task status', () => {
    const task = createTask('Test Task');
    const updated = updateTaskStatus(task, 'in_progress');
    expect(updated.status).toBe('in_progress');
    expect(updated.id).toBe(task.id);
  });

  it('should update updatedAt timestamp', () => {
    const task = createTask('Test Task');
    const originalUpdatedAt = task.updatedAt;

    // Small delay to ensure different timestamp
    const updated = updateTaskStatus(task, 'completed');
    expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
  });
});

describe('isTaskCompleted', () => {
  it('should return true for completed task', () => {
    const task = createTask('Test');
    const completed = updateTaskStatus(task, 'completed');
    expect(isTaskCompleted(completed)).toBe(true);
  });

  it('should return false for non-completed task', () => {
    const task = createTask('Test');
    expect(isTaskCompleted(task)).toBe(false);
  });
});

describe('isTaskActive', () => {
  it('should return true for pending task', () => {
    const task = createTask('Test');
    expect(isTaskActive(task)).toBe(true);
  });

  it('should return true for in_progress task', () => {
    const task = updateTaskStatus(createTask('Test'), 'in_progress');
    expect(isTaskActive(task)).toBe(true);
  });

  it('should return false for completed task', () => {
    const task = updateTaskStatus(createTask('Test'), 'completed');
    expect(isTaskActive(task)).toBe(false);
  });

  it('should return false for failed task', () => {
    const task = updateTaskStatus(createTask('Test'), 'failed');
    expect(isTaskActive(task)).toBe(false);
  });
});

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should resolve after specified time', async () => {
    const promise = sleep(1000);
    vi.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
  });
});

describe('retry', () => {
  it('should return success on first attempt if function succeeds', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retry(fn, 3, 10);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('success');
    }
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and succeed', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockResolvedValue('success');

    const result = await retry(fn, 3, 10);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('success');
    }
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should return error after max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'));

    const result = await retry(fn, 3, 10);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('always fail');
    }
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe('createLogEntry', () => {
  it('should create log entry without context', () => {
    const entry = createLogEntry('info', 'Test message');
    expect(entry.level).toBe('info');
    expect(entry.message).toBe('Test message');
    expect(entry.context).toBeUndefined();
  });

  it('should create log entry with context', () => {
    const entry = createLogEntry('error', 'Error occurred', { code: 500 });
    expect(entry.context).toEqual({ code: 500 });
  });
});

describe('formatLogEntry', () => {
  it('should format log entry without context', () => {
    const entry = createLogEntry('info', 'Test message');
    const formatted = formatLogEntry(entry);
    expect(formatted).toContain('INFO');
    expect(formatted).toContain('Test message');
  });

  it('should format log entry with context', () => {
    const entry = createLogEntry('warn', 'Warning', { key: 'value' });
    const formatted = formatLogEntry(entry);
    expect(formatted).toContain('WARN');
    expect(formatted).toContain('{"key":"value"}');
  });
});

describe('truncate', () => {
  it('should not truncate short strings', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('should truncate long strings with ellipsis', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('should handle exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});

describe('deepClone', () => {
  it('should deep clone objects', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
  });

  it('should deep clone arrays', () => {
    const original = [1, [2, 3], { a: 4 }];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });
});

describe('isDefined', () => {
  it('should return true for defined values', () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined({})).toBe(true);
  });

  it('should return false for null', () => {
    expect(isDefined(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });
});

describe('filterDefined', () => {
  it('should filter out null and undefined values', () => {
    const arr = [1, null, 2, undefined, 3];
    expect(filterDefined(arr)).toEqual([1, 2, 3]);
  });

  it('should keep falsy but defined values', () => {
    const arr = [0, '', false, null, undefined];
    expect(filterDefined(arr)).toEqual([0, '', false]);
  });

  it('should return empty array for all null/undefined', () => {
    const arr = [null, undefined, null];
    expect(filterDefined(arr)).toEqual([]);
  });
});
