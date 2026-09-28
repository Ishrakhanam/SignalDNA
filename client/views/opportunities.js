import { EvidenceCard, WhyThisCard, SectionHeader, Tag } from '../components/cards.js';

const opportunities = [
  {
    title: 'AI workflows for junior developers',
    fit: '82/100',
    demand: 'AI productivity',
    dna: 'Practical teaching',
    format: 'Step-by-step walkthrough',
    reason: 'Audience questions and your strongest teaching patterns overlap.',
    evidence: 'Recent audience questions mention AI workflows and career transitions.',
    tone: 'primary'
  },
  {
    title: 'Debugging problems developers face',
    fit: '76/100',
    demand: 'Debugging workflows',
    dna: 'Proof-led explanations',
    format: 'Tutorial',
    reason: 'Debugging content has shown strong save behavior in your content history.',
    evidence: 'Tutorial-style posts contributed repeated save signals.',
    tone: 'secondary'
  },
  {
    title: 'Learning path after JavaScript',
    fit: '71/100',
    demand: 'Career transitions',
    dna: 'Step-by-step',
    format: 'Educational guide',
    reason: 'Audience questions repeatedly focus on what to learn next.',
    evidence: 'Career-transition questions appear repeatedly in audience evidence.',
    tone: 'default'
  }
];

export function renderOpportunities() {
  return `
    ${SectionHeader({
      eyebrow: 'SignalDNA workspace',
      title: 'Opportunities',
      description: 'Where audience demand and creator fit intersect.'
    })}

    <section class="panel opportunity-intro">
      <div>
        <div class="card-kicker">Opportunity intelligence</div>
        <h2>Ideas worth investigating</h2>
        <p>
          Opportunities connect audience demand with the patterns already
          supported by your Content DNA.
        </p>
      </div>
    </section>

    <section class="opportunity-list">
      ${opportunities.map((item, index) => `
        <article class="panel opportunity-card">
          <div class="opportunity-top">
            <div class="opportunity-number">
              ${String(index + 1).padStart(2, '0')}
            </div>

            <div class="opportunity-title">
              <div class="card-kicker">Creator opportunity</div>
              <h3>${item.title}</h3>
              <p>${item.reason}</p>
            </div>

            <div class="fit-score-small">
              <strong>${item.fit}</strong>
              <span>creator fit</span>
            </div>
          </div>

          <div class="opportunity-tags">
            ${Tag({ children: item.demand, tone: 'secondary' })}
            ${Tag({ children: item.dna, tone: 'primary' })}
            ${Tag({ children: item.format, tone: 'neutral' })}
          </div>

          <div class="opportunity-evidence">
            ${EvidenceCard({
              title: 'Why this opportunity?',
              evidence: item.evidence,
              source: 'Audience + Content DNA evidence',
              tone: item.tone
            })}

            ${WhyThisCard({
              title: 'What should happen next?',
              children: 'Turn this opportunity into a small experiment and measure the result before updating creator memory.'
            })}
          </div>

          <div class="opportunity-actions">
            <button class="secondary-button" data-route="content-dna">
              View Content DNA
            </button>

            <button class="primary-button" data-route="experiments">
              Create experiment →
            </button>
          </div>
        </article>
      `).join('')}
    </section>
  `;
}