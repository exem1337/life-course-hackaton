export function formatPersonName(name?: string, lastName?: string, middleName?: string): string {
  return `${lastName || ''} ${name || ''} ${middleName || ''}`;
}
