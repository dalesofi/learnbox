import './App.css'

function App() {
  return (
    <div className="app">
      <main id="main">
        <section className="hero" aria-labelledby="hero-name">
          <div className="hero__copy">
            <h1 className="hero__name" id="hero-name">
              Learnbox
            </h1>
            <p className="hero__motto">Curiosity delivered monthly — language learning you do together.</p>
            <p className="hero__tag">
              Personalized kits of games, stories, and activities for kids roughly 4–12,
              shipped on a rhythm that fits real family life.
            </p>
            <div className="hero__ctas">
              <button type="button" className="button button-primary">
                Get your first kit
              </button>
              <button type="button" className="button button-secondary">
                Subscribe
              </button>
            </div>
            <p className="hero__fineprint">
              Prototype: checkout and onboarding are not live yet — you&apos;re seeing the product story only.
            </p>
          </div>
          <figure className="hero__figure">
            <img
              className="hero__kit"
              src="/kit-flatlay.svg"
              width={640}
              height={480}
              alt="Illustration of an open Learnbox kit with cards, activity sheets, and colorful learning materials arranged in a flat lay."
              decoding="async"
            />
          </figure>
        </section>

        <div className="pillars" id="pillars">
          <section className="pillar" aria-labelledby="pillar-1-heading">
            <span className="pillar__index" aria-hidden="true">
              1
            </span>
            <div className="pillar__body">
              <h2 id="pillar-1-heading">We find you where you are</h2>
              <p>
                Life is not one-size-fits-all — travel weeks, school crunch time, slow
                Sundays. Your Learnbox subscription is built to <strong>flex with you</strong>:
                adjust frequency, pause when you need to, and update shipping or family
                details as your routine changes.
              </p>
            </div>
          </section>

          <section className="pillar pillar--alt" aria-labelledby="pillar-2-heading">
            <span className="pillar__index" aria-hidden="true">
              2
            </span>
            <div className="pillar__body">
              <h2 id="pillar-2-heading">Customize for every kid, every step</h2>
              <p>
                Each box reflects <strong>who your children are right now</strong>: age,
                language level, interests, and what feels hard. Over time, recommendations
                learn from <strong>what you tell us</strong>, <strong>quick check-ins</strong>, and
                <strong> how past kits landed</strong> — so the next delivery feels even more on
                target, not generic.
              </p>
            </div>
          </section>

          <section className="pillar pillar--partners" aria-labelledby="pillar-3-heading">
            <span className="pillar__index" aria-hidden="true">
              3
            </span>
            <div className="pillar__body">
              <h2 id="pillar-3-heading">Made with partners who care</h2>
              <p>
                Behind every kit is a <strong>network of local makers and educators</strong> —
                often <strong>women- and non-binary-led</strong> small teams who{' '}
                <strong>employ people with different abilities</strong>. We keep things
                close to the ground so quality, inclusion, and care stay visible — not lost
                in anonymous mass production.
              </p>
              <p className="pillar__note">
                Browsing individual provider catalogs and mixing portfolios across makers is
                something we&apos;re excited to add <strong>after the MVP</strong>, once logistics
                can honor that promise without stress for families or studios.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p>Learnbox prototype — questions: team@learnbox.example</p>
      </footer>
    </div>
  )
}

export default App
