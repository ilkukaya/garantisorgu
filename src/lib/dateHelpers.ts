export function formatTurkishDate(date: Date): string {
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getMinPurchaseDate(): string {
  const min = new Date();
  min.setFullYear(min.getFullYear() - 20);
  return min.toISOString().split('T')[0];
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function isValidPurchaseDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const min = new Date();
  min.setFullYear(min.getFullYear() - 20);
  return date <= now && date >= min;
}

export function formatRelativeDays(days: number): string {
  if (days <= 0) {
    return `${Math.abs(days)} gün önce bitti`;
  }
  if (days === 1) return 'Yarın bitiyor';
  if (days < 30) return `${days} gün kaldı`;
  if (days < 365) return `${Math.floor(days / 30)} ay kaldı`;
  return `${Math.floor(days / 365)} yıl ${Math.floor((days % 365) / 30)} ay kaldı`;
}
