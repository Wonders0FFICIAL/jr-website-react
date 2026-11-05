import { Route, Routes } from 'react-router-dom'
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
        <Route path="nook/privacy" element={<NookPrivacy />} />
        <Route path="nook/terms" element={<NookTerms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
