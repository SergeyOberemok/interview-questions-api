export function removeDoubleSpaces(sentence: string): string {
  return sentence.replace(/\s+/g, ' ');
}

export function removePunctuation(sentence: string): string {
  return sentence.replace(/\W/g, ' ');
}

export function removeUnnecessarySigns(sentence: string): string {
  if (!sentence?.length) {
    return '';
  }

  return [removePunctuation, removeDoubleSpaces, (s) => s.trim()].reduce(
    (acc, fn) => ((acc = fn(acc)), acc),
    sentence,
  );
}

export function stripBase64(base64) {
  return base64.substring(base64.indexOf(',') + 1);
}
