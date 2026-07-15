import type { PropsWithChildren } from 'react'

interface ScreenProps extends PropsWithChildren {
  className?: string
}

export function Screen({ children, className = '' }: ScreenProps) {
  return <main className={`screen ${className}`.trim()}>{children}</main>
}

export function Content({ children }: PropsWithChildren) {
  return <div className="content">{children}</div>
}
