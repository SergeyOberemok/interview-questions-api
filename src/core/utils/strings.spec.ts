import { removeUnnecessarySigns, stripBase64 } from './strings';

describe('Strings', () => {
  it('removeUnnecessarySigns', () => {
    const sentence = ' hello   world! ';
    const result = removeUnnecessarySigns(sentence);
    expect(result).not.toBe(sentence);
    expect(result).toBe('hello world');
  });

  describe('stripBase64', () => {
    it('strip', () => {
      const str =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR';
      const [firstPart, secondPart] = str.split(',');

      const result = stripBase64(str);

      expect(result).not.toContain(firstPart);
      expect(result).toContain(secondPart);
      expect(result).not.toEqual(str);
    });

    it('empty', () => {
      const str = 'iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR';

      const result = stripBase64(str);

      expect(result).toEqual(str);
    });
  });
});
