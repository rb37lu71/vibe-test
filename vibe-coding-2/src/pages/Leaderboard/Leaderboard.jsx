// Leaderboard.jsx — 리더보드 페이지 (/app/leaderboard)
// Task 3 Should Have + Task 4에서 MemberRankCard · 순위 정렬이 추가된다.

function Leaderboard() {
  return (
    <section aria-labelledby="leaderboard-heading">
      <h2
        id="leaderboard-heading"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        🏆 리더보드
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
        포인트 순위는 태스크를 완료하면 여기에 표시됩니다.
        <br />
        팀원 등록 후 태스크를 완료해 보세요.
      </div>
    </section>
  )
}

export default Leaderboard
