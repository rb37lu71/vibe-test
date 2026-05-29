import { useMemo, useState } from 'react'
import DeleteConfirmButton from '../../components/DeleteConfirmButton/DeleteConfirmButton'
import EventForm from '../../components/EventForm/EventForm'
import { formatDateLabel, toDateKey } from '../../utils/dateUtils'
import { useCalendar } from '../../context/CalendarContext'
import { useTeam } from '../../context/TeamContext'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const EMPTY_EVENT = { title: '', date: '', time: '', assigneeId: '', description: '' }

export default function Calendar() {
  const { events, dispatch } = useCalendar()
  const { members } = useTeam()
  const [weekCursor, setWeekCursor] = useState(() => new Date())
  const [editingEvent, setEditingEvent] = useState(null)
  const [draftDate, setDraftDate] = useState(() => toDateKey(new Date()))
  const [isFormOpen, setIsFormOpen] = useState(false)

  const todayKey = toDateKey(new Date())
  const weekDays = useMemo(() => buildWeekDays(weekCursor), [weekCursor])
  const weekLabel = `${formatDateLabel(toDateKey(weekDays[0]))} - ${formatDateLabel(toDateKey(weekDays[6]))}`

  const memberById = useMemo(
    () => new Map(members.map(member => [member.id, member])),
    [members]
  )

  const eventsByDate = useMemo(() =>
    events.reduce((acc, event) => {
      acc[event.date] = [...(acc[event.date] ?? []), event]
      return acc
    }, {}),
    [events]
  )

  function moveWeek(delta) {
    setWeekCursor(prev => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + delta * 7)
      return next
    })
  }

  function resetToThisWeek() {
    setWeekCursor(new Date())
  }

  function openCreateForm(date = toDateKey(weekCursor)) {
    setEditingEvent(null)
    setDraftDate(date)
    setIsFormOpen(true)
  }

  function openEditForm(event) {
    setEditingEvent(event)
    setDraftDate(event.date)
    setIsFormOpen(true)
  }

  function handleSubmit(data) {
    const now = new Date().toISOString()
    if (editingEvent) {
      dispatch({ type: 'UPDATE_EVENT', id: editingEvent.id, changes: data })
    } else {
      dispatch({
        type: 'CREATE_EVENT',
        event: { id: crypto.randomUUID(), ...data, createdAt: now },
      })
    }
    setWeekCursor(new Date(`${data.date}T00:00:00`))
    setIsFormOpen(false)
    setEditingEvent(null)
  }

  function handleDelete(id) {
    dispatch({ type: 'DELETE_EVENT', id })
  }

  return (
    <section className="page-stack" aria-labelledby="calendar-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Calendar</p>
          <h1 className="page-title" id="calendar-heading">주간 캘린더</h1>
          <p className="page-subtitle">
            이번 주 회의, 마감, 체크인을 한 화면에서 관리합니다.
          </p>
        </div>
        <button className="primary-button" onClick={() => openCreateForm(todayKey)}>새 일정</button>
      </header>

      <section className="panel weekly-calendar" aria-label={`${weekLabel} 주간 캘린더`}>
        <div className="weekly-calendar-head">
          <button className="utility-button" onClick={() => moveWeek(-1)} aria-label="이전 주">
            이전 주
          </button>
          <div>
            <p className="page-eyebrow">Week</p>
            <h2>{weekLabel}</h2>
          </div>
          <div className="weekly-calendar-actions">
            <button className="utility-button" onClick={resetToThisWeek}>이번 주</button>
            <button className="utility-button" onClick={() => moveWeek(1)} aria-label="다음 주">
              다음 주
            </button>
          </div>
        </div>

        <div className="weekly-calendar-grid">
          {weekDays.map((date, index) => {
            const key = toDateKey(date)
            const dayEvents = [...(eventsByDate[key] ?? [])].sort((a, b) => (a.time || '').localeCompare(b.time || ''))
            const isToday = key === todayKey

            return (
              <article className={isToday ? 'week-day-card today' : 'week-day-card'} key={key}>
                <div className="week-day-head">
                  <span>{WEEKDAYS[index]}</span>
                  <strong>{date.getDate()}</strong>
                </div>

                <div className="week-event-list">
                  {dayEvents.length > 0 ? dayEvents.map(event => {
                    const assignee = memberById.get(event.assigneeId)
                    return (
                      <div className="week-event" key={event.id}>
                        <button onClick={() => openEditForm(event)}>
                          <strong>{event.time && `${event.time} · `}{event.title}</strong>
                          {assignee && <small>담당 {assignee.name}</small>}
                        </button>
                        <DeleteConfirmButton
                          onConfirm={() => handleDelete(event.id)}
                          buttonStyle={weekDeleteStyle}
                        />
                      </div>
                    )
                  }) : (
                    <p className="week-empty">일정 없음</p>
                  )}
                </div>

                <button className="week-add-button" onClick={() => openCreateForm(key)}>
                  일정 추가
                </button>
              </article>
            )
          })}
        </div>
      </section>

      {isFormOpen && (
        <EventForm
          initialValues={editingEvent ?? { ...EMPTY_EVENT, date: draftDate }}
          members={members}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false)
            setEditingEvent(null)
          }}
        />
      )}
    </section>
  )
}

function buildWeekDays(cursor) {
  const start = new Date(cursor)
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - start.getDay())

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
}

const weekDeleteStyle = {
  border: '1px solid var(--color-card-edge)',
  borderRadius: 'var(--rounded-sm)',
  background: 'rgba(255, 250, 240, 0.74)',
  color: 'var(--color-ink)',
  cursor: 'pointer',
  padding: '5px 8px',
  fontSize: 11,
  fontWeight: 900,
}
