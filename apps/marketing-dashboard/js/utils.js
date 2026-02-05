/**
 * Utility functions for the Marketing Dashboard
 */

/**
 * Format a number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString('en-US');
}

/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount, currency = 'USD') {
  if (amount === null || amount === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format a number as percentage
 * @param {number} value - Value to format (0-100 or 0-1)
 * @param {number} decimals - Decimal places (default: 1)
 * @returns {string} Formatted percentage
 */
export function formatPercent(value, decimals = 1) {
  if (value === null || value === undefined) return '0%';
  // If value is > 1, assume it's already a percentage
  const pct = value > 1 ? value : value * 100;
  return `${pct.toFixed(decimals)}%`;
}

/**
 * Format a large number with abbreviation (K, M, B)
 * @param {number} num - Number to format
 * @returns {string} Abbreviated number
 */
export function formatCompact(num) {
  if (num === null || num === undefined) return '0';

  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format duration in seconds to human readable
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export function formatDuration(seconds) {
  if (seconds === null || seconds === undefined) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {object} Change info with value and direction
 */
export function calculateChange(current, previous) {
  if (!previous || previous === 0) {
    return { value: 0, direction: 'neutral', formatted: '0%' };
  }

  const change = ((current - previous) / previous) * 100;
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';

  return {
    value: change,
    direction,
    formatted: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
  };
}

/**
 * Get a color based on change direction
 * @param {string} direction - 'up', 'down', or 'neutral'
 * @param {boolean} inverseColors - Whether up is bad (like bounce rate)
 * @returns {string} Color value
 */
export function getChangeColor(direction, inverseColors = false) {
  const colors = {
    up: inverseColors ? '#DC2626' : '#059669',
    down: inverseColors ? '#059669' : '#DC2626',
    neutral: '#6B7280',
  };
  return colors[direction] || colors.neutral;
}

/**
 * Generate random data for demo purposes
 * @param {number} count - Number of data points
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number[]} Array of random values
 */
export function generateRandomData(count, min, max) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Get month labels for charts
 * @param {number} count - Number of months
 * @returns {string[]} Month labels
 */
export function getMonthLabels(count = 12) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.slice(0, count);
}

/**
 * Get day labels for charts
 * @param {number} count - Number of days
 * @returns {string[]} Day labels
 */
export function getDayLabels(count = 7) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.slice(0, count);
}

/**
 * Debounce a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
