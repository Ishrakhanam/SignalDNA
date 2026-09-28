import {
  EvidenceCard,
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';

const audienceSignals = [
  {
    title: 'AI productivity',
    description: 'People want practical ways to use AI in their everyday development workflow.',
    signal: 'High',
    source: 'Recent audience questions'
  },
  {
    title: 'Career transitions',
    description: 'Audience members are looking for clearer paths from learning to getting developer roles.',
    signal: 'High',
    source: 'Repeated audience questions'
  },
  {
    title: 'Debugging help',
    description: 'Practical debugging explanations are useful because they solve immediate development problems.',
    signal: 'Medium',
    source: 'Content + audience evidence'
  }
];

export function renderAudienceIntelligence() {
  return `
    ${SectionHeader({
      eyebrow: 'Audience intelligence',
      title: 'Understand what your audience is trying to solve',
      description:
        'SignalDNA turns audience questions and recurring needs into useful context for your content decisions.'
    })}

    <section class="metric-grid three-col">

      <article class="metric-card accent-primary">
        <div class="metric-label">Active audience themes</div>
        <div class="metric-value">8</div>
        <div class="metric-detail">recurring needs detected</div>
      </article>

      <article class="metric-card accent-secondary">
        <div class="metric-label">High-intent questions</div>
        <div class="metric-value">24</div>
        <div class="metric-detail">questions worth understanding</div>
      </article>

      <article class="metric-card accent-neutral">
        <div class="metric-label">Emerging signals</div>
        <div class="metric-value">5</div>
        <div class="metric-detail">new themes to monitor</div>
      </article>

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Audience demand',
        title: 'What people are trying to understand',
        description:
          'These signals are illustrative frontend data and can later be replaced with backend data.'
      })}

      <div class="trend-list">

        ${audienceSignals.map((signal, index) => `
          <article class="trend-card">

            <div class="trend-number">
              0${index + 1}
            </div>

            <div class="trend-main">

              <div class="trend-title-row">
                <h3>${signal.title}</h3>
                <span class="tag tag-secondary">
                  ${signal.signal} signal
                </span>
              </div>

              <p>${signal.description}</p>

              <div class="trend-reason">
                <span class="card-kicker">Evidence source</span>
                <span>${signal.source}</span>
              </div>

            </div>

          </article>
        `).join('')}

      </div>

    </section>

    <section class="dashboard-grid">

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Audience language',
          title: 'Recurring questions',
          description:
            'The language people use can reveal what they actually need help with.'
        })}

        <div class="tag-cloud">
          ${Tag({
            children: 'How do I use AI?',
            tone: 'primary'
          })}

          ${Tag({
            children: 'What should I learn next?',
            tone: 'secondary'
          })}

          ${Tag({
            children: 'How do I debug this?',
            tone: 'neutral'
          })}

          ${Tag({
            children: 'How do I get a developer job?',
            tone: 'primary'
          })}
        </div>

        ${EvidenceCard({
          title: 'Practical questions dominate',
          evidence:
            'The strongest audience signals are connected to specific problems, workflows, and next-step decisions.',
          source: 'Audience evidence',
          tone: 'primary'
        })}

      </div>

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Interpretation',
          title: 'What this means for you',
          description:
            'Audience intelligence should inform your content without turning every signal into a content recommendation.'
        })}

        ${WhyThisCard({
          title: 'Start with the audience problem',
          children:
            'Use recurring questions to understand the problem first. Then connect that problem with your Content DNA and decide whether it is worth testing.'
        })}

        <div class="fit-panel">

          <div class="fit-score">

            <div class="score-ring">
              82<span>/100</span>
            </div>

            <div>
              <strong>Strong audience alignment</strong>
              <p>
                Practical AI and developer-career questions connect
                with your existing teaching patterns.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Audience → Content DNA',
        title: 'Connect demand with your natural strengths',
        description:
          'Audience intelligence becomes more useful when combined with the patterns already supported by your content.'
      })}

      <div class="tag-cloud">

        ${Tag({
          children: 'Audience demand',
          tone: 'secondary'
        })}

        ${Tag({
          children: 'Practical teaching',
          tone: 'primary'
        })}

        ${Tag({
          children: 'Step-by-step',
          tone: 'primary'
        })}

        ${Tag({
          children: 'Proof-led explanations',
          tone: 'neutral'
        })}

      </div>

      ${EvidenceCard({
        title: 'A clear connection is forming',
        evidence:
          'Audience demand for practical developer guidance overlaps with your recurring teaching patterns.',
        source: 'Audience + Content DNA evidence',
        tone: 'secondary'
      })}

    </section>
  `;
}