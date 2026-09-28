import {
  EvidenceCard,
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';

const memories = [
  {
    title: 'Practical teaching is a strong content pattern',
    description:
      'Step-by-step explanations and practical demonstrations repeatedly appear in stronger content.',
    source: 'Content DNA · 7 observations',
    tone: 'primary'
  },
  {
    title: 'Audience prefers concrete workflows',
    description:
      'Recent audience questions frequently focus on practical AI tools and developer workflows.',
    source: 'Audience Intelligence · 9 observations',
    tone: 'secondary'
  },
  {
    title: 'Step-by-step formats fit the creator',
    description:
      'Tutorial and walkthrough formats repeatedly match the creator’s existing content strengths.',
    source: 'Content history · 6 observations',
    tone: 'primary'
  },
  {
    title: 'Career transitions are recurring audience demand',
    description:
      'Questions about learning paths and getting developer roles continue to appear.',
    source: 'Audience Intelligence · 6 observations',
    tone: 'secondary'
  }
];

export function renderMemory() {
  return `
    ${SectionHeader({
      eyebrow: 'SignalDNA memory',
      title: 'What SignalDNA remembers',
      description:
        'Persistent context built from repeated content and audience evidence.'
    })}

    <section class="metric-grid three-col">

      <article class="metric-card accent-primary">
        <div class="metric-label">Memory observations</div>
        <div class="metric-value">28</div>
        <div class="metric-detail">patterns recorded</div>
      </article>

      <article class="metric-card accent-secondary">
        <div class="metric-label">Confirmed patterns</div>
        <div class="metric-value">12</div>
        <div class="metric-detail">supported by evidence</div>
      </article>

      <article class="metric-card accent-neutral">
        <div class="metric-label">Recent learnings</div>
        <div class="metric-value">5</div>
        <div class="metric-detail">new signals</div>
      </article>

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Persistent context',
        title: 'Memory connects the content journey',
        description:
          'SignalDNA uses accumulated evidence to improve future content decisions.'
      })}

      <div class="tag-cloud">

        ${Tag({
          children: 'Content',
          tone: 'primary'
        })}

        ${Tag({
          children: 'Audience',
          tone: 'secondary'
        })}

        ${Tag({
          children: 'Content DNA',
          tone: 'primary'
        })}

        ${Tag({
          children: 'Trends',
          tone: 'neutral'
        })}

        ${Tag({
          children: 'Experiments',
          tone: 'secondary'
        })}

        ${Tag({
          children: 'Learning',
          tone: 'primary'
        })}

      </div>

      ${WhyThisCard({
        title: 'Why memory matters',
        children:
          'A useful result should not disappear after one experiment. Repeated evidence can become context that improves future opportunities and experiments.'
      })}

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Remembered patterns',
        title: 'What we currently know',
        description:
          'These are frontend demonstration records and can later be connected to backend memory data.'
      })}

      <div class="evidence-stack">

        ${memories.map(item =>
          EvidenceCard({
            title: item.title,
            evidence: item.description,
            source: item.source,
            tone: item.tone
          })
        ).join('')}

      </div>

    </section>

    <section class="dashboard-grid">

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Current learning',
          title: 'What is becoming clearer',
          description:
            'Recent evidence that may strengthen future creator memory.'
        })}

        <div class="tag-cloud">

          ${Tag({
            children: 'Practical AI workflows',
            tone: 'secondary'
          })}

          ${Tag({
            children: 'Step-by-step teaching',
            tone: 'primary'
          })}

          ${Tag({
            children: 'Developer career guidance',
            tone: 'neutral'
          })}

        </div>

        ${EvidenceCard({
          title: 'Practical demonstrations remain important',
          evidence:
            'Recent content and audience signals continue to connect practical explanations with meaningful engagement.',
          source: 'Content + audience evidence',
          tone: 'primary'
        })}

      </div>

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Memory quality',
          title: 'Evidence before memory',
          description:
            'SignalDNA should strengthen a pattern only when the evidence becomes meaningful.'
        })}

        ${WhyThisCard({
          title: 'One result is not a permanent pattern',
          children:
            'Experiments can produce new evidence. Repeated results can strengthen a memory, while conflicting results can change it.'
        })}

        ${EvidenceCard({
          title: 'Current memory confidence',
          evidence:
            'The strongest remembered patterns are connected to practical teaching, step-by-step explanations, and concrete demonstrations.',
          source: 'Content DNA + audience evidence',
          tone: 'secondary'
        })}

      </div>

    </section>

    <section class="panel">

      ${SectionHeader({
        eyebrow: 'Memory update',
        title: 'Learn from your next experiment',
        description:
          'Experiment results can become new evidence for future creator decisions.'
      })}

      <div class="tag-cloud">

        ${Tag({
          children: 'Observe results',
          tone: 'secondary'
        })}

        ${Tag({
          children: 'Compare evidence',
          tone: 'primary'
        })}

        ${Tag({
          children: 'Update memory',
          tone: 'neutral'
        })}

      </div>

      <button
        class="primary-button"
        data-action="memory-update"
      >
        Prepare memory update →
      </button>

    </section>
  `;
}