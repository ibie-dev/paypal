import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { MatchesSection } from '@/components/matches-section'
import { HowItWorks } from '@/components/how-it-works'
import { ArenasSection } from '@/components/arenas-section'
import { OpenChallengeCta } from '@/components/open-challenge-cta'
import { TournamentsSection } from '@/components/tournaments-section'
import { PlayersSection } from '@/components/players-section'
import { StoreSection } from '@/components/store-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MatchesSection />
        <HowItWorks />
        <ArenasSection />
        <OpenChallengeCta />
        <TournamentsSection />
        <PlayersSection />
        <StoreSection />
        </main>
      <SiteFooter />
    </>
  )
}
