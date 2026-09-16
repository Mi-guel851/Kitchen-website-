/**
 * Returns a data-URI SVG avatar with the person's initials on caramel.
 * Used as an onError fallback when remote avatars fail to load.
 */
export function avatarFallback(name = '?') {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="#ECD3AF"/><text x="48" y="60" font-family="system-ui,sans-serif" font-size="34" font-weight="800" fill="#765F52" text-anchor="middle">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
