/* eslint-disable react-refresh/only-export-components */
// MinuteContext.jsx — minutes 전역 상태 + dispatch
//
// Data Model (Minute):
// {
//   id: string,        // crypto.randomUUID()
//   date: string,      // "YYYY-MM-DD"
//   attendees: string, // 참석자 자유 텍스트 (쉼표 구분)
//   content: string,   // 회의 내용
//   createdAt: string  // ISO 8601
// }
//
// Actions:
//   CREATE_MINUTE { minute }
//   UPDATE_MINUTE { id, changes }
//   DELETE_MINUTE { id }

import { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// ── Reducer ───────────────────────────────────────────────────────────────────

function minuteReducer(state, action) {
  switch (action.type) {
    case 'CREATE_MINUTE':
      // 최신 회의록이 목록 최상단에 오도록 prepend
      return [action.minute, ...state]

    case 'UPDATE_MINUTE':
      return state.map(m =>
        m.id === action.id ? { ...m, ...action.changes } : m
      )

    case 'DELETE_MINUTE':
      return state.filter(m => m.id !== action.id)

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const MinuteContext = createContext(null)

export function MinuteProvider({ children }) {
  const [stored, setStored] = useLocalStorage('tpp_minutes', [])
  const [minutes, dispatch] = useReducer(minuteReducer, stored)

  useEffect(() => {
    setStored(minutes)
  }, [minutes]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MinuteContext.Provider value={{ minutes, dispatch }}>
      {children}
    </MinuteContext.Provider>
  )
}

// ── Custom Hook ───────────────────────────────────────────────────────────────

export function useMinutes() {
  const ctx = useContext(MinuteContext)
  if (!ctx) throw new Error('useMinutes는 MinuteProvider 안에서 사용해야 합니다.')
  return ctx
}
