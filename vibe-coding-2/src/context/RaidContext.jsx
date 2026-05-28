/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { MOCK_RAID } from '../data/mockData'

function normalizeRaid(raid = MOCK_RAID) {
  return {
    ...MOCK_RAID,
    ...raid,
    health: raid.health ?? MOCK_RAID.health,
    maxHealth: raid.maxHealth ?? MOCK_RAID.maxHealth,
    status: raid.status ?? MOCK_RAID.status,
    log: raid.log ?? [],
  }
}

function raidReducer(state, action) {
  switch (action.type) {
    case 'APPLY_DAMAGE': {
      const damage = action.damage ?? 0
      const nextHealth = Math.max(0, state.health - damage)
      return {
        ...state,
        health: nextHealth,
        status: nextHealth === 0 ? 'defeated' : state.status,
        log: action.logEntry
          ? [{ ...action.logEntry, damage }, ...state.log].slice(0, 8)
          : state.log,
      }
    }

    case 'RESET_RAID':
      return normalizeRaid(action.raid ?? MOCK_RAID)

    default:
      return state
  }
}

const RaidContext = createContext(null)

export function RaidProvider({ children }) {
  const [stored, setStored] = useLocalStorage('tpp_raid', MOCK_RAID)
  const [raid, dispatch] = useReducer(raidReducer, stored, normalizeRaid)

  useEffect(() => {
    setStored(raid)
  }, [raid]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RaidContext.Provider value={{ raid, dispatch }}>
      {children}
    </RaidContext.Provider>
  )
}

export function useRaid() {
  const ctx = useContext(RaidContext)
  if (!ctx) throw new Error('useRaid는 RaidProvider 안에서 사용해야 합니다.')
  return ctx
}
