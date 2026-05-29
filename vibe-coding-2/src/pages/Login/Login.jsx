import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const initialForm = {
  email: '',
  password: '',
  remember: true,
}

export default function Login() {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const { isAuthenticated, login, loginDemo } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname ?? '/app/dashboard'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const result = login(form)

    if (!result.ok) {
      setError(result.error)
      return
    }

    navigate(from, { replace: true })
  }

  function handleDemoLogin() {
    const result = loginDemo()

    if (result.ok) {
      navigate(from, { replace: true })
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="login-heading">
        <div className="login-art" aria-hidden="true">
          <span>Q</span>
        </div>

        <div className="login-copy">
          <p className="page-eyebrow">Guild Access</p>
          <h1 id="login-heading">길드에 입장하기</h1>
          <p>업무 퀘스트, 파티 상태, 레이드 진행도를 개인 세션으로 이어서 확인합니다.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>이메일</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="guild@team.test"
              autoComplete="email"
            />
          </label>

          <label>
            <span>비밀번호</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="4자 이상"
              autoComplete="current-password"
            />
          </label>

          <label className="login-check">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            <span>이 브라우저에서 로그인 유지</span>
          </label>

          {error && (
            <p className="login-error" role="alert">{error}</p>
          )}

          <button className="primary-button" type="submit">로그인</button>
          <button className="utility-button" type="button" onClick={handleDemoLogin}>데모 계정으로 입장</button>
        </form>

        <div className="login-foot">
          <Link to="/">랜딩으로 돌아가기</Link>
        </div>
      </section>
    </main>
  )
}
