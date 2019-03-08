export const createObjectURL = (file: File | Blob): string | null =>
  window.URL ? window.URL.createObjectURL(file) : null

export const revokeObjectURL = (src: string) =>
  window.URL ? window.URL.revokeObjectURL(src) : null

export const getRadian = (rotate: number): number => (rotate * Math.PI) / 180
export const is90Deg = (rotate: number) => Math.abs(rotate) % 180 === 90

/**
 * Normalize decimal number.
 * Check out {@link http://0.30000000000000004.com/}
 * @param {number} value - The value to normalize.
 * @param {number} [times=100000000000] - The times for normalizing.
 * @returns {number} Returns the normalized number.
 */
const REGEXP_DECIMALS: RegExp = /\.\d*(?:0|9){12}\d*$/
export const normalizeDecimalNumber = (
  value: number,
  times: number = 100000000000
) =>
  REGEXP_DECIMALS.test(String(value))
    ? Math.round(value * times) / times
    : value
