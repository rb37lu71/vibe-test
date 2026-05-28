import { useMemo, useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import FilterBar from '../../components/FilterBar/FilterBar'
import MemberCard from '../../components/MemberCard/MemberCard'
import MemberForm from '../../components/MemberForm/MemberForm'
import { useTeam } from '../../context/TeamContext'
import { withMemberDefaults } from '../../utils/gamification'

export default function Team() {
  const { members, dispatch } = useTeam()
  const [roleFilter, setRoleFilter]   = useState('all')
  const [isFormOpen, setIsFormOpen]   = useState(false)
  const [editingMember, setEditingMember] = useState(null)

  const roleOptions = useMemo(() => {
    const roles = [...new Set(members.map(m => m.role))].sort()
    return [
      { value: 'all', label: '전체' },
      ...roles.map(r => ({ value: r, label: r })),
    ]
  }, [members])

  const visibleMembers = useMemo(() =>
    roleFilter === 'all' ? members : members.filter(m => m.role === roleFilter),
    [members, roleFilter]
  )

  function handleOpenAdd() {
    setEditingMember(null)
    setIsFormOpen(true)
  }

  function handleEdit(member) {
    setEditingMember(member)
    setIsFormOpen(true)
  }

  function handleDelete(id) {
    // confirm() 제거 — DeleteConfirmButton이 MemberCard 내에서 인라인 확인 처리
    dispatch({ type: 'DELETE_MEMBER', id })
  }

  function handleSubmit(data) {
    if (editingMember) {
      dispatch({ type: 'UPDATE_MEMBER', id: editingMember.id, changes: data })
    } else {
      dispatch({
        type: 'ADD_MEMBER',
        member: withMemberDefaults({
          id: crypto.randomUUID(),
          ...data,
          avatarInitials: data.name[0],
          points: 0,
          completedCount: 0,
        }),
      })
    }
    setIsFormOpen(false)
    setEditingMember(null)
  }

  function handleWorkModeChange(id, mode) {
    dispatch({ type: 'SET_WORK_MODE', id, mode })
  }

  return (
    <section className="page-stack" aria-labelledby="team-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Team</p>
          <h1 className="page-title" id="team-heading">팀원 소개</h1>
          <p className="page-subtitle">
            역할과 강점을 빠르게 확인하고, 할 일과 일정의 담당자 맥락을 공유합니다.
          </p>
        </div>
        <button className="primary-button" onClick={handleOpenAdd}>팀원 추가</button>
      </header>

      <div className="panel">
        <FilterBar options={roleOptions} value={roleFilter} onChange={setRoleFilter} />
      </div>

      {visibleMembers.length > 0 ? (
        <div className="grid-auto">
          {visibleMembers.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onWorkModeChange={handleWorkModeChange}
            />
          ))}
        </div>
      ) : (
        <div className="panel">
          <EmptyState
            icon="👥"
            title={members.length === 0 ? '아직 팀원이 없습니다' : '해당 역할의 팀원이 없습니다'}
            desc={members.length === 0 ? '팀원 추가 버튼을 눌러 첫 팀원을 등록해보세요.' : '필터를 전체로 바꾸면 모든 팀원을 볼 수 있습니다.'}
            action={
              members.length === 0
                ? <button className="primary-button" onClick={handleOpenAdd}>팀원 추가</button>
                : null
            }
          />
        </div>
      )}

      {isFormOpen && (
        <MemberForm
          initialValues={editingMember}
          onSubmit={handleSubmit}
          onClose={() => { setIsFormOpen(false); setEditingMember(null) }}
        />
      )}
    </section>
  )
}
