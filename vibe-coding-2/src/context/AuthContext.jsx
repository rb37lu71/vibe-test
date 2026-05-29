/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const LOCAL_KEY = 'tpp_auth_session'
const SESSION_KEY = 'tpp_auth_session_once'

const demoProfile = {
  id: 'guild-demo-user',
  name: '김철수',
  email: 'guild@team.test',
  role: '길드 리더',
}

function readStoredSession() {
  try {
    const stored = localStorage.getItem(LOCAL_KEY) ?? sessionStorage.getItem(SESSION_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.warn('[AuthContext] 세션 읽기 실패', error)
    return null
  }
}

function createProfile(email) {
  const normalizedEmail = email.trim().toLowerCase()
  const [namePart] = normalizedEmail.split('@')
  const name = namePart
    .split(/[._-]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return {
    id: `user-${normalizedEmail}`,
    name: name || '길드원',
    email: normalizedEmail,
    role: '파티원',
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  function persistSession(nextSession, remember) {
    localStorage.removeItem(LOCAL_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(remember ? LOCAL_KEY : SESSION_KEY, JSON.stringify(nextSession))
  }

  function login({ email, password, remember }) {
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      return { ok: false, error: '이메일과 비밀번호를 입력해주세요.' }
    }

    if (password.length < 4) {
      return { ok: false, error: '비밀번호는 4자 이상 입력해주세요.' }
    }

    const profile = normalizedEmail === demoProfile.email ? demoProfile : createProfile(normalizedEmail)
    const nextSession = {
      user: profile,
      issuedAt: new Date().toISOString(),
    }

    persistSession(nextSession, remember)
    setSession(nextSession)
    return { ok: true }
  }

  function loginDemo() {
    return login({ email: demoProfile.email, password: 'quest', remember: true })
  }

  function logout() {
    localStorage.removeItem(LOCAL_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  const value = {
    isAuthenticated: Boolean(session?.user),
    user: session?.user ?? null,
    login,
    loginDemo,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
