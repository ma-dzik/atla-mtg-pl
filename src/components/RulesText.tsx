import type { CardFace } from '../types'

interface RulesTextProps {
  face: CardFace
  onOpenTerm: (termId: string) => void
  getEnglishTerm: (termId: string) => string | undefined
}

export function RulesText({ face, onOpenTerm, getEnglishTerm }: RulesTextProps) {
  if (face.rulesTextPlPlain === null) {
    return <p className="no-translation">Polskie tłumaczenie tej karty nie jest jeszcze gotowe.</p>
  }

  if (!face.rulesTextParts.length) {
    return <>{face.rulesTextPlPlain || 'Brak tekstu zasad.'}</>
  }

  return <>{face.rulesTextParts.map((part, index) => {
    if (part.type !== 'glossary' || !part.termId) {
      return <span key={index}>{part.text}</span>
    }
    const english = part.showEnglishTerm ? getEnglishTerm(part.termId) : undefined
    return (
      <button key={index} className="term-button" type="button" onClick={() => onOpenTerm(part.termId!)}>
        {part.text}{english ? ` (${english})` : ''}
      </button>
    )
  })}</>
}
