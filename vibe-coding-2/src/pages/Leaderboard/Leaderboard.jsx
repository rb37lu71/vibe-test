import { useMemo } from 'react'
import EmptyState from '../../components/EmptyState/EmptyState'
import MemberCard from '../../components/MemberCard/MemberCard'
import { useTeam } from '../../context/TeamContext'

export default function Leaderboard() {
  const { members } = useTeam()

  // 포인트 내림차순 정렬
  const ranked = useMemo(() =>
    [...members].sort((a, b) => b.points - a.points),
    [members]
  )

  // 통계 계산
  const totalPoints = members.reduce((sum, m) => sum + (m.points > 0 ? m.points : 0), 0)
  const totalCompleted = members.reduce((sum, m) => sum + m.completedCount, 0)
  const topMember = ranked[0]

  return (
    <section className="page-stack" aria-labelledby="leaderboard-heading">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Leaderboard</p>
          <h1 className="page-title" id="leaderboard-heading">리더보드</h1>
          <p className="page-subtitle">
            태스크를 기한 내 완료하면 +10pt, 기한 초과 완료는 −5pt입니다.
          </p>
        </div>
      </header>

      {/* 팀 전체 요약 */}
      {members.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--spacing-lg)',
          }}
        >
          {[
            { label: '팀 총 포인트', value: `${totalPoints}pt`, icon: '🏅' },
            { label: '완료한 태스크', value: `${totalCompleted}건`, icon: '✅' },
            { label: '팀원 수',       value: `${members.length}명`, icon: '👥' },
          ].map(stat => (
            <div
              key={stat.label}
              className="panel"
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: 28 }}>{stat.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-primary)', margin: '4px 0 2px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-ink-tertiary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* 1위 하이라이트 */}
      {topMember && (
        <div
          className="panel"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-canvas-parchment) 100%)',
            borderColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-lg)',
          }}
        >
          <span style={{ fontSize: 36 }}>🥇</span>
          <div>
            <div style={{ fontSize: 12, color: 'var(--color-canvas)', opacity: 0.8, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              1위
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-canvas)' }}>
              {topMember.name}
            </div>
            <div style={{ fontSize: 14, color: 'var(--color-canvas)', opacity: 0.85 }}>
              {topMember.points >= 0 ? '+' : ''}{topMember.points}pt · 완료 {topMember.completedCount}건
            </div>
          </div>
        </div>
      )}

      {/* 전체 순위 */}
      {ranked.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {ranked.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              rank={index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="panel">
          <EmptyState
            icon="🏆"
            title="아직 포인트 기록이 없습니다"
            desc="태스크를 완료하면 여기에 순위가 표시됩니다."
          />
        </div>
      )}
    </section>
  )
}
