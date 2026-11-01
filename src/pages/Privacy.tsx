import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function Privacy() {
  usePageMeta('/privacy')

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <p className="eyebrow">Legal</p>
          <h1>Privacy policy</h1>
          <p className="lead">
            What we collect through jrofficial.org, why we collect it, and the control you have over it.
          </p>
          <p className="legal-date">Last updated 1 November 2026</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow prose">
          <div className="glance" role="note" aria-label="Summary">
            <h2>At a glance</h2>
            <ul>
              <li><strong>No accounts, no ads, no analytics</strong> and no tracking cookies on this site.</li>
              <li>We only receive what you type into the <Link to="/waitlist">waitlist</Link> or <Link to="/contact">contact</Link> forms.</li>
              <li>We never sell your information.</li>
              <li>You can ask us to see, fix or delete your data, or leave the waitlist, whenever you like.</li>
            </ul>
          </div>

          <h2>Who we are</h2>
          <p>
            JR. (“we”, “us”) is a software company. This policy covers the website at jrofficial.org. It does not
            cover our products, which have not launched yet. Each product will have its own privacy information
            when it does.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Waitlist form:</strong> your email address, and, only if you choose to give them, the
              products you are interested in and which description fits you best (developer, business owner or
              everyday user).
            </li>
            <li>
              <strong>Contact form:</strong> your name, your email address and the message you write.
            </li>
            <li>
              <strong>Technical logs:</strong> when you visit, our hosting provider may automatically record
              standard information such as your IP address, browser type, the page requested and the time. This
              is used to keep the site secure and working.
            </li>
          </ul>
          <p>
            We do not ask for anything you do not need to give, and we do not collect payment details, because
            nothing on this site is for sale.
          </p>

          <h2>What we do not do</h2>
          <ul>
            <li>We do not use advertising or analytics services, tracking pixels or fingerprinting.</li>
            <li>We do not set tracking cookies. The site works without storing anything on your device.</li>
            <li>We do not load fonts or scripts from third parties. Everything the page needs comes from this site.</li>
            <li>We do not sell, rent or trade your information.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>Waitlist details are used to email you about JR. launches and important news.</li>
            <li>Contact messages are used to reply to you and to improve what we build.</li>
            <li>Technical logs are used for security, fixing problems and keeping the site reliable.</li>
          </ul>
          <p>
            If you are in the European Economic Area or the United Kingdom, we rely on your consent for the
            waitlist and on our legitimate interest in answering you and keeping the site secure for the rest.
            You can withdraw consent at any time.
          </p>

          <h2>Who else handles it</h2>
          <p>
            We use a small number of service providers to run the site. They process information only to provide
            their service to us:
          </p>
          <ul>
            <li><strong>Form service (Formspree):</strong> receives what you submit through our forms and passes it to us.</li>
            <li><strong>Hosting (Vercel):</strong> delivers the website and keeps the technical logs described above.</li>
          </ul>
          <p>
            These providers may process data in the United States or other countries. We may also share
            information if the law requires it. Links to Discord, GitHub, X, YouTube, Instagram, Reddit and Ko-fi
            lead to other websites that have their own privacy policies.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Waitlist details are kept until you ask us to remove them or until we have finished contacting
            waitlist members about launches. Contact messages are kept only as long as needed to deal with your
            request and for a reasonable time afterwards in case you follow up. Technical logs are kept by our
            hosting provider for a short period under its own policy.
          </p>

          <h2>Your choices and rights</h2>
          <p>You can ask us at any time to:</p>
          <ul>
            <li>tell you what we hold about you and give you a copy,</li>
            <li>correct anything that is wrong,</li>
            <li>delete your information or remove you from the waitlist,</li>
            <li>stop emailing you. We will also make it easy to unsubscribe in every email we send.</li>
          </ul>
          <p>
            Use the <Link to="/contact">contact page</Link> to make a request. We aim to answer within 30 days.
            Depending on where you live, you may also have the right to complain to your local data protection
            authority.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over HTTPS and we keep the information we hold to the minimum above. No system is
            perfectly secure, so please do not send us sensitive information such as passwords or financial
            details through the contact form.
          </p>

          <h2>Children</h2>
          <p>
            This website is not aimed at children under 13, and we do not knowingly collect their information.
            If you believe a child has sent us their details, contact us and we will delete them.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change this policy we will update the date at the top of this page. If a change is significant,
            we will say so on the site or by email to people on the waitlist.
          </p>

          <h2>Questions</h2>
          <p>
            Anything unclear? Ask us through the <Link to="/contact">contact page</Link>. You may also want to
            read our <Link to="/terms">terms of use</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
