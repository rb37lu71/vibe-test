// FilterBar.jsx — 범용 필터 탭 바
//
// Props:
//   options : { value: string, label: string }[]  — 선택지 목록
//   value   : string                               — 현재 선택값
//   onChange(value): void                          — 선택 변경 콜백
//
// 사용 예:
//   <FilterBar
//     options={[
//       { value: 'all',         label: '전체' },
//       { value: 'todo',        label: '할 일' },
//       { value: 'in-progress', label: '진행 중' },
//       { value: 'done',        label: '완료' },
//     ]}
//     value={filter}
//     onChange={setFilter}
//   />

export default function FilterBar({ options = [], value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
      }}
      role="tablist"
    >
      {options.map(opt => {
        const isActive = opt.value === value
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(opt.value)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--rounded-pill)',
              border: isActive ? 'none' : '1px solid var(--color-hairline)',
              background: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? 'var(--color-canvas)' : 'var(--color-ink-secondary)',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
