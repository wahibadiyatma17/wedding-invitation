// Client-safe utilities to prevent hydration mismatches

let idCounter = 0;

export function generateId(prefix = 'id'): string {
  if (typeof window !== 'undefined') {
    // Client-side: use timestamp + random for uniqueness
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  } else {
    // Server-side: use counter to ensure consistent IDs
    idCounter++;
    return `${prefix}-${idCounter}`;
  }
}

export function getCurrentTime(): number {
  if (typeof window !== 'undefined') {
    return new Date().getTime();
  }
  // Server-side: return a static time to prevent hydration mismatch
  return 0;
}

export function getCurrentDate(): Date {
  if (typeof window !== 'undefined') {
    return new Date();
  }
  // Server-side: return epoch to prevent hydration mismatch
  return new Date(0);
}