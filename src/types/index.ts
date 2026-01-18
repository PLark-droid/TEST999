/**
 * TEST999 - Type Definitions
 *
 * Core type definitions for the project
 */

/**
 * Result type for operations that can succeed or fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Task status for tracking work items
 */
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

/**
 * Task definition
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Agent execution result
 */
export interface AgentResult {
  taskId: string;
  status: 'success' | 'failure';
  message: string;
  durationMs: number;
  metadata?: Record<string, unknown>;
}

/**
 * Configuration options
 */
export interface Config {
  projectName: string;
  version: string;
  debug: boolean;
}

/**
 * Logger level
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Log entry
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}
