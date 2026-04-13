'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VERTICAL } from '../data/verticals'

import MerchantCheckout from './MerchantCheckout'
import AnchorContribute from './AnchorContribute'
import SquadSummary from './SquadSummary'
import ContributorsJoining from './ContributorsJoining'
import SquadComplete from './SquadComplete'

// Steps:
// 1 - Merchant checkout (SuitePro branded)
// 2 - Anchor contribute (setup + payment)
// 3 - Squad summary + share
// 4 - Contributors joining (animated)
// 5 - Squad complete + CTA

export default function Demo() {
  const [step, setStep] = useState(1)
  const vertical = VERTICAL
  const [squadName, setSquadName] = useState(vertical.defaultSquadName)
  const [anchorData, setAnchorData] = useState(null)

  const advance = (data) => {
    if (data) {
      if (data.squadName !== undefined) setSquadName(data.squadName)
      if (data.anchorAmount !== undefined) setAnchorData(data)
    }
    const next = step + 1
    setStep(next)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const restart = () => {
    setStep(1)
    setSquadName(vertical.defaultSquadName)
    setAnchorData(null)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const commonProps = { vertical, squadName, onRestart: restart }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
      >
        {step === 1 && (
          <MerchantCheckout {...commonProps} onAdvance={advance} />
        )}
        {step === 2 && (
          <AnchorContribute
            {...commonProps}
            setSquadName={setSquadName}
            onAdvance={(data) => advance(data)}
          />
        )}
        {step === 3 && (
          <SquadSummary
            {...commonProps}
            anchorAmount={anchorData?.anchorAmount ?? vertical.contributors[0].amount}
            length={anchorData?.length ?? vertical.duration}
            onAdvance={advance}
          />
        )}
        {step === 4 && (
          <ContributorsJoining
            {...commonProps}
            anchorAmount={anchorData?.anchorAmount ?? vertical.contributors[0].amount}
            length={anchorData?.length ?? vertical.duration}
            onAdvance={advance}
          />
        )}
        {step === 5 && (
          <SquadComplete
            {...commonProps}
            anchorAmount={anchorData?.anchorAmount ?? vertical.contributors[0].amount}
            onRestart={restart}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
