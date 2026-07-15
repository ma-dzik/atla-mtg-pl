export type AppRoute =
  | { kind: 'start' }
  | { kind: 'menu' }
  | { kind: 'instructions' }
  | { kind: 'deckSelect' }
  | { kind: 'quickStart'; step: number | 'resume' }
  | { kind: 'cards' }
  | { kind: 'card'; printKey: string }
  | { kind: 'glossary' }
  | { kind: 'glossaryDetail'; termId: string }
  | { kind: 'notFound' }

export function getPath(): string {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  return raw || '/'
}

export function parseRoute(path: string): AppRoute {
  if (path === '/') return { kind: 'start' }
  if (path === '/menu') return { kind: 'menu' }
  if (path === '/instrukcja') return { kind: 'instructions' }
  if (path === '/instrukcja/talia') return { kind: 'deckSelect' }
  if (path === '/karty') return { kind: 'cards' }
  if (path === '/slowniczek') return { kind: 'glossary' }

  const quick = path.match(/^\/instrukcja\/zuko\/(resume|\d+)$/)
  if (quick) return { kind: 'quickStart', step: quick[1] === 'resume' ? 'resume' : Number(quick[1]) }

  const card = path.match(/^\/karty\/(.+)$/)
  if (card) return { kind: 'card', printKey: card[1] }

  const glossary = path.match(/^\/slowniczek\/(.+)$/)
  if (glossary) return { kind: 'glossaryDetail', termId: glossary[1] }

  return { kind: 'notFound' }
}

export function navigate(path: string): void {
  const next = `#${path}`
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = path
  }
}

export function routeKey(route: AppRoute): string {
  switch (route.kind) {
    case 'card': return `card:${route.printKey}`
    case 'glossaryDetail': return `glossary:${route.termId}`
    case 'quickStart': return `quick:${route.step}`
    default: return route.kind
  }
}
