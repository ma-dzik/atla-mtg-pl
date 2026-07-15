import type { QuickStartData } from '../types'
import { Content, Screen } from '../components/Screen'
import { TopBar } from '../components/TopBar'

const ASSET_PATHS: Record<string, string> = {
  'zuko-qsg-hand': 'zuko-qsg-hand.png',
  'zuko-qsg-anatomy': 'zuko-qsg-anatomy.png',
  'zuko-qsg-tap-untap': 'zuko-qsg-tap-untap.png',
  'zuko-qsg-recap-turn-1': 'zuko-qsg-recap-turn-1.png',
  'zuko-qsg-scout-damage': 'zuko-qsg-scout-damage.png',
  'zuko-qsg-block-trade': 'zuko-qsg-block-trade.png',
  'zuko-qsg-turn-3-combat': 'zuko-qsg-turn-3-combat.png',
  'zuko-qsg-destroy-wall': 'zuko-qsg-destroy-wall.png',
  'zuko-qsg-momo-soldier': 'zuko-qsg-momo-soldier.png',
  'zuko-qsg-iroh-sokka': 'zuko-qsg-iroh-sokka.png',
  'zuko-qsg-momo-flying': 'zuko-qsg-momo-flying.png',
  'zuko-qsg-zhao-double-block': 'zuko-qsg-zhao-double-block.png',
  'zuko-qsg-final-combat': 'zuko-qsg-final-combat.png',
  'zuko-qsg-trample': 'zuko-qsg-trample.png',
  'zuko-qsg-recap-turn-8': 'zuko-qsg-recap-turn-8.png',
}

interface Props {
  data: QuickStartData
  stepIndex: number
  onBack: () => void
  onRestart: () => void
  onStep: (step: number) => void
}

export function QuickStartScreen({ data, stepIndex, onBack, onRestart, onStep }: Props) {
  const step = data.steps[stepIndex]
  const progress = ((stepIndex + 1) / data.steps.length) * 100
  const assetFile = step.assetId ? ASSET_PATHS[step.assetId] : undefined

  return (
    <Screen>
      <TopBar title="Quick Start — Zuko" onBack={onBack} action={{ label: 'Od nowa', onClick: onRestart }} />
      <Content>
        <div className="progress-wrap">
          <div className="progress-label"><span>{step.chapter}</span><span>{stepIndex + 1}/{data.steps.length}</span></div>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <h2 className="step-title">{step.titlePl}</h2>
        {assetFile && <img className="step-image" src={`./assets/quick-start-zuko/${assetFile}`} alt={`Ilustracja kroku ${stepIndex + 1}`} />}
        <div className="section-label">Zrób teraz</div>
        <p className="instruction">{step.instructionPl}</p>
        <div className="section-label">Dlaczego?</div>
        <p className="explanation">{step.explanationPl}</p>
        {stepIndex === data.steps.length - 1 && (
          <button className="secondary-button blue restart-end" type="button" onClick={onRestart}>Zagraj tutorial jeszcze raz od początku</button>
        )}
      </Content>
      <nav className="step-nav" aria-label="Nawigacja kroków">
        <button className="nav-arrow" type="button" disabled={stepIndex === 0} onClick={() => onStep(stepIndex - 1)} aria-label="Poprzedni krok">‹</button>
        <div className="step-counter">Krok {stepIndex + 1}</div>
        <button className="nav-arrow" type="button" disabled={stepIndex === data.steps.length - 1} onClick={() => onStep(stepIndex + 1)} aria-label="Następny krok">›</button>
      </nav>
    </Screen>
  )
}
