export function makeRegExp(word: string) {
  return new RegExp(word, 'i');
}

export function makeRegExps(words: string[]) {
  return words.map(makeRegExp);
}

export function makeOrRegExp(words: string[]) {
  return makeRegExp(words.join('|'));
}
