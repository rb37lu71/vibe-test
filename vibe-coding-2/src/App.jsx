// App.jsx — 라우터 + Context Provider 조합
//
// Provider 순서: TaskProvider가 가장 안쪽(고빈도 업데이트)
// → TeamProvider → MinuteProvider 순으로 감싼다.
// WHY? Context 분리로 불필요한 리렌더를 줄이기 위함 (Technical Design §8 참고)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { TaskProvider }   from './context/TaskContext'
import { TeamProvider }   from './context/TeamContext'
import { MinuteProvider } from './context/MinuteContext'

import AppLayout    from './components/layout/AppLayout'
import Landing      from './pages/Landing/Landing'
import Board        from './pages/Board/Board'
import Minutes      from './pages/Minutes/Minutes'
import Leaderboard  from './pages/Leaderboard/Leaderboard'
import Team         from './pages/Team/Team'

function App() {
  return (
    <MinuteProvider>
      <TeamProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              {/* 랜딩 페이지 */}
              <Route path="/" element={<Landing />} />

              {/* /app/* — AppLayout(탭 네비게이션)으로 감싼 앱 영역 */}
              <Route path="/app" element={<AppLayout />}>
                {/* /app 접속 시 /app/board로 리다이렉트 */}
                <Route index element={<Navigate to="/app/board" replace />} />
                <Route path="board"       element={<Board />} />
                <Route path="minutes"     element={<Minutes />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="team"        element={<Team />} />
              </Route>

              {/* 정의되지 않은 경로는 Landing으로 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </TeamProvider>
    </MinuteProvider>
  )
}

export default App
