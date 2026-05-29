export const SHOP_ITEMS = [
  {
    id: 'half-day',
    name: '반차권',
    type: 'leave',
    cost: 40,
    unit: '0.5일',
    desc: '오전이나 오후를 회복 시간으로 예약합니다.',
  },
  {
    id: 'full-day',
    name: '월차권',
    type: 'leave',
    cost: 120,
    unit: '1일',
    desc: '업무 레이드에서 하루 빠져 재정비합니다.',
  },
  {
    id: 'focus-shield',
    name: '집중 보호막',
    type: 'boost',
    cost: 45,
    unit: '2시간',
    desc: '회의와 알림을 줄이는 집중 시간을 요청합니다.',
  },
  {
    id: 'snack-ticket',
    name: '간식 보급권',
    type: 'perk',
    cost: 25,
    unit: '1회',
    desc: '작은 보상으로 다음 퀘스트를 가볍게 시작합니다.',
  },
]

export const SHOP_ITEM_MAP = Object.fromEntries(
  SHOP_ITEMS.map(item => [item.id, item])
)
