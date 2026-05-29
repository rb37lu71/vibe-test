// MemberCard.jsx — 팀원 캐릭터 카드
import ClassPortrait from '../ClassPortrait/ClassPortrait'
import { getLevelProgress } from '../../utils/gamification'

export default function MemberCard({ member, rank, onEdit, onDelete, onWorkModeChange }) {
  const {
    id,
    name,
    role,
    points,
    completedCount,
    xp,
    gold,
    hp,
    maxHp,
    reliability,
    workMode,
    className,
    leaveBalance,
  } = member

  const pointColor = points >= 0 ? 'var(--color-primary)' : 'var(--color-danger)'
  const levelProgress = getLevelProgress(xp)

  return (
    <article className="member-profile-card">
      {rank != null && (
        <span className="member-rank-badge">{rank}</span>
      )}

      <ClassPortrait className={className} name={name} size="xl" />

      <div className="member-profile-body">
        <div className="member-profile-head">
          <div>
            <h2>{name}</h2>
            <p>{role}</p>
          </div>
          <strong style={{ color: pointColor }}>{gold ?? 0}G</strong>
        </div>

        <div className="member-stat-stack">
          <MiniBar label="XP" value={levelProgress.current} max={levelProgress.needed} percent={levelProgress.percent} color="var(--color-xp)" />
          <MiniBar label="HP" value={hp ?? 0} max={maxHp ?? 100} percent={Math.round(((hp ?? 0) / (maxHp ?? 100)) * 100)} color="var(--color-hp)" />
          <MiniBar label="신뢰도" value={reliability ?? 0} max={100} percent={reliability ?? 0} color="var(--color-moss)" />
        </div>

        <div className="member-meta-row">
          <span>Lv.{levelProgress.level}</span>
          <span>완료 {completedCount}건</span>
          <span>휴가 {leaveBalance ?? 0}일</span>
        </div>

        <div className="member-action-row">
          {onWorkModeChange && (
            <>
              <button
                onClick={() => onWorkModeChange(id, 'work')}
                className={workMode === 'work' ? 'member-mode active' : 'member-mode'}
              >
                업무
              </button>
              <button
                onClick={() => onWorkModeChange(id, 'rest')}
                className={workMode === 'rest' ? 'member-mode active' : 'member-mode'}
              >
                휴식
              </button>
            </>
          )}
          {onEdit && (
            <button onClick={() => onEdit(member)} className="member-text-action">수정</button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(id)} className="member-text-action">삭제</button>
          )}
        </div>
      </div>
    </article>
  )
}

function MiniBar({ label, value, max, percent, color }) {
  return (
    <div className="member-mini-bar">
      <div>
        <span>{label}</span>
        <strong>{value}/{max}</strong>
      </div>
      <i>
        <b style={{ width: `${percent}%`, background: color }} />
      </i>
    </div>
  )
}
