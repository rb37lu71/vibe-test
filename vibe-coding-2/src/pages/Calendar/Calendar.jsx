import { useMemo, useState } from 'react'
import DeleteConfirmButton from '../../components/DeleteConfirmButton/DeleteConfirmButton'
import EmptyState from '../../components/EmptyState/EmptyState'
import EventForm from '../../components/EventForm/EventForm'
import { buildMonthCells, formatDateLabel, toDateKey } from '../../utils/dateUtils'
import { useCalendar } from '../../context/CalendarContext'
import { useTeam } from '../../context/TeamContext'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const EMPTY_EVENT = { title: '', date: '', time: '', assigneeId: '', description: '' }

export default function Calendar() {
  const { events, dispatch } = useCalendar()
  const { members } = useTeam()
  const [cursor, setCursor]           = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()))
  const [editingEvent, setEditingEvent] = useState(null)
  const [isFormOpen, setIsFormOpen]   = useState(false)
  const [hoveredDate, setHoveredDate] = useState(null)

  const cells       = useMemo(() => buildMonthCells(cursor), [cursor])
  const todayKey    = toDateKey(new Date())
  const monthLabel  = `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`

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

  const selectedEvents = [...(eventsByDate[selectedDate] ?? [])]
    .sort((a, b) => (a.time || '').localeCompare(b.time || ''))

  function moveMonth(delta) {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1)
    setCursor(next)
    setSelectedDate(toDateKey(next))
  }

  function openCreateForm(date = selectedDate) {
    setEditingEvent(null)
    setSelectedDate(date)
    setIsFormOpen(true)
  }

  function openEditForm(event) {
    setEditingEvent(event)
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
    setSelectedDate(data.date)
    setIsFormOpen(false)
    setEditingEvent(null)
  }

  function handleDelete(id) {
    // confirm() 제거 — DeleteConfirmButton이 인라인 확인 처리
    dispatch({ type: 'DELETE_EVENT', id })
  }

  return (
    <section className="page-stack" aria-labelledby="calendar-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Calendar</p>
          <h1 className="page-title" id="calendar-heading">일정 캘린더</h1>
          <p className="page-subtitle">
            월간 흐름을 보며 날짜별 회의, 마감, 체크인을 관리합니다.
          </p>
        </div>
        <button className="primary-button" onClick={() => openCreateForm()}>새 일정</button>
      </header>

      <div className="calendar-grid">
        <section className="panel" aria-label={`${monthLabel} 월간 캘린더`}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            <button className="utility-button" onClick={() => moveMonth(-1)} aria-label="이전 달">
              이전
            </button>
            <h2 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>{monthLabel}</h2>
            <button className="utility-button" onClick={() => moveMonth(1)} aria-label="다음 달">
              다음
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 'var(--spacing-xs)',
            }}
          >
            {WEEKDAYS.map(day => (
              <div
                key={day}
                style={{
                  color: 'var(--color-ink-tertiary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  padding: '0 var(--spacing-sm) var(--spacing-xs)',
                }}
              >
                {day}
              </div>
            ))}

            {cells.map(cell => {
              const key       = toDateKey(cell.date)
              const dayEvents = eventsByDate[key] ?? []
              const isSelected = key === selectedDate
              const isToday    = key === todayKey
              const isHovered  = key === hoveredDate

              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(key)}
                  onDoubleClick={() => openCreateForm(key)}
                  onMouseEnter={() => setHoveredDate(key)}
                  onMouseLeave={() => setHoveredDate(null)}
                  title="클릭: 날짜 선택 / 더블클릭: 일정 추가"
                  style={{
                    minHeight: 92,
                    borderRadius: 'var(--rounded-sm)',
                    border: isSelected
                      ? '2px solid var(--color-primary)'
                      : '1px solid var(--color-hairline)',
                    background: isSelected ? 'var(--color-canvas)' : 'var(--color-canvas-parchment)',
                    color: cell.inMonth ? 'var(--color-ink)' : 'var(--color-ink-tertiary)',
                    padding: 'var(--spacing-sm)',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-xs)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      minWidth: 28,
                      height: 28,
                      borderRadius: 'var(--rounded-pill)',
                      background: isToday ? 'var(--color-primary)' : 'transparent',
                      color: isToday ? 'var(--color-canvas)' : 'inherit',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: isToday || isSelected ? 700 : 500,
                    }}
                  >
                    {cell.date.getDate()}
                  </span>

                  {/* hover 시 + 힌트 */}
                  {isHovered && dayEvents.length === 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        right: 8,
                        fontSize: 18,
                        color: 'var(--color-primary)',
                        opacity: 0.5,
                        lineHeight: 1,
                        pointerEvents: 'none',
                      }}
                    >
                      +
                    </span>
                  )}

                  {dayEvents.slice(0, 2).map(event => (
                    <span
                      key={event.id}
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'var(--color-primary)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                      }}
                    >
                      {event.time && `${event.time} `}{event.title}
                    </span>
                  ))}

                  {dayEvents.length > 2 && (
                    <span style={{ color: 'var(--color-ink-tertiary)', fontSize: 'var(--text-xs)' }}>
                      +{dayEvents.length - 2}개 더
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        <aside className="panel" aria-labelledby="selected-date-heading">
          <div className="page-header" style={{ marginBottom: 'var(--spacing-md)' }}>
            <div>
              <p className="page-eyebrow">Selected</p>
              <h2 id="selected-date-heading" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
                {formatDateLabel(selectedDate)}
              </h2>
            </div>
            <button className="utility-button" onClick={() => openCreateForm(selectedDate)}>추가</button>
          </div>

          {selectedEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {selectedEvents.map(event => {
                const assignee = memberById.get(event.assigneeId)
                return (
                  <article className="tile" key={event.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-sm)' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>
                          {event.time && `${event.time} · `}{event.title}
                        </h3>
                        {assignee && (
                          <p style={{ margin: '4px 0 0', color: 'var(--color-ink-secondary)', fontSize: 'var(--text-sm)' }}>
                            담당 {assignee.name}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexShrink: 0 }}>
                        <button style={textButtonStyle} onClick={() => openEditForm(event)}>수정</button>
                        <DeleteConfirmButton
                          onConfirm={() => handleDelete(event.id)}
                          buttonStyle={textButtonStyle}
                        />
                      </div>
                    </div>
                    {event.description && (
                      <p style={{ margin: 'var(--spacing-sm) 0 0', color: 'var(--color-ink-tertiary)', fontSize: 'var(--text-sm)' }}>
                        {event.description}
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon="📅"
              title="선택한 날짜의 일정이 없습니다"
              desc="추가 버튼이나 날짜 더블클릭으로 일정을 등록하세요."
            />
          )}
        </aside>
      </div>

      {isFormOpen && (
        <EventForm
          initialValues={editingEvent ?? { ...EMPTY_EVENT, date: selectedDate }}
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

// ── Styles ────────────────────────────────────────────────────────────────────

const textButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 4px',
  color: 'var(--color-primary)',
  fontSize: 'var(--text-sm)',
  fontWeight: 700,
}
