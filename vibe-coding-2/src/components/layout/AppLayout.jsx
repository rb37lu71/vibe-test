// AppLayout.jsx — /app/* 공통 레이아웃
// AppNav + 메인 콘텐츠 영역으로 구성된다.

import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'

function AppLayout() {
  return (
    <div className="app-shell">
      <AppNav />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
