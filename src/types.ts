export interface RulesTextPart {
  type: 'text' | 'glossary'
  text: string
  termId?: string
  showEnglishTerm?: boolean
}

export interface CardFace {
  faceIndex: number
  name: string
  manaCost: string
  typeLineSource: string
  typeLinePl: string
  rulesTextSource: string
  rulesTextPlPlain: string | null
  rulesTextParts: RulesTextPart[]
  power: string | null
  toughness: string | null
  loyalty: string | null
  defense: string | null
  glossaryTermIds: string[]
  explanationPl?: string
  importantPl?: string | null
}

export interface CardRecord {
  cardId: string
  oracleId?: string
  printKey: string
  name: string
  setCode: string
  setName?: string
  collectorNumber: string
  collectorNumberNumeric: number | null
  layout: string
  manaValue?: number
  faces: CardFace[]
  sourceKeywords: string[]
  colors: string[]
  colorIdentity: string[]
  rarity?: string
  isToken: boolean
  search: {
    normalizedName: string
    normalizedFaceNames: string[]
    normalizedCollectorNumber: string
    normalizedSetCode: string
    normalizedFullCode: string
  }
}

export interface CardsData {
  id: string
  version: string
  recordCount: number
  records: CardRecord[]
}

export interface GlossaryEntry {
  id: string
  englishTerm: string
  polishTerm: string
  shortDefinitionPl: string
  fullDefinitionPl: string
  examplePl?: string | null
  aliases: string[]
  relatedTermIds: string[]
  howItWorksPl?: string
  stepsPl?: string[]
  tipPl?: string
}

export interface GlossaryData {
  id: string
  version: string
  entryCount: number
  entries: GlossaryEntry[]
}

export interface QuickStartStep {
  id: string
  order: number
  sourcePage: number
  chapter: string
  actor: string
  titlePl: string
  instructionPl: string
  explanationPl: string
  assetId: string | null
  glossaryTermIds: string[]
  checkpoint: boolean
}

export interface QuickStartData {
  id: string
  titlePl: string
  totalSteps: number
  steps: QuickStartStep[]
}

export interface TutorialPrint {
  code: string
  setCode: string
  collector: string
  positions: number[]
}

export type TutorialPrintMap = Record<string, TutorialPrint>
