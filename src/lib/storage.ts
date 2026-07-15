export const QUICK_START_STORAGE_KEY = 'avatar-mtg-guide:zuko-quick-start-step'

export function readQuickStartStep(maxStep: number): number {
  const value = Number(window.localStorage.getItem(QUICK_START_STORAGE_KEY) ?? 0)
  if (!Number.isInteger(value)) return 0
  return Math.max(0, Math.min(value, maxStep))
}

export function saveQuickStartStep(step: number): void {
  window.localStorage.setItem(QUICK_START_STORAGE_KEY, String(step))
}

export function resetQuickStart(): void {
  window.localStorage.setItem(QUICK_START_STORAGE_KEY, '0')
}
