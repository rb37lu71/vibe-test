// App.jsx — 라우터 + Context Provider 조합
//
// Provider 순서: TaskProvider가 가장 안쪽(고빈도 업데이트)
// → TeamProvider → MinuteProvider 순으로 감싼다.
// WHY? Context 분리로 불필요한 리렌더를 줄이기 위함 (Technical Design §8 참고)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { TaskProvider }   from './context/TaskContext'
import { TeamProvider }   from './context/TeamContext'
import { MinuteProvider } from './context/MinuteContext'
import { CalendarProvider } from './context/CalendarContext'
import { RaidProvider } from './context/RaidContext'

import AppLayout    from './components/layout/AppLayout'
import Landing      from './pages/Landing/Landing'
import Dashboard    from './pages/Dashboard/Dashboard'
import Tasks        from './pages/Tasks/Tasks'
import Minutes      from './pages/Minutes/Minutes'
import Leaderboard  from './pages/Leaderboard/Leaderboard'
import Team         from './pages/Team/Team'
import Calendar     from './pages/Calendar/Calendar'

function App() {
  return (
    <MinuteProvider>
      <TeamProvider>
        <TaskProvider>
          <RaidProvider>
            <CalendarProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />

                  <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Navigate to="/app/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="team" element={<Team />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="board" element={<Navigate to="/app/tasks" replace />} />
                    <Route path="minutes" element={<Minutes />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </CalendarProvider>
          </RaidProvider>
        </TaskProvider>
      </TeamProvider>
    </MinuteProvider>
  )
}

export default App
