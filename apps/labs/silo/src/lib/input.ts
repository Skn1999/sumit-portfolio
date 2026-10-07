/**
 * Input intent detection helpers for "The Spiral" portfolio.
 * Reference: research/silo.md sections 8.4 & 11.4
 */

export class WheelAccumulator {
  private samples: Array<{ deltaY: number; timestamp: number }> = [];

  add(deltaY: number, now = Date.now()): void {
    this.samples.push({ deltaY, timestamp: now });
  }

  prune(timeWindowMs: number, now = Date.now()): void {
    const cutoff = now - timeWindowMs;
    this.samples = this.samples.filter((s) => s.timestamp >= cutoff);
  }

  sum(timeWindowMs: number, now = Date.now()): number {
    this.prune(timeWindowMs, now);
    return this.samples.reduce((total, s) => total + s.deltaY, 0);
  }

  clear(): void {
    this.samples = [];
  }
}

const defaultAccumulator = new WheelAccumulator();
const entryAccumulator = new WheelAccumulator();
const backAccumulator = new WheelAccumulator();

/**
 * General wheel accumulation helper.
 * Accumulates deltaY and returns true if total exceeds threshold within timeWindowMs.
 */
export function accumulateWheelDelta(
  deltaY: number,
  timeWindowMs: number,
  threshold = 40,
  now = Date.now()
): boolean {
  defaultAccumulator.add(deltaY, now);
  const total = defaultAccumulator.sum(timeWindowMs, now);
  if (total > threshold) {
    defaultAccumulator.clear();
    return true;
  }
  return false;
}

let modeACooldownUntil = 0;

/**
 * Sets a cooldown period during which Mode A will ignore any scroll events.
 * Used when returning from Mode B to prevent residual momentum from re-triggering morph.
 */
export function setModeACooldown(durationMs = 800, now = Date.now()): void {
  modeACooldownUntil = now + durationMs;
}

export function isModeACooldown(now = Date.now()): boolean {
  return now < modeACooldownUntil;
}

/**
 * Entry intent detection matching Requirement 2:
 * Requires deliberate scroll with a safeguard threshold (default > 80 within 400ms).
 */
export function shouldTriggerEntry(
  deltaY: number,
  now = Date.now(),
  threshold = 80
): boolean {
  if (isModeACooldown(now)) {
    entryAccumulator.clear();
    return false;
  }

  entryAccumulator.add(deltaY, now);
  const total = entryAccumulator.sum(400, now);
  if (total > threshold) {
    entryAccumulator.clear();
    return true;
  }
  return false;
}

/**
 * Back to drawing intent detection matching section 11.4:
 * "at progress = 0, a downward-to-upward wheel accumulation of more than 240px within 600ms"
 * Note: upward scrolling corresponds to negative deltaY in DOM wheel events.
 */
export function shouldTriggerBackToDrawing(
  scrollY: number,
  deltaY: number,
  now = Date.now()
): boolean {
  // Only triggered when at the top (scrollY <= 0)
  if (scrollY > 0) {
    backAccumulator.clear();
    return false;
  }

  backAccumulator.add(deltaY, now);
  const total = backAccumulator.sum(600, now);

  // Upward wheel gesture produces negative deltaY; accumulation > 240px means sum <= -240
  if (total <= -240) {
    backAccumulator.clear();
    return true;
  }
  return false;
}

/**
 * Resets all internal wheel accumulators (useful for tests or state transitions).
 */
export function resetInputState(): void {
  defaultAccumulator.clear();
  entryAccumulator.clear();
  backAccumulator.clear();
  modeACooldownUntil = 0;
}
