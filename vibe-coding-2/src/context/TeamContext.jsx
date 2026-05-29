/* eslint-disable react-refresh/only-export-components */
// TeamContext.jsx — members(+points) 전역 상태 + dispatch
//
// Data Model (Member):
// {
//   id: string,           // crypto.randomUUID()
//   name: string,
//   role: string,
//   points: number,       // 누적 포인트 (음수 가능), 초기값 0
//   completedCount: number // 완료 태스크 수
// }
//
// Actions:
//   ADD_MEMBER    { member }
//   UPDATE_MEMBER { id, changes }
//   DELETE_MEMBER { id }
//   ADD_POINTS    { id, delta }  → delta 양수: 적립 / 음수: 차감
//
// 포인트 규칙 (Technical Design §7):
//   기한 내 완료: +10
//   기한 초과 완료: -5

import { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { MOCK_MEMBERS } from '../data/mockData'
import { SHOP_ITEM_MAP } from '../data/shopItems'
import {
  applyHpRhythm,
  applyQuestCompletion,
  normalizeMembers,
  withMemberDefaults,
} from '../utils/gamification'

// ── Reducer ───────────────────────────────────────────────────────────────────

function teamReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEMBER':
      return [...state, withMemberDefaults(action.member)]

    case 'UPDATE_MEMBER':
      return state.map(m =>
        m.id === action.id ? withMemberDefaults({ ...m, ...action.changes }) : m
      )

    case 'DELETE_MEMBER':
      return state.filter(m => m.id !== action.id)

    case 'ADD_POINTS':
      return state.map(m => {
        if (m.id !== action.id) return m
        const isComplete = action.delta > 0 || action.countUp
        return {
          ...m,
          points: m.points + action.delta,
          completedCount: isComplete ? m.completedCount + 1 : m.completedCount,
        }
      })

    case 'COMPLETE_QUEST':
      return state.map(m =>
        m.id === action.memberId
          ? applyQuestCompletion(m, action.task, action.completedAt)
          : m
      )

    case 'SET_WORK_MODE':
      return state.map(m =>
        m.id === action.id ? applyHpRhythm(m, action.mode) : m
      )

    case 'PURCHASE_SHOP_ITEM':
      return state.map(m => {
        if (m.id !== action.memberId) return m
        const item = SHOP_ITEM_MAP[action.itemId]
        if (!item || (m.gold ?? 0) < item.cost) return m
        const inventoryItem = {
          id: crypto.randomUUID(),
          itemId: item.id,
          name: item.name,
          type: item.type,
          unit: item.unit,
          purchasedAt: new Date().toISOString(),
        }
        return withMemberDefaults({
          ...m,
          gold: (m.gold ?? 0) - item.cost,
          inventory: [...(m.inventory ?? []), inventoryItem],
          leaveBalance: item.type === 'leave'
            ? (m.leaveBalance ?? 0) + (item.id === 'half-day' ? 0.5 : 1)
            : (m.leaveBalance ?? 0),
        })
      })

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const TeamContext = createContext(null)

export function TeamProvider({ children }) {
  const [stored, setStored] = useLocalStorage('tpp_members', MOCK_MEMBERS)
  const [members, dispatch] = useReducer(teamReducer, stored, normalizeMembers)

  useEffect(() => {
    setStored(members)
  }, [members]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TeamContext.Provider value={{ members, dispatch }}>
      {children}
    </TeamContext.Provider>
  )
}

// ── Custom Hook ───────────────────────────────────────────────────────────────

export function useTeam() {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam은 TeamProvider 안에서 사용해야 합니다.')
  return ctx
}
