import { useMemo, useState } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import FilterBar from '../../components/FilterBar/FilterBar'
import MemberCard from '../../components/MemberCard/MemberCard'
import { useTeam } from '../../context/TeamContext'

export default function Team() {
  const { members } = useTeam()
  const [roleFilter, setRoleFilter] = useState('all')

  const roleOptions = useMemo(() => {
    const roles = [...new Set(members.map(member => member.role))].sort()
    return [
      { value: 'all', label: '전체' },
      ...roles.map(role => ({ value: role, label: role })),
    ]
  }, [members])

  const visibleMembers = useMemo(() => {
    return roleFilter === 'all'
      ? members
      : members.filter(member => member.role === roleFilter)
  }, [members, roleFilter])

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
      </header>

      <div className="panel">
        <FilterBar options={roleOptions} value={roleFilter} onChange={setRoleFilter} />
      </div>

      {visibleMembers.length > 0 ? (
        <div className="grid-auto">
          {visibleMembers.map((member, index) => (
            <MemberCard key={member.id} member={member} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="panel">
          <EmptyState
            icon=" "
            title="해당 역할의 팀원이 없습니다"
            desc="필터를 전체로 바꾸면 모든 팀원을 볼 수 있습니다."
          />
        </div>
      )}
    </section>
  )
}
