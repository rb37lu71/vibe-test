export const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: '쉬움', xp: 10, gold: 6, damage: 12 },
  { value: 'normal', label: '보통', xp: 25, gold: 14, damage: 28 },
  { value: 'hard', label: '어려움', xp: 45, gold: 24, damage: 50 },
  { value: 'epic', label: '에픽', xp: 80, gold: 42, damage: 90 },
]

export const DIFFICULTY_MAP = Object.fromEntries(
  DIFFICULTY_OPTIONS.map(option => [option.value, option])
)

export function getDifficultyReward(difficulty = 'normal') {
  return DIFFICULTY_MAP[difficulty] ?? DIFFICULTY_MAP.normal
}

export function withQuestDefaults(task = {}) {
  const reward = getDifficultyReward(task.difficulty)
  return {
    ...task,
    difficulty: task.difficulty ?? 'normal',
    xpReward: task.xpReward ?? reward.xp,
    goldReward: task.goldReward ?? reward.gold,
    damage: task.damage ?? reward.damage,
    questId: task.questId ?? 'raid-forest-colossus',
  }
}

export function normalizeTasks(tasks = []) {
  return tasks.map(withQuestDefaults)
}

export function getLevelFromXp(xp = 0) {
  return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 40)) + 1)
}

export function getLevelProgress(xp = 0) {
  const level = getLevelFromXp(xp)
  const levelStart = (level - 1) ** 2 * 40
  const nextLevel = level ** 2 * 40
  const current = Math.max(0, xp - levelStart)
  const needed = Math.max(1, nextLevel - levelStart)
  return {
    level,
    current,
    needed,
    percent: Math.min(100, Math.round((current / needed) * 100)),
  }
}

export function withMemberDefaults(member = {}) {
  const xp = member.xp ?? Math.max(0, (member.completedCount ?? 0) * 30)
  return {
    ...member,
    level: member.level ?? getLevelFromXp(xp),
    xp,
    gold: member.gold ?? Math.max(0, member.points ?? 0),
    hp: member.hp ?? 82,
    maxHp: member.maxHp ?? 100,
    reliability: member.reliability ?? 72,
    workMode: member.workMode ?? 'rest',
    className: member.className ?? 'guildmate',
  }
}

export function normalizeMembers(members = []) {
  return members.map(withMemberDefaults)
}

export function clampStat(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(value)))
}

export function applyHpRhythm(member, mode) {
  const maxHp = member.maxHp ?? 100
  const currentHp = member.hp ?? maxHp
  const delta = mode === 'work' ? -8 : 10
  return {
    ...member,
    workMode: mode,
    hp: clampStat(currentHp + delta, 0, maxHp),
  }
}

export function getReliabilityDelta({ completedAt, deadline, satisfaction = 'positive' } = {}) {
  const completed = completedAt ? new Date(completedAt) : new Date()
  const due = deadline ? new Date(deadline) : null
  const isOnTime = due ? completed <= due : true
  if (!isOnTime) return -2
  return satisfaction === 'low' ? -2 : 1
}

export function applyQuestCompletion(member, task, completedAt = new Date().toISOString()) {
  const reward = getDifficultyReward(task.difficulty)
  const xpGain = task.xpReward ?? reward.xp
  const goldGain = task.goldReward ?? reward.gold
  const nextXp = (member.xp ?? 0) + xpGain
  const reliabilityDelta = getReliabilityDelta({ completedAt, deadline: task.deadline })

  return {
    ...member,
    points: (member.points ?? 0) + goldGain,
    completedCount: (member.completedCount ?? 0) + 1,
    xp: nextXp,
    level: getLevelFromXp(nextXp),
    gold: (member.gold ?? 0) + goldGain,
    reliability: clampStat((member.reliability ?? 72) + reliabilityDelta, 0, 100),
  }
}

export function getPartyHpSummary(members = []) {
  if (members.length === 0) return { current: 0, max: 0, percent: 0 }
  const current = members.reduce((sum, member) => sum + (member.hp ?? 0), 0)
  const max = members.reduce((sum, member) => sum + (member.maxHp ?? 100), 0)
  return {
    current,
    max,
    percent: max > 0 ? Math.round((current / max) * 100) : 0,
  }
}

export function getRaidProgress(raid) {
  if (!raid?.maxHealth) return 0
  return Math.max(0, Math.round(((raid.health ?? 0) / raid.maxHealth) * 100))
}
