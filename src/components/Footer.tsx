import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { DONATE, SOCIALS } from '../data/site'
import { PRODUCTS } from '../data/products'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/brand/jr-logo.png" alt="JR." width="48" height="48" />
          <p>Software that makes life better, for developers, businesses and everyday people.</p>
          <ul className="footer__social" aria-label="JR. on social media">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                  <Icon name={s.id} size={19} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Products">
          <h2 className="footer__title">Products</h2>
          <ul>
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link to={{ pathname: '/products', hash: `#${p.id}` }}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="footer__title">Company</h2>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/waitlist">Waitlist</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="More">
          <h2 className="footer__title">More</h2>
          <ul>
            <li><Link to="/privacy">Privacy</Link></li>
            <li>
              <a href={DONATE.href} target="_blank" rel="noopener noreferrer">
                {DONATE.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container footer__bar">
        <span>© {new Date().getFullYear()} JR. All rights reserved.</span>
      </div>
    </footer>
  )
}
