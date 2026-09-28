import { EvidenceCard, SectionHeader, Tag, WhyThisCard } from '../components/cards.js';

const dnaPatterns = [
  {
    title: 'Practical teaching',
    description: 'Explains a real problem through clear, useful steps.',
    evidence: 'Tutorial-style posts generated stronger save behavior.',
    source: 'Content history · 7 observations',
    strength: 'Strong'
  },
  {
    title: 'Strong hooks',
    description: 'Starts with a specific problem or outcome instead of a broad introduction.',
    evidence: 'Problem-led openings appear repeatedly in higher-reach content.',
    source: 'Content history · 6 observations',
    strength: 'Strong'
  },
  {
    title: 'Step-by-step structure',
    description: 'Breaks complex technical ideas into smaller actions people can follow.',
    evidence: 'Walkthrough content receives repeated audience questions and saves.',
    source: 'Audience + content evidence',
    strength: 'Strong'
  },
  {
    title: 'Proof-led explanations',
    description: 'Uses examples, results, or demonstrations to support the explanation.',
    evidence: 'Posts showing a working result create stronger evidence signals.',
    source: 'Content history · 5 observations',
    strength: 'Growing'
  }
];

export function renderContentDNA() {
  return `
    ${SectionHeader({
      eyebrow: 'Content intelligence',
      title: 'Your Content DNA',
      description: 'The recurring patterns that make your content recognizably yours.'
    })}

    <section class="dna-summary-grid">
      <article class="panel dna-hero">
        <div class="card-kicker">Creator pattern profile</div>
        <h3>Practical. Clear. Proof-led.</h3>
        <p>
          Your strongest content patterns are based on repeated evidence
          across your current content library.
        </p>

        <div class="tag-cloud">
          ${dnaPatterns.map(pattern =>
            Tag({ children: pattern.title, tone: 'primary' })
          ).join('')}
        </div>
      </article>

      <article class="panel dna-signal-card">
        <div class="card-kicker">DNA confidence</div>
        <div class="dna-score">82<span>/100</span></div>
        <p>
          Current confidence based on repeated content observations.
        </p>
        <div class="small-note">Demo evidence · Replaceable with API data</div>
      </article>
    </section>

    ${SectionHeader({
      eyebrow: 'Recurring patterns',
      title: 'What keeps showing up',
      description: 'Each pattern is connected to evidence rather than being treated as a fixed identity.'
    })}

    <section class="dna-pattern-grid">
      ${dnaPatterns.map((pattern, index) => `
        <article class="panel dna-pattern-card">
          <div class="pattern-top">
            <span class="pattern-number">0${index + 1}</span>
            <span class="pattern-strength">${pattern.strength}</span>
          </div>

          <h3>${pattern.title}</h3>
          <p>${pattern.description}</p>

          ${EvidenceCard({
            title: 'Evidence',
            evidence: pattern.evidence,
            source: pattern.source,
            tone: index % 2 === 0 ? 'primary' : 'secondary'
          })}
        </article>
      `).join('')}
    </section>

    <section class="dna-bottom-grid">
      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Why this matters',
          title: 'Patterns guide better decisions',
          description: 'Content DNA helps SignalDNA connect future opportunities to what already works for you.'
        })}

        ${WhyThisCard({
          title: 'Your DNA is not a fixed label',
          children: 'These patterns can become stronger, weaker, or change as new content creates new evidence.'
        })}

        <div class="dna-rule-list">
          <div>
            <strong>Repeated evidence</strong>
            <span>A pattern becomes meaningful when it appears across multiple pieces of content.</span>
          </div>
          <div>
            <strong>Creator fit</strong>
            <span>Future opportunities should connect to patterns you can naturally execute.</span>
          </div>
          <div>
            <strong>Continuous learning</strong>
            <span>New results can update what SignalDNA remembers about your content.</span>
          </div>
        </div>
      </div>

      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Memory connection',
          title: 'What should be remembered?',
          description: 'Potential learnings can become part of your persistent creator context.'
        })}

        <div class="memory-learning-card">
          <div class="memory-learning-icon">↗</div>
          <div>
            <div class="card-kicker">Potential learning</div>
            <h3>Step-by-step teaching is a durable pattern.</h3>
            <p>
              Recent evidence suggests that practical walkthroughs
              consistently generate meaningful saves.
            </p>
          </div>
        </div>

        <button class="primary-button full-width" data-action="memory-update">
          Prepare memory update
        </button>
      </div>
    </section>
  `;
}