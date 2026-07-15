import { readFileSync } from 'node:fs'

const cards = JSON.parse(readFileSync(new URL('../src/data/avatar-cards.app.json', import.meta.url), 'utf8'))
const glossary = JSON.parse(readFileSync(new URL('../src/data/glossary.json', import.meta.url), 'utf8'))
const quick = JSON.parse(readFileSync(new URL('../src/data/quick-start-zuko.json', import.meta.url), 'utf8'))
const tutorial = JSON.parse(readFileSync(new URL('../src/data/tutorial-prints.json', import.meta.url), 'utf8'))

const printKeys = cards.records.map(card => card.printKey)
const duplicatePrintKeys = printKeys.filter((key, index) => printKeys.indexOf(key) !== index)
const glossaryIds = new Set(glossary.entries.map(entry => entry.id))
const missingGlossary = [...new Set(quick.steps.flatMap(step => step.glossaryTermIds))].filter(id => !glossaryIds.has(id))
const missingTutorialCards = Object.keys(tutorial).filter(key => !printKeys.includes(key))

const checks = {
  cards: cards.records.length,
  glossary: glossary.entries.length,
  quickStartSteps: quick.steps.length,
  duplicatePrintKeys,
  missingGlossary,
  missingTutorialCards,
}
console.log(JSON.stringify(checks, null, 2))
if (cards.records.length !== 524 || duplicatePrintKeys.length || missingGlossary.length || missingTutorialCards.length) process.exit(1)
