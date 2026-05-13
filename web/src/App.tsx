import './App.css'

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <p className="site-logo">Learnbox</p>
        <nav className="site-nav" aria-label="Primary">
          <a href="#local-partners">Our partners</a>
          <a href="#how-it-works">How it works</a>
        </nav>
      </header>

      <main id="main">
        <section
          className="hero"
          id="get-started"
          aria-labelledby="hero-heading"
        >
          <h1 id="hero-heading">Language learning, delivered as a family adventure</h1>
          <p className="hero-lead">
            Learnbox is a subscription of curated learning moments — playful materials
            and activities tailored to your children&apos;s age, level, and interests,
            so you can learn together at home or on the go.
          </p>
          <ul className="hero-points">
            <li>Personalized monthly kits</li>
            <li>Family-centered, low-screen emphasis</li>
            <li>Rooted in real people and places</li>
          </ul>
          <div className="hero-actions">
            <a className="button button-primary" href="#local-partners">
              Meet our local network
            </a>
            <p className="hero-note">
              Full conversational onboarding and checkout are still being wired up —
              this landing previews our story and values.
            </p>
          </div>
        </section>

        <section
          className="how-it-works"
          id="how-it-works"
          aria-labelledby="how-heading"
        >
          <h2 id="how-heading">How Learnbox fits your family</h2>
          <p>
            You share a bit about your children and your goals; we suggest curated
            Learnboxes built around themes they love. You choose a rhythm that works
            for your life — then meaningful language practice shows up at your door.
          </p>
        </section>

        <section
          className="provider-network"
          id="local-partners"
          aria-labelledby="providers-heading"
        >
          <div className="provider-network__inner">
            <h2 id="providers-heading">A network rooted in territory</h2>
            <p className="provider-network__lead">
              Learnbox is a <strong>small, woman-led</strong> company. We work with a
              growing circle of <strong>local providers</strong> — businesses led by{' '}
              <strong>women and non-binary people</strong> who{' '}
              <strong>employ people with different abilities</strong>. Together we are
              committed to <strong>changing the world through education</strong> —
              not as a slogan, but as daily practice in how we design, make, and ship
              every box.
            </p>
            <p>
              When you choose Learnbox, you support <strong>real workshops and studios</strong>{' '}
              close to where materials are made. That proximity keeps quality high,
              waste lower, and relationships honest — the opposite of an anonymous
              fulfillment line.
            </p>
            <aside
              className="provider-network__future"
              aria-label="What is not available in the first release"
            >
              <h3 className="provider-network__aside-title">Coming after the MVP</h3>
              <p>
                You will eventually be able to <strong>browse each provider&apos;s catalog</strong>{' '}
                and <strong>pick and choose from their portfolios</strong> — like
                visiting a collective of makers before you subscribe. That experience
                is <strong>not in this first release</strong>: splitting orders across
                many small suppliers adds real <strong>logistics and operations</strong>{' '}
                complexity, and we refuse to launch it before we can do it reliably.
                For now, we introduce you to <strong>who we are and who we work with</strong>{' '}
                — so trust starts with transparency.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          Prototype UI — not a real purchase. Questions: team@learnbox.example
        </p>
      </footer>
    </div>
  )
}

export default App
