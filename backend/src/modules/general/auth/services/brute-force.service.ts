import { Injectable } from '@nestjs/common';

interface FailedAttempt {
  count: number;
  lastAttempt: number;
  lockoutUntil?: number;
}

@Injectable()
export class BruteForceService {
  private failedAttempts = new Map<string, FailedAttempt>();

  private readonly maxAttempts = 5;
  private readonly lockoutDurationMs = 15 * 60 * 1000; // 15 minutes
  private readonly resetWindowMs = 15 * 60 * 1000; // 15 minutes
  private readonly progressiveDelayMs: number[] = [0, 500, 1000, 2000, 4000]; // Increasing delays

  /**
   * Check if account/IP is locked out
   */
  isLocked(key: string): { locked: boolean; remainingMs?: number } {
    const record = this.failedAttempts.get(key);
    const now = Date.now();

    if (!record) {
      return { locked: false };
    }

    // Reset record if window has passed
    if (now - record.lastAttempt > this.resetWindowMs) {
      this.failedAttempts.delete(key);
      return { locked: false };
    }

    // Check if currently locked out
    if (record.lockoutUntil && now < record.lockoutUntil) {
      const remainingMs = record.lockoutUntil - now;
      return { locked: true, remainingMs };
    }

    return { locked: false };
  }

  /**
   * Record a failed login attempt
   */
  recordFailure(key: string): { locked: boolean; delay: number; remainingMs?: number } {
    const record = this.failedAttempts.get(key) || { count: 0, lastAttempt: Date.now() };
    const now = Date.now();

    // Reset if window has passed
    if (now - record.lastAttempt > this.resetWindowMs) {
      record.count = 0;
    }

    record.count++;
    record.lastAttempt = now;

    // Calculate progressive delay
    const delayIndex = Math.min(record.count - 1, this.progressiveDelayMs.length - 1);
    const delay = this.progressiveDelayMs[delayIndex];

    // Lock after max attempts
    if (record.count >= this.maxAttempts) {
      record.lockoutUntil = now + this.lockoutDurationMs;
      this.failedAttempts.set(key, record);
      return { locked: true, delay, remainingMs: this.lockoutDurationMs };
    }

    this.failedAttempts.set(key, record);
    return { locked: false, delay };
  }

  /**
   * Clear failed attempts on successful login
   */
  clearFailures(key: string): void {
    this.failedAttempts.delete(key);
  }

  /**
   * Get current failed attempts count
   */
  getAttempts(key: string): number {
    const record = this.failedAttempts.get(key);
    if (!record) return 0;

    const now = Date.now();
    if (now - record.lastAttempt > this.resetWindowMs) {
      this.failedAttempts.delete(key);
      return 0;
    }

    return record.count;
  }

  /**
   * Cleanup expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.failedAttempts.entries()) {
      if (now - record.lastAttempt > this.resetWindowMs && (!record.lockoutUntil || now > record.lockoutUntil)) {
        this.failedAttempts.delete(key);
      }
    }
  }
}
