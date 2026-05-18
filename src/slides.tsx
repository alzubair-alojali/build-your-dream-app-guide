import type { CSSProperties, ReactNode } from 'react'

/* ------------------------------------------------------------
   Reusable primitives
------------------------------------------------------------ */

type AnnoColor = 'blue' | 'red' | 'yellow' | 'green'

function Anno({
  label,
  number,
  color = 'blue',
  style,
}: {
  label: string
  number: number | string
  color?: AnnoColor
  style: CSSProperties
}) {
  return (
    <span className={`anno ${color}`} style={style}>
      <span className="arrow">{number}</span>
      {label}
    </span>
  )
}

function Shot({
  src,
  alt,
  children,
}: {
  src: string
  alt: string
  children?: ReactNode
}) {
  return (
    <div className="screenshot">
      <img src={src} alt={alt} loading="lazy" />
      {children}
    </div>
  )
}

function Eyebrow({ children, color = 'blue' as AnnoColor }: { children: ReactNode; color?: AnnoColor }) {
  const colorMap: Record<AnnoColor, string> = {
    blue: 'var(--gdg-blue)',
    red: 'var(--gdg-red)',
    yellow: '#8a6700',
    green: 'var(--gdg-green)',
  }
  const dotColor: Record<AnnoColor, string> = {
    blue: 'var(--gdg-blue)',
    red: 'var(--gdg-red)',
    yellow: 'var(--gdg-yellow)',
    green: 'var(--gdg-green)',
  }
  return (
    <span className="eyebrow" style={{ color: colorMap[color] }}>
      <span className="dot" style={{ background: dotColor[color], boxShadow: `0 0 0 4px ${dotColor[color]}26` }} />
      {children}
    </span>
  )
}

function StepHeader({
  step,
  color,
  title,
  lede,
}: {
  step: number
  color: AnnoColor
  title: string
  lede?: ReactNode
}) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span className={`step-num ${color}`}>{step}</span>
        <Eyebrow color={color}>Step {step}</Eyebrow>
      </div>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  )
}

/* ------------------------------------------------------------
   Slide components
------------------------------------------------------------ */

function CoverSlide() {
  return (
    <div className="cover">
      <div>
        <Eyebrow color="red">GDG · Day 1 of 2</Eyebrow>
        <h1 style={{ marginTop: 14 }}>
          Build your <span className="accent-1">dream</span>{' '}
          <span className="accent-2">app</span>{' '}
          <span className="accent-3">with</span>{' '}
          <span className="accent-4">AI.</span>
        </h1>
        <p className="lede" style={{ marginTop: 18 }}>
          Today is design day — no code, no laptop required. We'll shape your app's design system
          with <strong>Specflow</strong>, then generate the UI with <strong>Google Stitch</strong>.
          Tomorrow we build it for real.
        </p>
        <div className="cover__meta">
          <span className="chip blue">No laptop needed today</span>
          <span className="chip yellow">Bring it tomorrow</span>
          <span className="chip green">~90 min walkthrough</span>
        </div>
        <div className="kbd-row" style={{ marginTop: 24 }}>
          Navigate <kbd>←</kbd> <kbd>→</kbd> or swipe · Press <kbd>Space</kbd> to advance
        </div>
      </div>
      <div className="orbit" aria-hidden="true">
        <div className="orbit__ring" />
        <div className="orbit__ring r2" />
        <div className="orbit__ring r3" />
        <span className="orbit__dot b" />
        <span className="orbit__dot r" />
        <span className="orbit__dot y" />
        <span className="orbit__dot g" />
        <div className="orbit__center">
          <img src="/images/gdg-logo.png" alt="" />
        </div>
      </div>
    </div>
  )
}

function AgendaSlide() {
  return (
    <>
      <header>
        <Eyebrow>Today's plan</Eyebrow>
        <h2 style={{ marginTop: 10 }}>Three moves to a full UI design.</h2>
        <p className="lede" style={{ marginTop: 12 }}>
          No code yet. We design the system, write the content, and generate the screens — all from
          a browser.
        </p>
      </header>
      <div className="row cols-3">
        <div className="card card--accent">
          <span className="step-num">1</span>
          <h3 style={{ marginTop: 14 }}>Design system in Specflow</h3>
          <p>Pick your app type, palette, motion, then answer a short brief.</p>
        </div>
        <div className="card card--red">
          <span className="step-num red">2</span>
          <h3 style={{ marginTop: 14 }}>Content prompt from Gemini</h3>
          <p>Feed Specflow's brief to any AI to draft section-by-section copy for Stitch.</p>
        </div>
        <div className="card card--green">
          <span className="step-num green">3</span>
          <h3 style={{ marginTop: 14 }}>Generate UI in Stitch</h3>
          <p>Drop in <code>design.md</code> + <code>skill.md</code>, paste content, generate, iterate.</p>
        </div>
      </div>
      <div className="note">
        <strong>Heads up:</strong>&nbsp;Tomorrow is the real coding day. You'll need a laptop with
        Node.js and Google Antigravity installed — links on the last slide.
      </div>
    </>
  )
}

function ToolsSlide() {
  return (
    <>
      <header>
        <Eyebrow color="yellow">The two tools</Eyebrow>
        <h2 style={{ marginTop: 10 }}>One opens the conversation. The other paints the screen.</h2>
      </header>
      <div className="row cols-2">
        <div className="tool">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="logo">
              <img src="/images/specflow.svg" alt="Specflow" />
            </div>
            <div>
              <h3>Specflow</h3>
              <span className="chip blue">Design brief generator</span>
            </div>
          </div>
          <p>
            A conversation that ends with a working spec. You pick options (type, palette, motion)
            and answer a short brief — Specflow exports the spec as <code>design.md</code>,{' '}
            <code>skill.md</code>, <code>code.md</code>.
          </p>
          <a className="link" href="https://specflow-six.vercel.app/" target="_blank" rel="noreferrer">
            https://specflow-six.vercel.app/
          </a>
          <a className="btn" href="https://specflow-six.vercel.app/" target="_blank" rel="noreferrer">
            Open Specflow →
          </a>
        </div>
        <div className="tool">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="logo">
              <img src="/images/stitch.png" alt="Stitch" />
            </div>
            <div>
              <h3>Google Stitch</h3>
              <span className="chip green">UI generator</span>
            </div>
          </div>
          <p>
            Drag your Specflow files in, paste a content prompt, hit generate. Stitch lays out the
            screens — you keep chatting with it to refine.
          </p>
          <a className="link" href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer">
            https://stitch.withgoogle.com/
          </a>
          <a className="btn green" href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer">
            Open Stitch →
          </a>
        </div>
      </div>
    </>
  )
}

function Step1Slide() {
  return (
    <>
      <StepHeader
        step={1}
        color="blue"
        title="Open Specflow."
        lede={
          <>
            Head to <a href="https://specflow-six.vercel.app/" target="_blank" rel="noreferrer">specflow-six.vercel.app</a>. You can switch between
            English and العربية from the top-right toggle at any time.
          </>
        }
      />
      <Shot src="/screens/image_1779129587025.png" alt="Specflow homepage">
        <Anno
          number={1}
          label="Click ‘Start the conversation’"
          color="blue"
          style={{ top: '52%', left: '4%' }}
        />
        <Anno
          number={2}
          label="Or claim a free Google AI credit first"
          color="yellow"
          style={{ top: '70%', left: '4%' }}
        />
        <Anno number="EN/AR" label="Language toggle" color="red" style={{ top: '4%', right: '6%' }} />
      </Shot>
    </>
  )
}

function Step2Slide() {
  return (
    <>
      <StepHeader
        step={2}
        color="yellow"
        title="Claim a free Google AI credit."
        lede="Three single-use credits, $5 each. First click wins. Opens in a new tab — sign in with Google to claim, then come back."
      />
      <div className="row cols-2">
        <Shot src="/screens/image_1779129598217.png" alt="Three Google AI credits dropdown">
          <Anno
            number={1}
            label="Click ‘Claim’ on any unused credit"
            color="green"
            style={{ top: '46%', right: '4%' }}
          />
        </Shot>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card card--yellow">
            <h3>What you get</h3>
            <ul className="list-checks">
              <li>$5 Google AI credit, one click to claim.</li>
              <li>Works with Gemini and Stitch for today's flow.</li>
              <li>Tied to your Google account — keep the same login through the day.</li>
            </ul>
          </div>
          <div className="note blue">
            <strong>Tip:</strong>&nbsp;Don't burn all three. One credit covers today's design pass with
            room to spare.
          </div>
        </div>
      </div>
    </>
  )
}

function Step3Slide() {
  return (
    <>
      <StepHeader
        step={3}
        color="blue"
        title="Pick what you're building."
        lede="Portfolio, Landing page, Dashboard, or Documentation site. For today's workshop, Landing page is the easiest to ship — but pick what fits your dream."
      />
      <div className="row cols-2">
        <Shot src="/screens/image_1779129619742.png" alt="Specflow app type chooser">
          <Anno
            number={1}
            label="Tap a card to select"
            color="blue"
            style={{ top: '42%', left: '30%' }}
          />
          <Anno
            number={2}
            label="Then ‘Continue’"
            color="green"
            style={{ bottom: '6%', right: '6%' }}
          />
        </Shot>
        <Shot src="/screens/image_1779129633471.png" alt="Specflow app type chooser in Arabic">
          <Anno number="AR" label="Same screen, switched to Arabic" color="red" style={{ top: '10%', left: '6%' }} />
        </Shot>
      </div>
      <div className="note">
        <strong>RTL works.</strong>&nbsp;Layout flips, labels translate. Switch any time from the
        top bar — your progress is saved.
      </div>
    </>
  )
}

function Step4Slide() {
  return (
    <>
      <StepHeader
        step={4}
        color="red"
        title="Now, what should it feel like?"
        lede="Pick a palette that matches the mood. Filter by vibe (Editorial, Minimal, Vibrant, Earthy, Moody, Playful) if you want to narrow it down."
      />
      <Shot src="/screens/image_1779129646964.png" alt="Specflow color palette picker">
        <Anno
          number={1}
          label="Tap any palette · multi-select OK"
          color="red"
          style={{ top: '32%', left: '46%' }}
        />
        <Anno
          number={2}
          label="Filter by vibe up top"
          color="blue"
          style={{ top: '22%', left: '4%' }}
        />
      </Shot>
    </>
  )
}

function Step5Slide() {
  return (
    <>
      <StepHeader
        step={5}
        color="green"
        title="Pick the motion."
        lede="Hover any tile to see the loop. Multi-select is welcome — you're choosing the vocabulary your app will animate with: entrances, scroll, hover, page transitions, micro-interactions, text effects."
      />
      <Shot src="/screens/image_1779129657566.png" alt="Specflow motion picker">
        <Anno
          number={1}
          label="Categories — tap to switch"
          color="green"
          style={{ top: '24%', left: '4%' }}
        />
        <Anno
          number={2}
          label="Hover to preview · tap to add"
          color="blue"
          style={{ top: '54%', left: '32%' }}
        />
      </Shot>
      <div className="note green">
        <strong>Less is more.</strong>&nbsp;3–5 effects across the whole app is usually plenty. You
        can revisit later.
      </div>
    </>
  )
}

function Step6Slide() {
  return (
    <>
      <StepHeader
        step={6}
        color="yellow"
        title="Answer the brief — about ten questions."
        lede="This is where your idea becomes a spec. Product name, one-sentence pitch, the single most important CTA, audience, tone — the harder part, but the most valuable."
      />
      <Shot src="/screens/image_1779129696519.png" alt="Specflow brief questions">
        <Anno
          number={1}
          label="Short answers only — keep it sharp"
          color="yellow"
          style={{ top: '34%', left: '4%' }}
        />
        <Anno
          number={2}
          label="‘Continue’ after each answer"
          color="blue"
          style={{ top: '46%', left: '4%' }}
        />
      </Shot>
    </>
  )
}

function Step7Slide() {
  return (
    <>
      <StepHeader
        step={7}
        color="blue"
        title="Export your three files."
        lede={
          <>
            Specflow hands you a bundle: <code>design.md</code>, <code>skill.md</code>, and{' '}
            <code>code.md</code>. <strong>Today we only need the first two</strong> — they go into
            Stitch.
          </>
        }
      />
      <div className="row cols-2">
        <Shot src="/screens/image_1779129713641.png" alt="Specflow export screen">
          <Anno
            number={1}
            label="Click ‘Download design.md’"
            color="blue"
            style={{ bottom: '14%', left: '28%' }}
          />
          <Anno
            number={2}
            label="Repeat for skill.md"
            color="green"
            style={{ top: '20%', left: '4%' }}
          />
        </Shot>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card card--accent">
            <h3>What's inside</h3>
            <ul className="list-checks">
              <li><code>design.md</code> — palette, type, spacing, components, anti-slop rules.</li>
              <li><code>skill.md</code> — Stitch behavior: layout, copy voice, do/don'ts.</li>
              <li><code>code.md</code> — implementation spec (save for tomorrow).</li>
            </ul>
          </div>
          <div className="note blue">
            <strong>Save them together</strong> in a folder you can find easily — you'll drag them
            into Stitch in a moment.
          </div>
        </div>
      </div>
    </>
  )
}

function Step8Slide() {
  return (
    <>
      <StepHeader
        step={8}
        color="red"
        title="Get a content prompt from Gemini."
        lede="Open Gemini (or any model — Claude, ChatGPT). Paste your design.md and ask it to write a Stitch content prompt: section-by-section copy that follows the anti-slop rules in design.md."
      />
      <div className="row cols-2">
        <Shot src="/screens/image_1779129814081.png" alt="Asking Gemini for a Stitch content prompt">
          <Anno number={1} label="Attach design.md" color="red" style={{ top: '22%', right: '6%' }} />
          <Anno
            number={2}
            label="Ask for content prompt only"
            color="blue"
            style={{ top: '54%', left: '4%' }}
          />
        </Shot>
        <Shot src="/screens/image_1779129823776.png" alt="Gemini returns a section-by-section prompt">
          <Anno
            number={3}
            label="Copy this whole reply"
            color="green"
            style={{ top: '50%', left: '4%' }}
          />
        </Shot>
      </div>
      <div className="note red">
        <strong>Why a separate prompt?</strong>&nbsp;Stitch is great at layout, but you want
        on-brand copy — not generic "Lorem". The AI writes it for you, on-brief.
      </div>
    </>
  )
}

function Step9Slide() {
  return (
    <>
      <StepHeader
        step={9}
        color="green"
        title="Open Stitch — drop your files in."
        lede={
          <>
            Go to <a href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer">stitch.withgoogle.com</a>. Drag <code>design.md</code> and{' '}
            <code>skill.md</code> onto the prompt area, then paste the content prompt you got from
            Gemini.
          </>
        }
      />
      <Shot src="/screens/image_1779129881796.png" alt="Stitch welcome with files attached">
        <Anno
          number={1}
          label="Drag-drop design.md + skill.md"
          color="green"
          style={{ top: '22%', left: '30%' }}
        />
        <Anno
          number={2}
          label="Paste the content prompt below"
          color="blue"
          style={{ top: '60%', left: '30%' }}
        />
        <Anno
          number={3}
          label="Select 3.1 Pro · pick Web (not App)"
          color="red"
          style={{ bottom: '12%', right: '6%' }}
        />
      </Shot>
      <div className="row cols-3" style={{ marginTop: 4 }}>
        <div className="card">
          <Eyebrow color="red">Must check</Eyebrow>
          <h3 style={{ marginTop: 10, fontSize: 17 }}>Model: 3.1 Pro</h3>
          <p>Bigger, more capable. Worth it for a clean first pass.</p>
        </div>
        <div className="card">
          <Eyebrow color="blue">Must check</Eyebrow>
          <h3 style={{ marginTop: 10, fontSize: 17 }}>Target: Web</h3>
          <p>App target produces mobile-only layouts. We want responsive web.</p>
        </div>
        <div className="card">
          <Eyebrow color="green">Then</Eyebrow>
          <h3 style={{ marginTop: 10, fontSize: 17 }}>Hit Generate</h3>
          <p>Stitch lays out the full page section by section.</p>
        </div>
      </div>
    </>
  )
}

function Step10Slide() {
  return (
    <>
      <StepHeader
        step={10}
        color="blue"
        title="Generate, then chat your way to better."
        lede="The first generation is a starting point. Talk to Stitch like a designer: ‘make the hero quieter’, ‘tighten the inventory cards’, ‘swap the CTA to outline’. It edits live."
      />
      <Shot src="/screens/image_1779129927627.png" alt="Stitch generated UI with multiple sections">
        <Anno
          number={1}
          label="All sections, side by side"
          color="blue"
          style={{ top: '8%', left: '20%' }}
        />
        <Anno
          number={2}
          label="Type changes here · live edits"
          color="green"
          style={{ bottom: '8%', left: '32%' }}
        />
        <Anno
          number={3}
          label="Export when happy"
          color="yellow"
          style={{ top: '6%', right: '6%' }}
        />
      </Shot>
      <div className="note blue">
        <strong>You're done with Day 1.</strong>&nbsp;Save your Stitch project — tomorrow we wire
        these screens into real code.
      </div>
    </>
  )
}

function TomorrowSlide() {
  return (
    <>
      <header>
        <Eyebrow color="red">Before tomorrow</Eyebrow>
        <h2 style={{ marginTop: 10 }}>Bring your laptop. Install two things.</h2>
        <p className="lede" style={{ marginTop: 12 }}>
          Tomorrow is the real coding day. We'll turn your Stitch design into a working app — that
          needs Node.js and Google Antigravity ready to go.
        </p>
      </header>
      <div className="row cols-2">
        <div className="tool">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="logo">
              <img src="/images/antigravity.jpg" alt="Google Antigravity" />
            </div>
            <div>
              <h3>Google Antigravity</h3>
              <span className="chip red">AI coding workspace</span>
            </div>
          </div>
          <p>The editor we'll code in. Available for macOS, Windows, and Linux.</p>
          <a className="link" href="https://antigravity.google/download" target="_blank" rel="noreferrer">
            https://antigravity.google/download
          </a>
          <a className="btn red" href="https://antigravity.google/download" target="_blank" rel="noreferrer">
            Download Antigravity →
          </a>
        </div>
        <div className="tool">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="logo">
              <img src="/images/node.png" alt="Node.js" />
            </div>
            <div>
              <h3>Node.js (LTS)</h3>
              <span className="chip green">JavaScript runtime</span>
            </div>
          </div>
          <p>Runs the dev server, installs packages, builds the app. Grab the LTS installer.</p>
          <a className="link" href="https://nodejs.org/en/download" target="_blank" rel="noreferrer">
            https://nodejs.org/en/download
          </a>
          <a className="btn green" href="https://nodejs.org/en/download" target="_blank" rel="noreferrer">
            Download Node.js →
          </a>
        </div>
      </div>
      <div className="row cols-2">
        <Shot src="/screens/image_1779129980907.png" alt="Antigravity download page" />
        <Shot src="/screens/image_1779130012005.png" alt="Node.js download page" />
      </div>
    </>
  )
}

function ClosingSlide() {
  return (
    <div className="cover">
      <div>
        <Eyebrow color="green">Day 1 · complete</Eyebrow>
        <h1 style={{ marginTop: 14 }}>
          See you <span className="accent-1">tomorrow.</span>{' '}
          <span className="accent-2">Bring</span>{' '}
          <span className="accent-3">the</span>{' '}
          <span className="accent-4">laptop.</span>
        </h1>
        <p className="lede" style={{ marginTop: 18 }}>
          You now have a design system, a Stitch project, and two installers ready. Tomorrow we
          plug it all into Antigravity and ship a real app — your dream app.
        </p>
        <div className="cover__meta">
          <a className="btn" href="https://specflow-six.vercel.app/" target="_blank" rel="noreferrer">
            Open Specflow
          </a>
          <a className="btn green" href="https://stitch.withgoogle.com/" target="_blank" rel="noreferrer">
            Open Stitch
          </a>
          <a className="btn ghost" href="https://antigravity.google/download" target="_blank" rel="noreferrer">
            Antigravity
          </a>
          <a className="btn ghost" href="https://nodejs.org/en/download" target="_blank" rel="noreferrer">
            Node.js
          </a>
        </div>
        <div className="note green" style={{ marginTop: 24 }}>
          Missed today or didn't bring your laptop? You're caught up. Re-run this deck whenever
          you want — and don't forget the laptop tomorrow.
        </div>
      </div>
      <div className="orbit" aria-hidden="true">
        <div className="orbit__ring" />
        <div className="orbit__ring r2" />
        <div className="orbit__ring r3" />
        <span className="orbit__dot b" />
        <span className="orbit__dot r" />
        <span className="orbit__dot y" />
        <span className="orbit__dot g" />
        <div className="orbit__center">
          <img src="/images/gdg-logo.png" alt="" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------
   Export
------------------------------------------------------------ */

export const slides: { title: string; render: () => ReactNode }[] = [
  { title: 'Welcome', render: CoverSlide },
  { title: 'Today\'s plan', render: AgendaSlide },
  { title: 'The two tools', render: ToolsSlide },
  { title: 'Open Specflow', render: Step1Slide },
  { title: 'Claim AI credit', render: Step2Slide },
  { title: 'App type', render: Step3Slide },
  { title: 'Color palette', render: Step4Slide },
  { title: 'Motion', render: Step5Slide },
  { title: 'Brief Q&A', render: Step6Slide },
  { title: 'Export files', render: Step7Slide },
  { title: 'Content prompt', render: Step8Slide },
  { title: 'Open Stitch', render: Step9Slide },
  { title: 'Generate + iterate', render: Step10Slide },
  { title: 'Prep for tomorrow', render: TomorrowSlide },
  { title: 'See you tomorrow', render: ClosingSlide },
]
