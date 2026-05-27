// Landing.jsx — 랜딩 페이지 루트 (/)
// Hero → Problem → Feature → CTA 순서로 섹션을 교차 배치한다.

import HeroSection    from './HeroSection'
import ProblemSection from './ProblemSection'
import FeatureSection from './FeatureSection'
import CTASection     from './CTASection'

function Landing() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <HeroSection />
      <ProblemSection />
      <FeatureSection />
      <CTASection />
    </div>
  )
}

export default Landing
