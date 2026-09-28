import {
  EvidenceCard,
  MetricCard,
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';

const contentItems = [
  {
    title: 'How I Debug a React Bug in 5 Minutes',
    platform: 'LinkedIn',
    type: 'Tutorial',
    reach: '18.4K',
    engagement: '7.2%',
    saves: '1.1K',
    pattern: 'Step-by-step teaching',
    evidence: 'Clear implementation steps generated strong save behavior.',
    source: 'Content history · 4 observations'
  },
  {
    title: '3 AI Tools I Use Every Week',
    platform: 'Instagram',
    type: 'List',
    reach: '24.8K',
    engagement: '6.4%',
    saves: '860',
    pattern: 'Practical recommendations',
    evidence: 'Useful tool-focused content consistently attracts repeat engagement.',
    source: 'Content history · 5 observations'
  },
  {
    title: 'My First Month as a Developer',
    platform: 'LinkedIn',
    type: 'Story',
    reach: '12.6K',
    engagement: '5.8%',
    saves: '540',
    pattern: 'Career storytelling',
    evidence: 'Personal experience performs best when paired with concrete lessons.',
    source: 'Content history · 3 observations'
  },
  {
    title: 'Build a Better Developer Workflow',
    platform: 'YouTube',
    type: 'Walkthrough',
    reach: '28.4K',
    engagement: '8.1%',
    saves: '1.6K',
    pattern: 'Proof-led teaching',
    evidence: 'Demonstrations with a visible outcome show strong audience intent.',
    source: 'Content history · 6 observations'
  },
  {
    title: 'What I Wish I Knew Before Learning JavaScript',
    platform: 'Instagram',
    type: 'Story',
    reach: '15.2K',
    engagement: '6.1%',
    saves: '720',
    pattern: 'Practical teaching',
    evidence: 'Experience-based lessons create useful context for newer developers.',
    source: 'Content history · 3 observations'
  },
  {
    title: 'Build Your First AI Project',
    platform: 'YouTube',
    type: 'Walkthrough',
    reach: '31.7K',
    engagement: '8.6%',
    saves: '1.9K',
    pattern: 'Proof-led teaching',
    evidence: 'End-to-end demonstrations show strong save and completion signals.',
    source: 'Content history · 5 observations'
  }
];

const filters = [
  'All content',
  'Tutorial',
  'Story',
  'List',
  'Walkthrough'
];

export function renderContentLibrary() {
  return `
    <section class="welcome-row">
      <div>
        <div class="eyebrow">Content evidence</div>
        <h2>Your content library</h2>
        <p>
          Review the content patterns that are shaping your Content DNA.
        </p>
      </div>

      <button
        class="secondary-button"
        data-route="content-dna"
      >
        View Content DNA →
      </button>
    </section>

    ${SectionHeader({
      eyebrow: 'Library overview',
      title: 'Your content at a glance',
      description:
        'A structured view of recent content and the evidence each piece contributes to your creator memory.'
    })}

    <section class="metric-grid three-col">

      ${MetricCard({
        label: 'Content pieces',
        value: '24',
        detail: 'in current library',
        accent: 'primary'
      })}

      ${MetricCard({
        label: 'Strongest format',
        value: 'Tutorial',
        detail: 'based on observed saves',
        accent: 'secondary'
      })}

      ${MetricCard({
        label: 'Evidence signals',
        value: '18',
        detail: 'patterns observed',
        accent: 'neutral'
      })}

    </section>

    <section class="panel content-library-panel">

      <div class="library-toolbar">

        <div>
          <div class="card-kicker">Content collection</div>
          <h3>Recent content</h3>
          <p class="small-note">
            Explore the evidence behind each content pattern.
          </p>
        </div>

        <div class="content-filters">
          ${filters
            .map(
              (filter, index) => `
                <button
                  class="filter-button ${index === 0 ? 'active' : ''}"
                  data-filter="${filter}"
                >
                  ${filter}
                </button>
              `
            )
            .join('')}
        </div>

      </div>

      <div class="content-list">

        ${contentItems
          .map(
            (item) => `
              <article
                class="content-item"
                data-content-type="${item.type}"
              >

                <div class="content-item-main">

                  <div class="content-item-heading">

                    <div>

                      <div class="content-meta">
                        <span>${item.platform}</span>
                        <span>·</span>
                        <span>${item.type}</span>
                      </div>

                      <h3>${item.title}</h3>

                    </div>

                    ${Tag({
                      children: item.pattern,
                      tone: 'primary'
                    })}

                  </div>

                  <p class="content-evidence">
                    ${item.evidence}
                  </p>

                  <div class="content-stats">

                    <div>
                      <span>Reach</span>
                      <strong>${item.reach}</strong>
                    </div>

                    <div>
                      <span>Engagement</span>
                      <strong>${item.engagement}</strong>
                    </div>

                    <div>
                      <span>Saves</span>
                      <strong>${item.saves}</strong>
                    </div>

                  </div>

                </div>

                <div class="content-item-side">

                  <span class="small-note">
                    Evidence
                  </span>

                  <span class="evidence-mark">
                    ✓
                  </span>

                  <span class="small-note">
                    ${item.source}
                  </span>

                </div>

              </article>
            `
          )
          .join('')}

      </div>

    </section>

    <section class="dashboard-grid">

      <div class="panel">

        ${EvidenceCard({
          title: 'Tutorial content is creating a repeatable signal',
          evidence:
            'Step-by-step content appears repeatedly among the stronger save and engagement patterns in the current content history.',
          source: 'Content history · multiple observations',
          tone: 'primary'
        })}

      </div>

      <div class="panel">

        ${WhyThisCard({
          title: 'Why keep this evidence?',
          children:
            'SignalDNA uses individual content observations to build a longer-term understanding of what works for this creator.'
        })}

      </div>

    </section>
  `;
}

export function mountContentLibrary() {
  const filterButtons =
    document.querySelectorAll('.filter-button');

  const contentItems =
    document.querySelectorAll('.content-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {

      const selectedFilter =
        button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove('active');
      });

      button.classList.add('active');

      contentItems.forEach((item) => {

        const contentType =
          item.dataset.contentType;

        if (
          selectedFilter === 'All content' ||
          contentType === selectedFilter
        ) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }

      });

    });
  });
}