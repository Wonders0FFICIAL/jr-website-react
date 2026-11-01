import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import './Content.css'

export function Terms() {
  usePageMeta('/terms')

  return (
    <>
      <section className="page-head">
        <div className="container narrow">
          <p className="eyebrow">Legal</p>
          <h1>Terms of use</h1>
          <p className="lead">The ground rules for using jrofficial.org and joining our waitlist.</p>
          <p className="legal-date">Last updated 1 November 2026</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container narrow prose">
          <h2>1. Agreeing to these terms</h2>
          <p>
            By using this website you agree to these terms. If you do not agree, please do not use the site.
            These terms cover the website only. Each JR. product will have its own terms when it launches.
          </p>

          <h2>2. About this website</h2>
          <p>
            JR. is a software company. This website tells you about the products we are building and lets you
            join a waitlist or contact us. All five products shown here are in development. Descriptions,
            features, names, screens and release plans are illustrative, may change, and are not a promise that
            any product will be released, or released in a particular form or on a particular date.
          </p>

          <h2>3. The waitlist</h2>
          <ul>
            <li>Joining the waitlist is free and creates no obligation for you or for us.</li>
            <li>It does not guarantee access to any product, early access, or any benefit.</li>
            <li>You can leave at any time by asking us through the <Link to="/contact">contact page</Link>.</li>
            <li>Please only give us an email address that belongs to you.</li>
          </ul>

          <h2>4. Using the site responsibly</h2>
          <p>You agree not to:</p>
          <ul>
            <li>break the law or infringe anyone’s rights while using the site,</li>
            <li>send spam, malware or anything abusive, misleading or harmful through our forms,</li>
            <li>try to disrupt, probe or gain unauthorised access to the site or its systems,</li>
            <li>scrape the site at a rate that affects other visitors, or pretend to be someone else.</li>
          </ul>
          <p>We may block access to anyone who breaks these rules.</p>

          <h2>5. Ownership</h2>
          <p>
            The JR. name and logo, the names and logos of our products, and the design, text and code of this
            site belong to JR. unless stated otherwise. You may view the site and share links to it. You may not
            copy or reuse our branding or content in a way that suggests it comes from or is endorsed by us
            without our written permission. Other companies’ names and logos that appear on the site belong to
            their owners.
          </p>

          <h2>6. Your feedback</h2>
          <p>
            If you send us ideas, suggestions or feedback, you agree that we may use them to improve our products
            and services without owing you anything. We will not publish your name or message without asking you.
          </p>

          <h2>7. Other websites</h2>
          <p>
            The site links to services we do not control, such as Discord, GitHub, X, YouTube, Instagram, Reddit
            and Ko-fi. We are not responsible for their content or practices, and your use of them is covered by
            their own terms.
          </p>

          <h2>8. No warranties</h2>
          <p>
            We work to keep the site accurate and available, but it is provided “as is” and “as available”. To
            the fullest extent the law allows, we do not promise that it will be error-free, uninterrupted, or
            that the information on it is complete or up to date.
          </p>

          <h2>9. Limits on our liability</h2>
          <p>
            To the fullest extent the law allows, JR. is not liable for any indirect, incidental or
            consequential loss arising from your use of, or inability to use, this website. Nothing in these
            terms limits liability that cannot be limited by law, such as for fraud or for death or personal
            injury caused by negligence.
          </p>

          <h2>10. Privacy</h2>
          <p>
            How we handle your personal information is explained in our <Link to="/privacy">privacy policy</Link>.
          </p>

          <h2>11. Changes</h2>
          <p>
            We may update the site and these terms from time to time. When we change them, we will update the
            date at the top of this page. Continuing to use the site after a change means you accept the updated
            terms.
          </p>

          <h2>12. Governing law</h2>
          <p>
            These terms are governed by the laws that apply where JR. operates. If a dispute cannot be settled
            informally, the courts of that place will have jurisdiction, unless your local consumer law gives you
            the right to bring a claim elsewhere.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms? Reach us through the <Link to="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
