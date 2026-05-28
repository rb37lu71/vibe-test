import { useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import MinuteCard from '../../components/MinuteCard/MinuteCard'
import MinuteForm from '../../components/MinuteForm/MinuteForm'
import { useMinutes } from '../../context/MinuteContext'

export default function Minutes() {
  const { minutes, dispatch } = useMinutes()
  const [isFormOpen, setIsFormOpen]     = useState(false)
  const [editingMinute, setEditingMinute] = useState(null)

  function handleOpenAdd() {
    setEditingMinute(null)
    setIsFormOpen(true)
  }

  function handleEdit(minute) {
    setEditingMinute(minute)
    setIsFormOpen(true)
  }

  function handleDelete(id) {
    if (!confirm('이 회의록을 삭제할까요?')) return
    dispatch({ type: 'DELETE_MINUTE', id })
  }

  function handleSubmit(data) {
    if (editingMinute) {
      dispatch({ type: 'UPDATE_MINUTE', id: editingMinute.id, changes: data })
    } else {
      dispatch({
        type: 'CREATE_MINUTE',
        minute: {
          id: crypto.randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        },
      })
    }
    setIsFormOpen(false)
    setEditingMinute(null)
  }

  return (
    <section className="page-stack" aria-labelledby="minutes-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Minutes</p>
          <h1 className="page-title" id="minutes-heading">회의록</h1>
          <p className="page-subtitle">
            팀 회의의 결정 사항과 맥락을 기록하고 언제든 다시 확인할 수 있습니다.
          </p>
        </div>
        <button className="primary-button" onClick={handleOpenAdd}>회의록 추가</button>
      </header>

      {/* 회의록 목록 */}
      {minutes.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {minutes.map(minute => (
            <MinuteCard
              key={minute.id}
              minute={minute}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="panel">
          <EmptyState
            icon="📝"
            title="아직 회의록이 없습니다"
            desc="회의록을 추가하면 날짜 순으로 목록에 표시됩니다."
            action={
              <button className="primary-button" onClick={handleOpenAdd}>
                첫 회의록 작성
              </button>
            }
          />
        </div>
      )}

      {isFormOpen && (
        <MinuteForm
          initialValues={editingMinute}
          onSubmit={handleSubmit}
          onClose={() => { setIsFormOpen(false); setEditingMinute(null) }}
        />
      )}
    </section>
  )
}
