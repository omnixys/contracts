export function createTmpUsername(lastName: string, firstName: string): string {
  return `${firstName}.${lastName}`
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFKD')
    .replace(/[^\w.]/g, '');
}
