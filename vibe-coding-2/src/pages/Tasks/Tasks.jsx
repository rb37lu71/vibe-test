import { useMemo, useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import FilterBar from '../../components/FilterBar/FilterBar'
import PointToast from '../../components/PointToast/PointToast'
import TaskCard from '../../components/TaskCard/TaskCard'
import TaskForm from '../../components/TaskForm/TaskForm'
import { useAuth } from '../../context/AuthContext'
import { useRaid } from '../../context/RaidContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'

const STATUS_OPTIONS = [
  { value: 'active',      label: '진행 중인' },  // todo + in-progress (기본)
  { value: 'all',         label: '전체' },
  { value: 'todo',        label: '할 일' },
  { value: 'in-progress', label: '진행 중' },
  { value: 'done',        label: '완료' },
]

const STATUS_COLUMNS = [
  { value: 'todo',        label: '할 일' },
  { value: 'in-progress', label: '진행 중' },
  { value: 'done',        label: '완료' },
]

export default function Tasks() {
  const { tasks, dispatch } = useTasks()
  const { user } = useAuth()
  const { members, dispatch: teamDispatch } = useTeam()
  const { dispatch: raidDispatch } = useRaid()
  const [statusFilter, setStatusFilter]   = useState('active')
  const [assigneeFilter, setAssigneeFilter] = useState('mine')
  const [editingTask, setEditingTask]     = useState(null)
  const [isFormOpen, setIsFormOpen]       = useState(false)
  const [toast, setToast]                 = useState(null)

  const currentMember = useMemo(() => {
    return members.find(member => member.name === user?.name) ?? members[0] ?? null
  }, [members, user?.name])

  const assigneeOptions = useMemo(() => [
    { value: 'mine',       label: '내 할 일' },
    { value: 'all',        label: '전체' },
    { value: 'unassigned', label: '미배정' },
    ...members.map(member => ({ value: member.id, label: member.name })),
  ], [members])

  const visibleTasks = useMemo(() => {
    return tasks.filter(task => {
      const statusMatch =
        statusFilter === 'all'    ? true :
        statusFilter === 'active' ? task.status !== 'done' :
        task.status === statusFilter

      const assigneeMatch =
        assigneeFilter === 'all' ? true :
        assigneeFilter === 'mine' ? (currentMember ? task.assigneeId === currentMember.id : true) :
        (assigneeFilter === 'unassigned'
          ? !task.assigneeId
          : task.assigneeId === assigneeFilter)

      return statusMatch && assigneeMatch
    }).sort((a, b) => {
      const aMine = currentMember && a.assigneeId === currentMember.id ? 0 : 1
      const bMine = currentMember && b.assigneeId === currentMember.id ? 0 : 1
      return aMine - bMine || new Date(a.deadline) - new Date(b.deadline)
    })
  }, [assigneeFilter, currentMember, statusFilter, tasks])

  const memberById = useMemo(
    () => new Map(members.map(member => [member.id, member])),
    [members]
  )

  function completeQuest(task, completedAt = new Date().toISOString()) {
    if (!task?.assigneeId) return
    const member = members.find(m => m.id === task.assigneeId)
    teamDispatch({
      type: 'COMPLETE_QUEST',
      memberId: task.assigneeId,
      task,
      completedAt,
    })
    raidDispatch({
      type: 'APPLY_DAMAGE',
      damage: task.damage,
      logEntry: {
        id: crypto.randomUUID(),
        memberId: task.assigneeId,
        memberName: member?.name ?? '팀원',
        taskTitle: task.title,
        xp: task.xpReward,
        gold: task.goldReward,
        createdAt: completedAt,
      },
    })
    setToast({
      name: member?.name ?? '팀원',
      message: `XP +${task.xpReward} · Gold +${task.goldReward} · Damage ${task.damage}`,
    })
  }

  function handleCreateClick() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function handleSubmit(data) {
    const now = new Date().toISOString()
    if (editingTask) {
      const nextTask = {
        ...editingTask,
        ...data,
        completedAt: data.status === 'done' ? (editingTask.completedAt ?? now) : null,
      }
      dispatch({
        type: 'UPDATE_TASK',
        id: editingTask.id,
        changes: nextTask,
      })
      // 폼을 통해 처음으로 done 처리되는 경우 포인트 부여
      if (data.status === 'done' && editingTask.status !== 'done') {
        completeQuest(nextTask, nextTask.completedAt)
      }
    } else {
      const nextTask = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: now,
        completedAt: data.status === 'done' ? now : null,
      }
      dispatch({
        type: 'CREATE_TASK',
        task: nextTask,
      })
      // 생성 시 바로 done으로 만든 경우 포인트 부여
      if (data.status === 'done') {
        completeQuest(nextTask, now)
      }
    }
    setIsFormOpen(false)
    setEditingTask(null)
  }

  function handleDelete(id) {
    // confirm() 제거 — DeleteConfirmButton이 카드 내에서 인라인 확인 처리
    dispatch({ type: 'DELETE_TASK', id })
  }

  // 포인트 로직: 카드 버튼으로 done 처리 시
  function handleStatusChange(id, status) {
    const task = tasks.find(t => t.id === id)
    const completedAt = new Date().toISOString()
    dispatch({ type: 'UPDATE_STATUS', id, status })
    if (status !== 'done' || !task || task.status === 'done') return
    completeQuest({ ...task, status, completedAt }, completedAt)
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
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                      onEdit={(taskToEdit) => {
                        setEditingTask(taskToEdit)
                        setIsFormOpen(true)
                      }}
                    />
                  ))
                ) : (
                  <EmptyState
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

      {toast && (
        <PointToast
          name={toast.name}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </section>
  )
}
