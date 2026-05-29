// Board.jsx — 칸반 보드 페이지 (/app/board)
// Task 3에서 TaskForm · KanbanBoard · FilterBar · PointToast가 추가된다.

function Board() {
  return (
    <section aria-labelledby="board-heading">
      <h2
        id="board-heading"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-ink)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        태스크 보드
      </h2>

      {/* FilterBar — Task 3에서 구현 */}
      <div
        style={{
          height: '40px',
          backgroundColor: 'var(--color-canvas-parchment)',
          borderRadius: 'var(--rounded-md)',
          marginBottom: 'var(--spacing-lg)',
          display: 'flex',
          alignItems: 'center',
          paddingInline: 'var(--spacing-md)',
          color: 'var(--color-ink-secondary)',
          fontSize: 'var(--text-sm)',
        }}
      >
        FilterBar 자리 — Task 3에서 구현
      </div>

      {/* 칸반 3컬럼 — Task 3에서 구현 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--spacing-lg)',
        }}
      >
        {['To Do', 'In Progress', 'Done'].map(col => (
          <div
            key={col}
            style={{
              backgroundColor: 'var(--color-canvas-parchment)',
              borderRadius: 'var(--rounded-lg)',
              padding: 'var(--spacing-md)',
              minHeight: '300px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-ink)',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              {col}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-secondary)' }}>
              Task 3에서 카드가 추가됩니다.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Board
