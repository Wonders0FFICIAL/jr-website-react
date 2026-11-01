import { useRef } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import type { Product } from '../data/products'
import './ProductWindow.css'

/* Illustrative concept screens. None of these are real product screenshots. */

const r = (i: number): CSSProperties => ({ '--i': i } as CSSProperties)

function CodeLine({ n, i, children }: { n: number; i: number; children?: ReactNode }) {
  return (
    <p className="pw__line pw-r" style={r(i)}>
      <span className="pw__ln">{n}</span>
      <span className="pw__src">{children}</span>
    </p>
  )
}

function JunoScreen() {
  return (
    <div className="pw__ide">
      <div className="pw__tabs">
        <span className="is-active">main.juno</span>
        <span>net.juno</span>
        <span>tests.juno</span>
      </div>
      <div className="pw__editor">
        <CodeLine n={1} i={0}><b>use</b> std.http</CodeLine>
        <CodeLine n={2} i={1}><b>fn</b> <em>fetch</em>(url: <u>Str</u>) -&gt; <u>Result</u>&lt;<u>Page</u>&gt; {'{'}</CodeLine>
        <CodeLine n={3} i={2}>{'  '}http.get(url)?</CodeLine>
        <CodeLine n={4} i={3}>{'}'}</CodeLine>
        <CodeLine n={5} i={4}><s>// runs every fetch at once</s></CodeLine>
        <CodeLine n={6} i={5}><b>fn</b> <em>main</em>() {'{'}</CodeLine>
        <CodeLine n={7} i={6}>{'  '}<b>let</b> pages = <em>spawn_all</em>(urls, fetch)</CodeLine>
        <CodeLine n={8} i={7}>{'  '}<b>for</b> page <b>in</b> pages {'{'}</CodeLine>
        <CodeLine n={9} i={8}>{'    '}<em>print</em>(page.title)</CodeLine>
        <CodeLine n={10} i={9}>{'  }'}</CodeLine>
        <CodeLine n={11} i={10}>{'}'}</CodeLine>
      </div>
      <div className="pw__term pw-r" style={r(12)}>
        <p><span className="pw__prompt">$</span> juno run</p>
        <p className="pw__ok">✓ Compiled in 0.31s · native binary · 0 warnings</p>
      </div>
    </div>
  )
}

function AveryScreen() {
  return (
    <div className="pw__chat">
      <p className="pw__bubble pw__bubble--me pw-r" style={r(0)}>Summarise this week’s customer feedback.</p>
      <div className="pw__steps pw-r" style={r(2)}>
        <span>✓ Searched 12 sources</span>
        <span>✓ Read 5 reports</span>
        <span>✓ Wrote summary</span>
      </div>
      <div className="pw__bubble pw__bubble--ai pw-r" style={r(4)}>
        <strong>Customer feedback · this week</strong>
        <ul>
          <li>Faster onboarding is the top request <sup>1</sup></li>
          <li>Small teams want clearer pricing <sup>2</sup></li>
          <li>The new export tool is getting praise <sup>3</sup></li>
        </ul>
        <span className="pw__memory">Remembered: you prefer short summaries</span>
      </div>
      <div className="pw__input pw-r" style={r(6)}>
        <span>Ask Avery anything…</span>
        <i aria-hidden="true">↑</i>
      </div>
    </div>
  )
}

function ForgeScreen() {
  const files = ['App.tsx', 'cart.ts', 'api.ts', 'types.ts', 'utils.ts']
  return (
    <div className="pw__forge">
      <div className="pw__tree">
        <small>src</small>
        {files.map((f) => (
          <span key={f} className={f === 'cart.ts' ? 'is-active' : ''}>{f}</span>
        ))}
      </div>
      <div className="pw__ide">
        <div className="pw__tabs"><span className="is-active">cart.ts</span><span>types.ts</span></div>
        <div className="pw__editor">
          <CodeLine n={1} i={0}><b>import</b> {'{'} Item {'}'} <b>from</b> <q>'./types'</q></CodeLine>
          <CodeLine n={2} i={1}>&nbsp;</CodeLine>
          <CodeLine n={3} i={2}><b>export function</b> <em>cartTotal</em>(items: <u>Item</u>[]) {'{'}</CodeLine>
          <CodeLine n={4} i={3}>{'  '}<b>return</b> items.<em>reduce</em>(</CodeLine>
          <CodeLine n={5} i={4}>
            {'    '}<span className="pw__ghost">(sum, i) =&gt; sum + i.price * i.qty,</span>
            <kbd>Tab</kbd>
          </CodeLine>
          <CodeLine n={6} i={5}>{'    '}<span className="pw__ghost">0</span></CodeLine>
          <CodeLine n={7} i={6}>{'  )'}</CodeLine>
          <CodeLine n={8} i={7}>{'}'}</CodeLine>
        </div>
        <div className="pw__ask pw-r" style={r(9)}>
          <span className="pw__spark">✦</span>
          <span>Add a discount code to this</span>
          <small>Context: 42 files</small>
        </div>
      </div>
    </div>
  )
}

function Spark({ pts }: { pts: number[] }) {
  const max = Math.max(...pts)
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * 64},${22 - (p / max) * 20}`).join(' ')
  return (
    <svg className="pw__spark-svg" viewBox="0 0 64 24" aria-hidden="true">
      <polyline points={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function LapisScreen() {
  const rows = [
    { n: 'web-01', r: 'Frankfurt', c: 34, p: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9] },
    { n: 'db-01', r: 'Frankfurt', c: 61, p: [5, 6, 8, 7, 9, 8, 10, 9, 8, 10] },
    { n: 'worker-02', r: 'Singapore', c: 18, p: [4, 3, 3, 4, 2, 3, 2, 3, 2, 2] },
  ]
  return (
    <div className="pw__dash">
      <div className="pw__dash-head pw-r" style={r(0)}>
        <strong>Servers</strong>
        <span className="pw__btn">+ New server</span>
      </div>
      <div className="pw__stats pw-r" style={r(1)}>
        <div><strong>3</strong><small>Running</small></div>
        <div><strong>8</strong><small>Snapshots</small></div>
        <div><strong>3</strong><small>Firewall rules</small></div>
      </div>
      {rows.map((s, i) => (
        <div className="pw__server pw-r" style={r(i + 2)} key={s.n}>
          <span className="pw__live" />
          <div><strong>{s.n}</strong><small>{s.r}</small></div>
          <Spark pts={s.p} />
          <small className="pw__cpu">{s.c}% CPU</small>
        </div>
      ))}
    </div>
  )
}

function MokaScreen() {
  const tiles = ['Mail', 'Maps', 'Notes', 'News']
  const week = [38, 52, 44, 66, 58, 72, 49]
  return (
    <div className="pw__moka">
      <div className="pw__btabs pw-r" style={r(0)}>
        <span className="is-active">New tab</span>
        <span className="pw__private">Private</span>
        <i>+</i>
      </div>
      <div className="pw__url pw-r" style={r(1)}>
        <span className="pw__lock" />
        <span>Search or enter address</span>
      </div>
      <div className="pw__start">
        <p className="pw__hello pw-r" style={r(2)}>Good evening.</p>
        <div className="pw__search pw-r" style={r(3)}>Search the web privately</div>
        <div className="pw__tiles pw-r" style={r(4)}>
          {tiles.map((t) => (
            <span key={t}><i>{t[0]}</i>{t}</span>
          ))}
        </div>
      </div>
      <div className="pw__week pw-r" style={r(5)}>
        <div>
          <small>Blocked this week</small>
          <strong>1,284</strong>
        </div>
        <div className="pw__bars" aria-hidden="true">
          {week.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
        </div>
      </div>
    </div>
  )
}

const SCREENS: Record<Product['id'], () => ReactNode> = {
  juno: () => <JunoScreen />,
  avery: () => <AveryScreen />,
  forge: () => <ForgeScreen />,
  lapis: () => <LapisScreen />,
  moka: () => <MokaScreen />,
}

/** A concept screen for one product in a window that tilts toward the pointer. */
export function ProductWindow({ product, label = true }: { product: Product; label?: boolean }) {
  const tiltRef = useRef<HTMLDivElement | null>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current
    if (!el || e.pointerType !== 'mouse') return
    const b = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width - 0.5
    const py = (e.clientY - b.top) / b.height - 0.5
    el.style.transform = `rotateX(${-py * 9}deg) rotateY(${px * 12}deg)`
    el.style.setProperty('--sx', `${50 + px * 80}%`)
    el.style.setProperty('--sy', `${50 + py * 80}%`)
  }
  const onLeave = () => {
    const el = tiltRef.current
    if (el) el.style.transform = ''
  }

  return (
    <div className="pw" style={{ '--accent': product.accent } as CSSProperties} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="pw__glow" aria-hidden="true" />
      <div className="pw__tilt" ref={tiltRef}>
        <div className="pw__edge" aria-hidden="true" />
        <div className="pw__window" role="img" aria-label={`Concept preview of ${product.name}`}>
          <div className="pw__bar-top">
            <span className="pw__dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="pw__title">
              <img src={product.logo} alt="" width="16" height="16" />
              {product.name}
            </span>
            <span className="pw__spacer" />
          </div>
          <div className="pw__body" key={product.id}>{SCREENS[product.id]()}</div>
          <span className="pw__sheen" aria-hidden="true" />
        </div>
      </div>
      {label && <p className="pw__note">Concept preview. Not a final design.</p>}
    </div>
  )
}
