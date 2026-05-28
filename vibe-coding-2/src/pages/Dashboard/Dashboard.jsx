import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCalendar } from '../../context/CalendarContext'
import { useRaid } from '../../context/RaidContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'
import { getPartyHpSummary, getRaidProgress } from '../../utils/gamification'

const STATUS_LABEL = {
  todo: '대기',
  'in-progress': '진행',
  done: '완료',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { tasks } = useTasks()
  const { members } = useTeam()
  const { events } = useCalendar()
  const { raid } = useRaid()

  const memberById = useMemo(() => new Map(members.map(member => [member.id, member])), [members])

  const counts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] ?? 0) + 1
      return acc
    }, { todo: 0, 'in-progress': 0, done: 0 })
  }, [tasks])

  const quests = useMemo(() => {
    return tasks
      .filter(task => task.status !== 'done')
      .sort((a, b) => {
        const statusRank = { 'in-progress': 0, todo: 1 }
        return (statusRank[a.status] ?? 2) - (statusRank[b.status] ?? 2) ||
          new Date(a.deadline) - new Date(b.deadline)
      })
      .slice(0, 4)
  }, [tasks])

  const upcomingEvents = useMemo(() => {
    const today = toDateKey(new Date())
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => `${a.date}${a.time ?? ''}`.localeCompare(`${b.date}${b.time ?? ''}`))
      .slice(0, 2)
  }, [events])

  const partyHp = useMemo(() => getPartyHpSummary(members), [members])
  const bossPercent = getRaidProgress(raid)

  const contribution = useMemo(() => {
    const totals = new Map()
    for (const entry of raid.log ?? []) {
      const current = totals.get(entry.memberId) ?? {
        memberId: entry.memberId,
        memberName: entry.memberName,
        damage: 0,
      }
      totals.set(entry.memberId, {
        ...current,
        damage: current.damage + (entry.damage ?? 0),
      })
    }
    return [...totals.values()].sort((a, b) => b.damage - a.damage).slice(0, 3)
  }, [raid.log])

  return (
    <section className="dashboard-hud" aria-labelledby="dashboard-heading">
      <header className="hud-header">
        <div>
          <p className="page-eyebrow">MMO Quest Board</p>
          <h1 className="page-title" id="dashboard-heading">오늘의 레이드</h1>
        </div>
        <div className="hud-status-strip">
          {Object.entries(STATUS_LABEL).map(([status, label]) => (
            <button key={status} className="hud-mini-stat" onClick={() => navigate('/app/tasks')}>
              <span>{label}</span>
              <strong>{counts[status] ?? 0}</strong>
            </button>
          ))}
        </div>
      </header>

      <div className="hud-grid">
        <section className="panel raid-stage">
          <div>
            <p className="page-eyebrow">Active Boss</p>
            <h2>{raid.bossName}</h2>
            <p>{raid.name} · {raid.status === 'defeated' ? '토벌 완료' : '전투 중'}</p>
          </div>

          <div className="boss-orb" aria-hidden="true">
            <span />
          </div>

          <div className="raid-bars">
            <StatBar label="Boss HP" value={raid.health} max={raid.maxHealth} percent={bossPercent} color="var(--color-hp)" />
            <StatBar label="Party HP" value={partyHp.current} max={partyHp.max} percent={partyHp.percent} color="var(--color-moss)" />
          </div>

          <div className="raid-contribution">
            <strong>기여도</strong>
            {contribution.length > 0 ? contribution.map(member => (
              <span key={member.memberId}>{member.memberName} DMG {member.damage}</span>
            )) : (
              <span>퀘스트 완료 후 표시됩니다.</span>
            )}
          </div>
        </section>

        <section className="panel hud-card">
          <PanelHead title="퀘스트" action="Tasks" onAction={() => navigate('/app/tasks')} />
          <div className="compact-list">
            {quests.length > 0 ? quests.map(task => (
              <button key={task.id} className="quest-row" onClick={() => navigate('/app/tasks')}>
                <span>
                  <strong>{task.title}</strong>
                  <small>{memberById.get(task.assigneeId)?.name ?? '미배정'} · {formatDateTime(task.deadline)}</small>
                </span>
                <em>DMG {task.damage}</em>
              </button>
            )) : (
              <p className="hud-empty">오늘 처리할 퀘스트가 없습니다.</p>
            )}
          </div>
        </section>

        <section className="panel hud-card party-card">
          <PanelHead title="파티" action="Team" onAction={() => navigate('/app/team')} />
          <div className="party-list">
            {members.slice(0, 4).map(member => (
              <button key={member.id} className="party-row" onClick={() => navigate('/app/team')}>
                <span className="party-avatar">{member.avatarInitials ?? member.name[0]}</span>
                <span className="party-copy">
                  <strong>{member.name} Lv.{member.level}</strong>
                  <small>HP {member.hp}/{member.maxHp} · 신뢰도 {member.reliability}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel hud-card">
          <PanelHead title="전투 로그" action="Log" onAction={() => navigate('/app/tasks')} />
          <div className="compact-list">
            {(raid.log ?? []).slice(0, 3).map(entry => (
              <div key={entry.id} className="log-row">
                <strong>{entry.memberName}</strong>
                <span>{entry.taskTitle}</span>
                <em>Damage {entry.damage}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="panel hud-card">
          <PanelHead title="일정" action="Calendar" onAction={() => navigate('/app/calendar')} />
          <div className="compact-list">
            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
              <button key={event.id} className="quest-row" onClick={() => navigate('/app/calendar')}>
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

function StatBar({ label, value, max, percent, color }) {
  return (
    <div className="statbar">
      <div>
        <span>{label}</span>
        <strong>{value}/{max}</strong>
      </div>
      <i>
        <b style={{ width: `${percent}%`, background: color }} />
      </i>
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
