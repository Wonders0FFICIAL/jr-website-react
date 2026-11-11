import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Pricing } from './pages/Pricing'
import { Waitlist } from './pages/Waitlist'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { NookPrivacy } from './pages/NookPrivacy'
import { NookTerms } from './pages/NookTerms'
import { NotFound } from './pages/NotFound'
import { DashboardRoot } from './dashboard/DashboardRoot'
import { DashboardHome } from './dashboard/DashboardHome'
import { DashboardCallback } from './dashboard/DashboardCallback'
import { DashboardGuild } from './dashboard/DashboardGuild'
import { DashboardLeveling } from './dashboard/DashboardLeveling'
import { PublicLeaderboard } from './dashboard/PublicLeaderboard'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="waitlist" element={<Waitlist />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="nook" element={<Navigate to="/nook/dashboard" replace />} />
        <Route path="nook/privacy" element={<NookPrivacy />} />
        <Route path="nook/terms" element={<NookTerms />} />
        <Route path="nook/leaderboard/:slug" element={<PublicLeaderboard />} />
        <Route path="nook/dashboard" element={<DashboardRoot />}>
          <Route index element={<DashboardHome />} />
          <Route path="callback" element={<DashboardCallback />} />
          <Route path=":guildId" element={<DashboardGuild />} />
          <Route path=":guildId/leveling" element={<DashboardLeveling />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
