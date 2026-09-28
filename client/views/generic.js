import { EmptyState } from '../components/states.js';
import { EvidenceCard, SectionHeader, Tag } from '../components/cards.js';

const pages = {
  'content-library': [
    'Content Library',
    'Your published content becomes the evidence layer for SignalDNA.',
    'Organize the source material that future intelligence can learn from.'
  ],

  'audience-intelligence': [
    'Audience Intelligence',
    'Understand the questions, friction, language, and demand behind audience behavior.',
    'Keep audience signals separate from generic engagement metrics.'
  ],

  'content-dna': [
    'Content DNA',
    'A living representation of the patterns that make your content recognizably yours.',
    'Patterns should be grounded in repeated evidence and remain open to change.'
  ],

  'trends': [
    'Trends',
    'Track themes that may matter to your audience without turning SignalDNA into a viral prediction tool.',
    'The useful question is not “what is trending?” but “what is relevant to this creator?”'
  ],

  'opportunities': [
    'Opportunities',
    'Explore intersections between audience demand, your Content DNA, and external signals.',
    'Every opportunity should eventually point back to evidence.'
  ],

  'experiments': [
    'Experiments',
    'Turn an opportunity into a small, testable content hypothesis.',
    'Record the hypothesis, outcome, and what should be remembered next.'
  ],

  'memory': [
    'Memory',
    'See what SignalDNA currently remembers about this creator and why.',
    'Memory is persistent context, not a static profile page.'
  ],

  'settings': [
    'Settings',
    'Manage creator context and workspace preferences.',
    'Backend integration is intentionally not connected in this foundation build.'
  ]
};


/* -------------------- TRENDS -------------------- */

function renderTrends() {
  const trends = [
    {
      title: 'AI productivity workflows',
      description: 'Practical ways creators and developers are using AI to reduce repetitive work.',
      relevance: 'High',
      fit: 'Strong',
      reason: 'Matches your practical teaching and step-by-step Content DNA.'
    },
    {
      title: 'Junior developer career transitions',
      description: 'Content around learning paths, projects, interviews, and moving into development roles.',
      relevance: 'High',
      fit: 'Strong',
      reason: 'Overlaps with recurring audience questions about career growth.'
    },
    {
      title: 'Developer workflow automation',
      description: 'Tools and workflows that simplify debugging, coding, and daily development tasks.',
      relevance: 'Medium',
      fit: 'Moderate',
      reason: 'Fits your technical teaching style but needs a focused angle.'
    }
  ];

  return `
    ${SectionHeader({
      eyebrow: 'Trend intelligence',
      title: 'Trends worth watching',
      description:
        'SignalDNA looks for relevance between external themes and the patterns already present in your content.'
    })}

    <section class="metric-grid three-col">

      <article class="metric-card accent-primary">
        <div class="metric-label">Relevant themes</div>
        <div class="metric-value">8</div>
        <div class="metric-detail">currently monitored</div>
      </article>

      <article class="metric-card accent-secondary">
        <div class="metric-label">Creator matches</div>
        <div class="metric-value">3</div>
        <div class="metric-detail">strong Content DNA overlap</div>
      </article>

      <article class="metric-card accent-neutral">
        <div class="metric-label">New signals</div>
        <div class="metric-value">5</div>
        <div class="metric-detail">added to the evidence set</div>
      </article>

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Relevant now',
        title: 'Themes connected to your audience',
        description:
          'These are illustrative signals for the frontend foundation. They can later be replaced with API data.'
      })}

      <div class="trend-list">

        ${trends.map((trend, index) => `
          <article class="trend-card">

            <div class="trend-number">
              0${index + 1}
            </div>

            <div class="trend-main">

              <div class="trend-title-row">
                <h3>${trend.title}</h3>
                <span class="tag tag-secondary">
                  ${trend.relevance} relevance
                </span>
              </div>

              <p>${trend.description}</p>

              <div class="trend-fit">
                <span class="card-kicker">Creator fit</span>
                <strong>${trend.fit}</strong>
              </div>

              <div class="trend-reason">
                <span class="card-kicker">Why this appears</span>
                <span>${trend.reason}</span>
              </div>

            </div>

          </article>
        `).join('')}

      </div>

    </section>

    <section class="dashboard-grid">

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Trend → You',
          title: 'Relevance matters more than popularity',
          description:
            'A trend becomes useful when it connects with what your audience already cares about and how you naturally teach.'
        })}

        <div class="tag-cloud">
          ${Tag({ children: 'Audience demand', tone: 'primary' })}
          ${Tag({ children: 'Content DNA', tone: 'secondary' })}
          ${Tag({ children: 'Format fit', tone: 'neutral' })}
          ${Tag({ children: 'Evidence', tone: 'primary' })}
        </div>

        ${EvidenceCard({
          title: 'AI productivity matches your existing patterns',
          evidence:
            'Recent audience questions and practical teaching formats create a clear connection with this theme.',
          source: 'Audience + Content DNA evidence',
          tone: 'secondary'
        })}

      </div>

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Signal interpretation',
          title: 'What SignalDNA does differently',
          description:
            'Trends are treated as context for creator decisions, not as guaranteed performance.'
        })}

        <div class="experiment-card">
          <div class="experiment-number">01</div>
          <div>
            <strong>Find the creator angle</strong>
            <p>
              Start with the audience problem, connect it to your Content DNA,
              then decide whether the trend is worth testing.
            </p>
          </div>
        </div>

        <div class="experiment-card">
          <div class="experiment-number">02</div>
          <div>
            <strong>Test before remembering</strong>
            <p>
              A trend should become part of your long-term memory only after
              your own content provides supporting evidence.
            </p>
          </div>
        </div>

      </div>

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Next step',
        title: 'Turn a relevant trend into an opportunity',
        description:
          'Choose a signal that fits your audience and Content DNA, then move it into the opportunity workspace.'
      })}

      <div class="fit-panel">

        <div class="fit-score">

          <div class="score-ring">
            82<span>/100</span>
          </div>

          <div>
            <strong>AI productivity workflows</strong>
            <p>
              Strong overlap with practical teaching, step-by-step structure,
              and current audience demand.
            </p>
          </div>

        </div>

        <button class="primary-button" data-route="opportunities">
          Explore opportunity →
        </button>

      </div>

    </section>
  `;
}


/* -------------------- MEMORY -------------------- */

function renderMemory() {

  const memories = [
    {
      title: 'Practical teaching performs well',
      description:
        'Step-by-step explanations and concrete demonstrations repeatedly appear in stronger content responses.',
      evidence: '7 supporting observations',
      tone: 'primary'
    },
    {
      title: 'Strong hooks help establish context',
      description:
        'Content that clearly introduces the problem before explaining the solution is a recurring pattern.',
      evidence: '5 supporting observations',
      tone: 'secondary'
    },
    {
      title: 'Audience values career guidance',
      description:
        'Questions around learning paths, projects, and developer career transitions appear repeatedly.',
      evidence: '6 audience observations',
      tone: 'default'
    },
    {
      title: 'Proof-led explanations are useful',
      description:
        'Examples, demonstrations, and visible outcomes strengthen the practical teaching pattern.',
      evidence: '4 supporting observations',
      tone: 'primary'
    }
  ];

  return `

    ${SectionHeader({
      eyebrow: 'Persistent creator context',
      title: 'What SignalDNA remembers',
      description:
        'Memory captures repeated evidence so future content decisions can use what has already been learned.'
    })}


    <section class="panel memory-overview">

      <div class="memory-overview-main">

        <div class="card-kicker">
          Current creator memory
        </div>

        <h2>
          Practical. Clear. Proof-led.
        </h2>

        <p>
          SignalDNA currently understands your content as practical,
          structured, and focused on helping the audience solve real problems.
        </p>

        <div class="tag-cloud">
          ${Tag({
            children: 'Practical teaching',
            tone: 'primary'
          })}

          ${Tag({
            children: 'Strong hooks',
            tone: 'secondary'
          })}

          ${Tag({
            children: 'Step-by-step',
            tone: 'primary'
          })}

          ${Tag({
            children: 'Proof-led',
            tone: 'neutral'
          })}
        </div>

      </div>


      <div class="memory-confidence">

        <div class="card-kicker">
          Memory confidence
        </div>

        <div class="memory-score">
          82<span>/100</span>
        </div>

        <p>
          Based on repeated content and audience evidence.
        </p>

      </div>

    </section>


    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Learned patterns',
        title: 'Evidence behind the memory',
        description:
          'Memory should be explainable. Each important pattern connects back to observations.'
      })}

      <div class="memory-list">

        ${memories.map((memory, index) => `

          <article class="memory-item">

            <div class="memory-number">
              ${String(index + 1).padStart(2, '0')}
            </div>

            <div class="memory-item-content">

              <div class="memory-item-heading">
                <h3>${memory.title}</h3>
                <span class="tag tag-${memory.tone}">
                  Remembered
                </span>
              </div>

              <p>
                ${memory.description}
              </p>

              <span class="small-note">
                ${memory.evidence}
              </span>

            </div>

          </article>

        `).join('')}

      </div>

    </section>


    <section class="dashboard-grid">

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Memory updates',
          title: 'How memory changes',
          description:
            'New evidence can strengthen, weaken, or change an existing pattern.'
        })}

        <div class="experiment-card">

          <div class="experiment-number">
            01
          </div>

          <div>
            <strong>New evidence arrives</strong>
            <p>
              A new piece of content or audience signal is observed.
            </p>
          </div>

        </div>

        <div class="experiment-card">

          <div class="experiment-number">
            02
          </div>

          <div>
            <strong>Patterns are compared</strong>
            <p>
              SignalDNA checks whether the new evidence supports an existing pattern.
            </p>
          </div>

        </div>

        <div class="experiment-card">

          <div class="experiment-number">
            03
          </div>

          <div>
            <strong>Memory is updated</strong>
            <p>
              Useful learning becomes part of the creator context.
            </p>
          </div>

        </div>

      </div>


      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Why this matters',
          title: 'Memory makes SignalDNA persistent',
          description:
            'Instead of starting from zero every time, future recommendations can build on previous evidence.'
        })}

        ${EvidenceCard({
          title: 'Your patterns become reusable context',
          evidence:
            'Repeated observations can influence future trend interpretation, opportunity discovery, and experiments.',
          source: 'Content + Audience evidence',
          tone: 'primary'
        })}

        <button
          class="primary-button full-width"
          data-action="memory-update"
        >
          Prepare memory update
        </button>

      </div>

    </section>


    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Memory principle',
        title: 'Evidence before permanence',
        description:
          'SignalDNA should not treat every individual result as a permanent creator trait.'
      })}

      <div class="fit-panel">

        <div class="fit-score">

          <div class="score-ring">
            ✓
          </div>

          <div>
            <strong>Patterns need repeated evidence</strong>

            <p>
              A single post can be interesting. Repeated evidence is what
              turns an observation into useful long-term memory.
            </p>
          </div>

        </div>

      </div>

    </section>

  `;
}


/* -------------------- GENERIC ROUTER -------------------- */

export function renderGenericView(id) {

  if (id === 'trends') {
    return renderTrends();
  }

  if (id === 'memory') {
    return renderMemory();
  }

  const page = pages[id];

  if (!page) {
    return EmptyState({
      title: 'Page not found',
      description: 'The requested SignalDNA workspace page does not exist.'
    });
  }

  const [title, description, detail] = page;

  return `
    ${SectionHeader({
      eyebrow: 'SignalDNA workspace',
      title,
      description
    })}

    <section class="placeholder-grid">

      <div class="panel feature-intro">

        <div class="feature-number">
          ${String(Object.keys(pages).indexOf(id) + 1).padStart(2, '0')}
        </div>

        <div>
          <h3>${title}</h3>
          <p>${detail}</p>
        </div>

      </div>

      ${EmptyState({
        title: 'Foundation view ready',
        description:
          'This view is intentionally not connected to a backend yet. Add real data here when the API contract is defined.'
      })}

    </section>
  `;
}