import { useMemo, useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import FilterBar from '../../components/FilterBar/FilterBar'
import TaskCard from '../../components/TaskCard/TaskCard'
import TaskForm from '../../components/TaskForm/TaskForm'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'

const STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'todo', label: '할 일' },
  { value: 'in-progress', label: '진행 중' },
  { value: 'done', label: '완료' },
]

const STATUS_COLUMNS = [
  { value: 'todo', label: '할 일' },
  { value: 'in-progress', label: '진행 중' },
  { value: 'done', label: '완료' },
]

export default function Tasks() {
  const { tasks, dispatch } = useTasks()
  const { members } = useTeam()
  const [statusFilter, setStatusFilter] = useState('all')
  const [assigneeFilter, setAssigneeFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const assigneeOptions = useMemo(() => [
    { value: 'all', label: '모든 담당자' },
    { value: 'unassigned', label: '미배정' },
    ...members.map(member => ({ value: member.id, label: member.name })),
  ], [members])

  const visibleTasks = useMemo(() => {
    return tasks.filter(task => {
      const statusMatch = statusFilter === 'all' || task.status === statusFilter
      const assigneeMatch =
        assigneeFilter === 'all' ||
        (assigneeFilter === 'unassigned' ? !task.assigneeId : task.assigneeId === assigneeFilter)

      return statusMatch && assigneeMatch
    })
  }, [assigneeFilter, statusFilter, tasks])

  const memberById = useMemo(() => {
    return new Map(members.map(member => [member.id, member]))
  }, [members])

  function handleCreateClick() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function handleSubmit(data) {
    const now = new Date().toISOString()
    if (editingTask) {
      dispatch({
        type: 'UPDATE_TASK',
        id: editingTask.id,
        changes: {
          ...data,
          completedAt: data.status === 'done' ? (editingTask.completedAt ?? now) : null,
        },
      })
    } else {
      dispatch({
        type: 'CREATE_TASK',
        task: {
          id: crypto.randomUUID(),
          ...data,
          createdAt: now,
          completedAt: data.status === 'done' ? now : null,
        },
      })
    }
    setIsFormOpen(false)
    setEditingTask(null)
  }

  function handleDelete(id) {
    if (!confirm('이 할 일을 삭제할까요?')) return
    dispatch({ type: 'DELETE_TASK', id })
  }

  return (
    <section className="page-stack" aria-labelledby="tasks-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Tasks</p>
          <h1 className="page-title" id="tasks-heading">할 일 관리</h1>
          <p className="page-subtitle">
            담당자와 마감일을 기준으로 팀의 작업 흐름을 정리합니다.
          </p>
        </div>
        <button className="primary-button" onClick={handleCreateClick}>새 할 일</button>
      </header>

      <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <FilterBar options={STATUS_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
        <FilterBar options={assigneeOptions} value={assigneeFilter} onChange={setAssigneeFilter} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'var(--spacing-lg)',
          alignItems: 'start',
        }}
      >
        {STATUS_COLUMNS.map(column => {
          const columnTasks = visibleTasks.filter(task => task.status === column.value)
          return (
            <section className="tile" key={column.value} aria-labelledby={`${column.value}-heading`}>
              <h2
                id={`${column.value}-heading`}
                style={{
                  fontSize: 'var(--text-lg)',
                  margin: '0 0 var(--spacing-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-sm)',
                }}
              >
                <span>{column.label}</span>
                <span style={{ color: 'var(--color-ink-tertiary)' }}>{columnTasks.length}</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {columnTasks.length > 0 ? (
                  columnTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      member={memberById.get(task.assigneeId)}
                      onStatusChange={(id, status) => dispatch({ type: 'UPDATE_STATUS', id, status })}
                      onDelete={handleDelete}
                      onEdit={(taskToEdit) => {
                        setEditingTask(taskToEdit)
                        setIsFormOpen(true)
                      }}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon=" "
                    title={`${column.label} 작업 없음`}
                    desc="필터를 바꾸거나 새 할 일을 추가해보세요."
                  />
                )}
              </div>
            </section>
          )
        })}
      </div>

      {isFormOpen && (
        <TaskForm
          initialValues={editingTask}
          members={members}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false)
            setEditingTask(null)
          }}
        />
      )}
    </section>
  )
}
