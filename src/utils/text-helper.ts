/**
 * Options for customizing slug generation.
 */
export interface SlugifyOptions {
  /**
   * Convert slug output to lowercase.
   * @default true
   */
  lower?: boolean;
  /**
   * Separator character between words.
   * @default '-'
   */
  separator?: string;
  /**
   * Strip leading and trailing separator characters.
   * @default true
   */
  trim?: boolean;
  /**
   * Custom RegExp pattern to strip invalid characters.
   */
  remove?: RegExp;
}

/**
 * Options for truncating words.
 */
export interface TruncateWordsOptions {
  /**
   * Suffix to append when text is truncated.
   * @default '...'
   */
  suffix?: string;
}

/**
 * Normalizes diacritical marks and accents (e.g. Vietnamese, European accents).
 *
 * @param str - Input string.
 * @returns String with diacritics normalized to basic Latin characters.
 */
function removeDiacritics(str: string): string {
  return str
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'Ae')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'Oe')
    .replace(/ø/g, 'o')
    .replace(/Ø/g, 'O')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Generates a URL-friendly slug from an input string.
 * Accented/diacritic characters are normalized to basic ASCII Latin characters.
 *
 * @param text - The string to convert to a slug.
 * @param options - Optional configuration options.
 * @returns The formatted slug string.
 */
export function slugify(text: string, options?: SlugifyOptions): string {
  if (!text) {
    return '';
  }

  const {
    lower = true,
    separator = '-',
    trim = true,
    remove,
  } = options ?? {};

  let result = removeDiacritics(text);

  if (remove) {
    result = result.replace(remove, '');
  }

  // Replace any character that is not alphanumeric or the separator with the separator
  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const invalidCharPattern = new RegExp(`[^a-zA-Z0-9${escapedSeparator}]+`, 'g');
  result = result.replace(invalidCharPattern, separator);

  // Collapse consecutive separators
  const multiSepPattern = new RegExp(`${escapedSeparator}+`, 'g');
  result = result.replace(multiSepPattern, separator);

  if (trim) {
    const trimStartPattern = new RegExp(`^${escapedSeparator}+`);
    const trimEndPattern = new RegExp(`${escapedSeparator}+$`);
    result = result.replace(trimStartPattern, '').replace(trimEndPattern, '');
  }

  if (lower) {
    result = result.toLowerCase();
  }

  return result;
}

/**
 * Truncates a string to a specified maximum number of words.
 *
 * @param text - The input text to truncate.
 * @param maxWords - Maximum number of words to keep.
 * @param optionsOrSuffix - Custom suffix string or TruncateWordsOptions object. Defaults to '...'.
 * @returns Truncated string with suffix if truncation occurred.
 */
export function truncateWords(
  text: string,
  maxWords: number,
  optionsOrSuffix: string | TruncateWordsOptions = '...'
): string {
  if (!text || maxWords <= 0) {
    return '';
  }

  const suffix =
    typeof optionsOrSuffix === 'string'
      ? optionsOrSuffix
      : (optionsOrSuffix.suffix ?? '...');

  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return '';
  }

  const words = trimmedText.split(/\s+/);
  if (words.length <= maxWords) {
    return trimmedText;
  }

  return words.slice(0, maxWords).join(' ') + suffix;
}

/**
 * Converts a string into camelCase format.
 * Supports handling of kebab-case, snake_case, PascalCase, CONSTANT_CASE,
 * and arbitrary whitespace or punctuation delimiters.
 *
 * @param text - The input string to convert.
 * @returns The string converted to camelCase.
 */
export function toCamelCase(text: string): string {
  if (!text) {
    return '';
  }

  const words = text
    // Separate lower-to-upper transition (camelCase / PascalCase)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // Separate consecutive uppercase letters followed by lowercase (e.g. XMLHttpRequest -> XML Http Request)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // Replace non-alphanumeric characters with spaces
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}
