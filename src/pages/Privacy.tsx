import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import type { LegalSection } from '../components/LegalPage'
import { usePageMeta } from '../hooks/usePageMeta'

const SECTIONS: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    content: (
      <>
        <p>
          JR. (“we”, “us”) is a software company. This policy covers the website at jrofficial.org. It does not
          cover our products, which have not launched yet. Each product will have its own privacy information
          when it does.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    content: (
      <>
        <table className="legal__table">
          <thead>
            <tr><th>Where</th><th>What</th><th>Why</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Waitlist form</td>
              <td data-label="What">
                Your email address. Optionally, the products you are interested in and whether you are a
                developer, business owner or everyday user.
              </td>
              <td data-label="Why">To email you about launches and news</td>
            </tr>
            <tr>
              <td>Contact form</td>
              <td data-label="What">Your name, email address and message</td>
              <td data-label="Why">To reply to you</td>
            </tr>
            <tr>
              <td>Technical logs</td>
              <td data-label="What">
                IP address, browser type, page requested and time, recorded automatically by our hosting provider
              </td>
              <td data-label="Why">Security and keeping the site working</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not collect payment details, because nothing on this site is for sale, and we do not ask for
          anything you do not need to give.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-dont-do',
    title: 'What we do not do',
    content: (
      <>
        <ul>
          <li>We do not use advertising or analytics services, tracking pixels or fingerprinting.</li>
          <li>We do not set tracking cookies. The site works without storing anything on your device.</li>
          <li>We do not load fonts or scripts from third parties. Everything the page needs comes from this site.</li>
          <li><strong>We do not sell, rent or trade your information.</strong></li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    content: (
      <>
        <ul>
          <li>Waitlist details are used to email you about JR. launches and important news.</li>
          <li>Contact messages are used to reply to you and to improve what we build.</li>
          <li>Technical logs are used for security, fixing problems and keeping the site reliable.</li>
        </ul>
        <p className="legal__note">
          If you are in the European Economic Area or the United Kingdom, we rely on your consent for the
          waitlist, and on our legitimate interest in answering you and keeping the site secure for the rest.
          You can withdraw consent at any time.
        </p>
      </>
    ),
  },
  {
    id: 'who-else-handles-it',
    title: 'Who else handles it',
    content: (
      <>
        <p>We use two service providers to run the site. They process information only to provide their service to us.</p>
        <table className="legal__table">
          <thead>
            <tr><th>Provider</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Formspree</td>
              <td data-label="What it does">Receives what you submit through our forms and passes it to us</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td data-label="What it does">Delivers the website and keeps the technical logs described above</td>
            </tr>
          </tbody>
        </table>
        <p>
          These providers may process data in the United States or other countries. We may also share
          information if the law requires it. Links to Discord, GitHub, X, YouTube, Instagram, Reddit and Ko-fi
          lead to other websites that have their own privacy policies.
        </p>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    content: (
      <>
        <p>
          Waitlist details are kept until you ask us to remove them, or until we have finished contacting
          waitlist members about launches. Contact messages are kept only as long as needed to deal with your
          request, and for a reasonable time afterwards in case you follow up. Technical logs are kept by our
          hosting provider for a short period under its own policy.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    content: (
      <>
        <p>You can ask us at any time to:</p>
        <ul className="legal__cards">
          <li><strong>Show you</strong>what we hold about you, with a copy.</li>
          <li><strong>Correct it</strong>if anything is wrong.</li>
          <li><strong>Delete it</strong>or remove you from the waitlist.</li>
          <li><strong>Stop emailing you</strong>and we will make it easy to unsubscribe in every email.</li>
        </ul>
        <p>
          Use the <Link to="/contact">contact page</Link> to make a request. We aim to answer within 30 days.
          Depending on where you live, you may also have the right to complain to your local data protection
          authority.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <>
        <p>
          The site is served over HTTPS and we keep the information we hold to the minimum above. No system is
          perfectly secure, so please do not send us sensitive information such as passwords or financial
          details through the contact form.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <>
        <p>
          This website is not aimed at children under 13, and we do not knowingly collect their information. If
          you believe a child has sent us their details, contact us and we will delete them.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: (
      <>
        <p>
          If we change this policy we will update the date at the top of this page. If a change is significant,
          we will say so on the site, or by email to people on the waitlist.
        </p>
      </>
    ),
  },
]

export function Privacy() {
  usePageMeta('/privacy')

  return (
    <LegalPage
      title="Privacy policy"
      lead="What we collect through jrofficial.org, why we collect it, and the control you have over it."
      updated="1 November 2026"
      readMinutes={4}
      summary={{
        heading: 'The short version',
        points: [
          'No accounts, no ads, no analytics and no tracking cookies.',
          'We only receive what you type into our waitlist and contact forms.',
          'We never sell your information.',
          'You can ask us to show, fix or delete your data at any time.',
        ],
      }}
      sections={SECTIONS}
      other={{ to: '/terms', label: 'Terms of use', blurb: 'The ground rules for using this site.' }}
    />
  )
}