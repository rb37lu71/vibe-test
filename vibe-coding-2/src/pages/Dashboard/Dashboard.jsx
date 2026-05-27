import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../../components/EmptyState/EmptyState'
import { useCalendar } from '../../context/CalendarContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'

const STATUS_LABEL = {
  todo: '할 일',
  'in-progress': '진행 중',
  done: '완료',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { tasks } = useTasks()
  const { members } = useTeam()
  const { events } = useCalendar()

  const memberById = useMemo(() => new Map(members.map(member => [member.id, member])), [members])

  const counts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] ?? 0) + 1
      return acc
    }, { todo: 0, 'in-progress': 0, done: 0 })
  }, [tasks])

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(task => task.status !== 'done')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 4)
  }, [tasks])

  const upcomingEvents = useMemo(() => {
    const today = toDateKey(new Date())
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => `${a.date}${a.time ?? ''}`.localeCompare(`${b.date}${b.time ?? ''}`))
      .slice(0, 4)
  }, [events])

  const activeMembers = useMemo(() => {
    return [...members]
      .sort((a, b) => b.completedCount - a.completedCount || b.points - a.points)
      .slice(0, 4)
  }, [members])

  return (
    <section className="page-stack" aria-labelledby="dashboard-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Dashboard</p>
          <h1 className="page-title" id="dashboard-heading">팀 작업 현황</h1>
          <p className="page-subtitle">
            할 일, 팀원, 일정을 한 화면에서 살피고 바로 다음 액션으로 이동합니다.
          </p>
        </div>
      </header>

      <div className="grid-auto">
        {Object.entries(STATUS_LABEL).map(([status, label]) => (
          <button
            className="tile"
            key={status}
            onClick={() => navigate('/app/tasks')}
            style={{ textAlign: 'left' }}
          >
            <span style={{ color: 'var(--color-ink-secondary)', fontSize: 'var(--text-sm)', fontWeight: 700 }}>
              {label}
            </span>
            <strong style={{ display: 'block', color: 'var(--color-ink)', fontSize: 34, marginTop: 6 }}>
              {counts[status] ?? 0}
            </strong>
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'var(--spacing-lg)',
          alignItems: 'start',
        }}
      >
        <SummaryPanel
          title="다가오는 할 일"
          actionLabel="할 일 보기"
          onAction={() => navigate('/app/tasks')}
        >
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map(task => (
              <article className="tile" key={task.id}>
                <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>{task.title}</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--color-ink-secondary)', fontSize: 'var(--text-sm)' }}>
                  {memberById.get(task.assigneeId)?.name ?? '미배정'} · {formatDateTime(task.deadline)}
                </p>
              </article>
            ))
          ) : (
            <EmptyState icon=" " title="예정된 할 일이 없습니다" desc="Tasks에서 새 할 일을 추가하세요." />
          )}
        </SummaryPanel>

        <SummaryPanel
          title="다가오는 일정"
          actionLabel="캘린더 보기"
          onAction={() => navigate('/app/calendar')}
        >
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <article className="tile" key={event.id}>
                <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>
                  {event.time && `${event.time} · `}{event.title}
                </h3>
                <p style={{ margin: '6px 0 0', color: 'var(--color-ink-secondary)', fontSize: 'var(--text-sm)' }}>
                  {formatDate(event.date)}
                  {event.assigneeId && ` · ${memberById.get(event.assigneeId)?.name ?? '담당자'}`}
                </p>
              </article>
            ))
          ) : (
            <EmptyState icon=" " title="다가오는 일정이 없습니다" desc="Calendar에서 일정을 등록하세요." />
          )}
        </SummaryPanel>

        <SummaryPanel
          title="팀 활동"
          actionLabel="팀원 보기"
          onAction={() => navigate('/app/team')}
        >
          {activeMembers.length > 0 ? (
            activeMembers.map(member => (
              <article
                key={member.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md) 0',
                  borderBottom: '1px solid var(--color-hairline)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--rounded-pill)',
                    background: 'var(--color-primary)',
                    color: 'var(--color-canvas)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {member.avatarInitials ?? member.name[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>{member.name}</h3>
                  <p style={{ margin: '4px 0 0', color: 'var(--color-ink-secondary)', fontSize: 'var(--text-sm)' }}>
                    완료 {member.completedCount}건 · {member.points >= 0 ? `+${member.points}` : member.points}pt
                  </p>
                </div>
              </article>
            ))
          ) : (
            <EmptyState icon=" " title="팀원이 없습니다" desc="Team에서 팀원을 확인하세요." />
          )}
        </SummaryPanel>
      </div>
    </section>
  )
}

function SummaryPanel({ title, actionLabel, onAction, children }) {
  return (
    <section className="panel">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>{title}</h2>
        <button className="utility-button" onClick={onAction}>{actionLabel}</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {children}
      </div>
    </section>
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
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
