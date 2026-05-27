/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { MOCK_EVENTS } from '../data/mockData'

function calendarReducer(state, action) {
  switch (action.type) {
    case 'CREATE_EVENT':
      return [...state, action.event]

    case 'UPDATE_EVENT':
      return state.map(event =>
        event.id === action.id ? { ...event, ...action.changes } : event
      )

    case 'DELETE_EVENT':
      return state.filter(event => event.id !== action.id)

    default:
      return state
  }
}

const CalendarContext = createContext(null)

export function CalendarProvider({ children }) {
  const [stored, setStored] = useLocalStorage('tpp_events', MOCK_EVENTS)
  const [events, dispatch] = useReducer(calendarReducer, stored)

  useEffect(() => {
    setStored(events)
  }, [events]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CalendarContext.Provider value={{ events, dispatch }}>
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('useCalendar는 CalendarProvider 안에서 사용해야 합니다.')
  return ctx
}
