import { removeUnnecessarySigns } from './strings';

describe('Strings', () => {
  it('removeUnnecessarySigns', () => {
    const sentence = ' hello   world! ';
    const result = removeUnnecessarySigns(sentence);
    expect(result).not.toBe(sentence);
    expect(result).toBe('hello world');
  });
});
