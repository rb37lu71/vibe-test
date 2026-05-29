import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import auctionDragonBoss from '../../assets/auction-dragon-boss.png'
import { useAuth } from '../../context/AuthContext'
import { useCalendar } from '../../context/CalendarContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'

const STATUS_LABEL = {
  todo: '대기',
  'in-progress': '진행',
  done: '완료',
}

const STATUS_ORDER = {
  'in-progress': 0,
  todo: 1,
  done: 2,
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { tasks } = useTasks()
  const { events } = useCalendar()
  const { members, dispatch: teamDispatch } = useTeam()

  const currentMember = useMemo(() => {
    return members.find(member => member.name === user?.name) ?? members[0] ?? null
  }, [members, user?.name])

  const counts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] ?? 0) + 1
      return acc
    }, { todo: 0, 'in-progress': 0, done: 0 })
  }, [tasks])

  const taskProgress = tasks.length > 0
    ? Math.round(((counts.done ?? 0) / tasks.length) * 100)
    : 0

  const activeTasks = useMemo(() => {
    return tasks
      .filter(task => task.status !== 'done')
      .sort((a, b) => {
        const aMine = currentMember && a.assigneeId === currentMember.id ? 0 : 1
        const bMine = currentMember && b.assigneeId === currentMember.id ? 0 : 1
        return aMine - bMine ||
          (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9) ||
          new Date(a.deadline) - new Date(b.deadline)
      })
      .slice(0, 5)
  }, [currentMember, tasks])

  const upcomingEvents = useMemo(() => {
    const today = toDateKey(new Date())
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => `${a.date}${a.time ?? ''}`.localeCompare(`${b.date}${b.time ?? ''}`))
      .slice(0, 3)
  }, [events])

  return (
    <section className="quest-dashboard" aria-labelledby="dashboard-heading">
      <header className="quest-dashboard-head">
        <div>
          <p className="page-eyebrow">Project Raid</p>
          <h1 className="page-title" id="dashboard-heading">부동산 경매 사이트 개발</h1>
          <p className="page-subtitle">남은 할 일을 끝내며 용 보스를 공략하는 오늘의 업무 현황입니다.</p>
        </div>
        <button className="primary-button" onClick={() => navigate('/app/tasks')}>할 일 관리</button>
      </header>

      <div className="quest-dashboard-grid">
        <section className="quest-boss-panel panel" aria-label="레이드 보스">
          <div className="quest-boss-copy">
            <span className="quest-boss-label">MONSTER</span>
            <h2>경매 용</h2>
            <p>입찰, 매물, 일정, 인증 작업을 하나씩 처리하면 레이드 진행률이 올라갑니다.</p>
          </div>
          <img src={auctionDragonBoss} alt="부동산 경매 사이트 개발을 상징하는 용 보스" />
        </section>

        <section className="quest-progress-panel panel" aria-label="할 일 진행률">
          <div className="quest-progress-main">
            <span>업무 진행률</span>
            <strong>{taskProgress}%</strong>
          </div>
          <ProgressBar percent={taskProgress} />
          <div className="quest-status-grid">
            {Object.entries(STATUS_LABEL).map(([status, label]) => (
              <button key={status} onClick={() => navigate('/app/tasks')}>
                <span>{label}</span>
                <strong>{counts[status] ?? 0}</strong>
              </button>
            ))}
          </div>
          {currentMember && (
            <div className="quest-work-mode">
              <div>
                <span>내 상태</span>
                <strong>{currentMember.name} · HP {currentMember.hp}/{currentMember.maxHp}</strong>
              </div>
              <div>
                <button
                  className={currentMember.workMode === 'work' ? 'member-mode active' : 'member-mode'}
                  onClick={() => teamDispatch({ type: 'SET_WORK_MODE', id: currentMember.id, mode: 'work' })}
                >
                  업무
                </button>
                <button
                  className={currentMember.workMode === 'rest' ? 'member-mode active' : 'member-mode'}
                  onClick={() => teamDispatch({ type: 'SET_WORK_MODE', id: currentMember.id, mode: 'rest' })}
                >
                  휴식
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="quest-list-panel panel" aria-label="해야 할 일">
          <PanelHead title="내 할 일" action="전체 보기" onAction={() => navigate('/app/tasks')} />
          <div className="quest-list">
            {activeTasks.length > 0 ? activeTasks.map(task => (
              <button key={task.id} className="quest-task-row" onClick={() => navigate('/app/tasks')}>
                <span>
                  <strong>{task.title}</strong>
                  <small>
                    {currentMember && task.assigneeId === currentMember.id ? '내 할 일 · ' : ''}
                    {STATUS_LABEL[task.status]} · {formatDateTime(task.deadline)}
                  </small>
                </span>
                <em>DMG {task.damage}</em>
              </button>
            )) : (
              <p className="hud-empty">남은 할 일이 없습니다.</p>
            )}
          </div>
        </section>

        <section className="quest-schedule-panel panel" aria-label="간단 일정">
          <PanelHead title="간단 일정" action="캘린더" onAction={() => navigate('/app/calendar')} />
          <div className="quest-list">
            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
              <button key={event.id} className="quest-task-row" onClick={() => navigate('/app/calendar')}>
                <span>
                  <strong>{event.title}</strong>
                  <small>{formatDate(event.date)}{event.time && ` · ${event.time}`}</small>
                </span>
              </button>
            )) : (
              <p className="hud-empty">다가오는 일정이 없습니다.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}

function PanelHead({ title, action, onAction }) {
  return (
    <div className="hud-panel-head">
      <h2>{title}</h2>
      <button className="utility-button" onClick={onAction}>{action}</button>
    </div>
  )
}

function ProgressBar({ percent }) {
  return (
    <div className="quest-progress-bar">
      <span style={{ width: `${percent}%` }} />
    </div>
  )
}

function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(dateKey) {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

function formatDateTime(dateTime) {
  return new Date(dateTime).toLocaleString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
