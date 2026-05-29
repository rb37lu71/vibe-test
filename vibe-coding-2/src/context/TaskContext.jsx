/* eslint-disable react-refresh/only-export-components */
// TaskContext.jsx — tasks 전역 상태 + dispatch
//
// Data Model (Task):
// {
//   id: string,           // crypto.randomUUID()
//   title: string,
//   assigneeId: string,   // Member.id 참조
//   status: 'todo' | 'in-progress' | 'done',
//   deadline: string,     // ISO 8601 e.g. "2026-06-01T23:59:00"
//   createdAt: string,    // ISO 8601
//   completedAt: string | null
// }
//
// Actions:
//   CREATE_TASK   { task }
//   UPDATE_TASK   { id, changes }
//   UPDATE_STATUS { id, status }   → status가 'done'일 때 completedAt을 기록한다
//   DELETE_TASK   { id }

import { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { MOCK_TASKS } from '../data/mockData'
import { normalizeTasks, withQuestDefaults } from '../utils/gamification'

// ── Reducer ──────────────────────────────────────────────────────────────────

function taskReducer(state, action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return [...state, withQuestDefaults(action.task)]

    case 'UPDATE_TASK':
      return state.map(t =>
        t.id === action.id ? withQuestDefaults({ ...t, ...action.changes }) : t
      )

    case 'UPDATE_STATUS': {
      const now = new Date().toISOString()
      return state.map(t => {
        if (t.id !== action.id) return t
        return {
          ...t,
          status: action.status,
          completedAt: action.status === 'done' ? (t.completedAt ?? now) : null,
        }
      })
    }

    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.id)

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [stored, setStored] = useLocalStorage('tpp_tasks', MOCK_TASKS)
  const [tasks, dispatch] = useReducer(taskReducer, stored, normalizeTasks)

  // tasks가 변경되면 localStorage에 동기화
  // WHY useEffect? useReducer의 새 state를 받아 저장하기 위해
  useEffect(() => {
    setStored(tasks)
  }, [tasks]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

// ── Custom Hook ───────────────────────────────────────────────────────────────

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks는 TaskProvider 안에서 사용해야 합니다.')
  return ctx
}
