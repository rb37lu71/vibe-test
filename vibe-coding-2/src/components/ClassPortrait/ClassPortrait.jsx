import portraitSheet from '../../assets/class-portraits-sheet-v2.png'
import { CLASS_META } from '../../data/classMeta'

export default function ClassPortrait({ className = 'guildmate', name, size = 'md' }) {
  const meta = CLASS_META[className] ?? CLASS_META.guildmate
  return (
    <span
      className={`class-portrait class-portrait--${size}`}
      aria-label={`${name ?? '팀원'} ${meta.label}`}
      role="img"
      style={{
        backgroundImage: `url(${portraitSheet})`,
        backgroundPosition: meta.position,
      }}
      title={meta.label}
    />
  )
}
