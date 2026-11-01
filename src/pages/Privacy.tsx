import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function Privacy() {
  usePageMeta('Privacy policy', 'How JR. handles the small amount of personal information collected through this website.')

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <p className="eyebrow">Legal</p>
          <h1>Privacy policy</h1>
          <p className="lead">Last updated 31 October 2026.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow prose">
          <h2>The short version</h2>
          <p>
            This website does not have accounts, advertising or analytics, and it sets no tracking cookies.
            The only personal information we receive is what you choose to send us through the waitlist and
            contact forms.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Waitlist:</strong> your email address, and optionally the products you are interested
              in and which description fits you best.
            </li>
            <li>
              <strong>Contact form:</strong> your name, email address and the message you write.
            </li>
            <li>
              <strong>Server logs:</strong> like most websites, our hosting provider may keep standard logs
              such as IP address, browser type and the pages requested, for security and reliability.
            </li>
          </ul>

          <h2>How we use it</h2>
          <p>
            We use waitlist details to email you about JR. launches and news. We use contact messages to reply
            to you. We do not sell your information or use it for advertising.
          </p>

          <h2>Who handles it</h2>
          <p>
            Form submissions are received through a third-party form service, and the site is delivered by a
            hosting provider. They process data on our behalf to run the site. Links to Discord, GitHub, X,
            YouTube and Ko-fi lead to other websites with their own privacy policies.
          </p>

          <h2>Cookies and fonts</h2>
          <p>
            We do not use tracking cookies. Fonts are served from this site, not from a third party.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete what we hold about you, or to remove you from the
            waitlist, at any time through the <Link to="/contact">contact page</Link>.
          </p>

          <h2>Children</h2>
          <p>
            This website is not aimed at children under 13, and we do not knowingly collect their information.
          </p>

          <h2>Changes</h2>
          <p>
            If we change this policy we will update the date above. Material changes will be announced on this
            site.
          </p>
        </div>
      </section>
    </>
  )
}
