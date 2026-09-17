import { describe, it, expect } from 'vitest';
import {
  slugify,
  truncateWords,
  toCamelCase,
  type SlugifyOptions,
  type TruncateWordsOptions,
} from '../utils/text-helper.js';

describe('slugify', () => {
  it('converts basic text into lowercase hyphenated slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('TypeScript Unit Testing')).toBe('typescript-unit-testing');
  });

  it('handles Vietnamese diacritics and special characters correctly', () => {
    expect(slugify('Xin chào Việt Nam!')).toBe('xin-chao-viet-nam');
    expect(slugify('Đà Nẵng & Hà Nội')).toBe('da-nang-ha-noi');
    expect(slugify('Ăn quả nhớ kẻ trồng cây')).toBe('an-qua-nho-ke-trong-cay');
    expect(slugify('Đồng khởi Bến Tre')).toBe('dong-khoi-ben-tre');
  });

  it('normalizes European accented characters and umlauts', () => {
    expect(slugify('Café au Lait')).toBe('cafe-au-lait');
    expect(slugify('Crème brûlée')).toBe('creme-brulee');
    expect(slugify('München Fußball')).toBe('munchen-fussball');
  });

  it('collapses multiple whitespace and special symbols', () => {
    expect(slugify('Special   @#$%   Characters & * Symbols')).toBe('special-characters-symbols');
    expect(slugify('Multiple---hyphens___and...dots')).toBe('multiple-hyphens-and-dots');
  });

  it('trims leading and trailing separators by default', () => {
    expect(slugify('  ---hello world---  ')).toBe('hello-world');
  });

  it('supports custom separator', () => {
    const options: SlugifyOptions = { separator: '_' };
    expect(slugify('Hello World', options)).toBe('hello_world');
  });

  it('supports lower: false option', () => {
    expect(slugify('Hello World', { lower: false })).toBe('Hello-World');
    expect(slugify('Đà Nẵng', { lower: false })).toBe('Da-Nang');
  });

  it('supports trim: false option', () => {
    expect(slugify('-hello-', { trim: false })).toBe('-hello-');
  });

  it('supports custom remove regex', () => {
    expect(slugify('hello 123 world', { remove: /[0-9]/g })).toBe('hello-world');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });
});

describe('truncateWords', () => {
  const sample = 'The quick brown fox jumps over the lazy dog';

  it('truncates text to specified number of words with default ellipsis', () => {
    expect(truncateWords(sample, 4)).toBe('The quick brown fox...');
    expect(truncateWords(sample, 1)).toBe('The...');
  });

  it('does not truncate if words count is less than or equal to maxWords', () => {
    expect(truncateWords('Hello world', 2)).toBe('Hello world');
    expect(truncateWords('Hello world', 5)).toBe('Hello world');
  });

  it('supports custom string suffix', () => {
    expect(truncateWords(sample, 3, ' [read more]')).toBe('The quick brown [read more]');
    expect(truncateWords(sample, 3, '')).toBe('The quick brown');
  });

  it('supports TruncateWordsOptions object', () => {
    const options: TruncateWordsOptions = { suffix: ' --' };
    expect(truncateWords(sample, 3, options)).toBe('The quick brown --');
  });

  it('handles multiple consecutive whitespace properly', () => {
    expect(truncateWords('  One   two   three   four  ', 2)).toBe('One two...');
  });

  it('returns empty string when maxWords <= 0 or input is empty', () => {
    expect(truncateWords(sample, 0)).toBe('');
    expect(truncateWords(sample, -3)).toBe('');
    expect(truncateWords('', 5)).toBe('');
    expect(truncateWords('   ', 5)).toBe('');
  });
});

describe('toCamelCase', () => {
  it('converts space-separated words', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
    expect(toCamelCase('foo bar baz')).toBe('fooBarBaz');
  });

  it('converts kebab-case and snake_case', () => {
    expect(toCamelCase('kebab-case-string')).toBe('kebabCaseString');
    expect(toCamelCase('snake_case_string')).toBe('snakeCaseString');
  });

  it('converts CONSTANT_CASE', () => {
    expect(toCamelCase('HELLO_WORLD')).toBe('helloWorld');
    expect(toCamelCase('API_KEY_SECRET')).toBe('apiKeySecret');
  });

  it('converts PascalCase and already camelCase', () => {
    expect(toCamelCase('PascalCase')).toBe('pascalCase');
    expect(toCamelCase('alreadyCamelCase')).toBe('alreadyCamelCase');
  });

  it('handles acronyms and abbreviations correctly', () => {
    expect(toCamelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    expect(toCamelCase('getHTTPResponse')).toBe('getHttpResponse');
  });

  it('handles mixed separators, dots and punctuation', () => {
    expect(toCamelCase('user.first_name-field')).toBe('userFirstNameField');
    expect(toCamelCase('---mixed...symbols___test---')).toBe('mixedSymbolsTest');
  });

  it('handles numbers embedded in string', () => {
    expect(toCamelCase('item 1 test 2')).toBe('item1Test2');
    expect(toCamelCase('user_123_profile')).toBe('user123Profile');
  });

  it('returns empty string for empty or blank input', () => {
    expect(toCamelCase('')).toBe('');
    expect(toCamelCase('   ')).toBe('');
  });
});
