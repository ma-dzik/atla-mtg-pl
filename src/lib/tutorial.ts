import tutorialData from '../data/tutorial-prints.json'
import type { CardRecord, TutorialPrint, TutorialPrintMap } from '../types'

export const tutorialPrints = tutorialData as TutorialPrintMap

export interface TutorialLabel extends TutorialPrint {
  positionLabel: string
}

export function getTutorialLabel(card: CardRecord): TutorialLabel | null {
  const print = tutorialPrints[card.printKey]
  if (!print) return null
  const positionLabel = print.positions.length === 1
    ? `Zuko Tutorial ${print.positions[0]}`
    : `Zuko Tutorial ${print.positions.join(', ')}`
  return { ...print, positionLabel }
}
