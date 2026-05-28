// dateUtils.js — 캘린더에서 사용하는 날짜 유틸 함수

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function buildMonthCells(cursor) {
  const first = startOfMonth(cursor)
  const start = new Date(first)
  start.setDate(first.getDate() - first.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return {
      date,
      inMonth: date.getMonth() === cursor.getMonth(),
    }
  })
}

export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDateLabel(dateKey) {
  return new Date(`${dateKey}T00:00:00`).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}
