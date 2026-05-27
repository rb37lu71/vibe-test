// Team.jsx — 팀원 관리 페이지 (/app/team)
// Task 3에서 MemberForm · MemberCard · MemberList가 추가된다.

function Team() {
  return (
    <section aria-labelledby="team-heading">
      <h2
        id="team-heading"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        👥 팀원 관리
      </h2>

      <div
        style={{
          backgroundColor: 'var(--color-canvas-parchment)',
          borderRadius: 'var(--rounded-lg)',
          padding: 'var(--spacing-xl)',
          textAlign: 'center',
          color: 'var(--color-ink-secondary)',
          fontSize: 'var(--text-sm)',
        }}
      >
        팀원 등록 · 관리 기능은 Task 3에서 구현됩니다.
      </div>
    </section>
  )
}

export default Team
