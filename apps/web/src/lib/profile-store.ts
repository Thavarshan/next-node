// In-memory fake persistence for a local learning exercise, not a production DB.
const names = new Map<string, string>();

export function setDisplayName(userId: string, name: string) {
  names.set(userId, name);
}

export function getDisplayName(userId: string) {
  return names.get(userId);
}
