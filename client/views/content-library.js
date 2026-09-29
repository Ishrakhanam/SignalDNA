import {
  EvidenceCard,
  MetricCard,
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';

const API_BASE =
  `${window.location.protocol}//${window.location.hostname}:3000/api`;

const demoContentItems = [
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

let contentState = {
  items: demoContentItems,
  loading: true,
  usingDemoData: true,
  error: null
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatNumber(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return escapeHtml(value);
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toLocaleString();
}

function formatPercentage(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return escapeHtml(value);
  }

  return `${number.toFixed(1)}%`;
}

function getFirstValue(object, keys) {
  for (const key of keys) {
    if (
      object &&
      object[key] !== undefined &&
      object[key] !== null &&
      object[key] !== ''
    ) {
      return object[key];
    }
  }

  return null;
}

function normalizeVideo(video) {
  const title = getFirstValue(video, [
    'title',
    'name',
    'videoTitle'
  ]) || 'Untitled video';

  const platform =
    getFirstValue(video, [
      'platform',
      'source',
      'network'
    ]) || 'YouTube';

  const type =
    getFirstValue(video, [
      'type',
      'contentType',
      'format'
    ]) || 'Video';

  const reachValue = getFirstValue(video, [
    'reach',
    'views',
    'viewCount',
    'viewsCount'
  ]);

  const engagementValue = getFirstValue(video, [
    'engagement',
    'engagementRate',
    'engagement_rate'
  ]);

  const savesValue = getFirstValue(video, [
    'saves',
    'saveCount',
    'savedCount'
  ]);

  const pattern =
    getFirstValue(video, [
      'pattern',
      'contentPattern',
      'dnaPattern'
    ]) || 'Content observation';

  const evidence =
    getFirstValue(video, [
      'evidence',
      'description',
      'summary'
    ]) ||
    'This content contributes evidence to your creator pattern history.';

  return {
    title: String(title),
    platform: String(platform),
    type: String(type),
    reach:
      reachValue === null
        ? '—'
        : formatNumber(reachValue),
    engagement:
      engagementValue === null
        ? '—'
        : formatPercentage(engagementValue),
    saves:
      savesValue === null
        ? '—'
        : formatNumber(savesValue),
    pattern: String(pattern),
    evidence: String(evidence),
    source: 'Backend content data'
  };
}

function extractVideos(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const possibleArrays = [
    payload.videos,
    payload.items,
    payload.data,
    payload.results,
    payload.content
  ];

  for (const value of possibleArrays) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    const nestedArrays = [
      payload.data.videos,
      payload.data.items,
      payload.data.results,
      payload.data.content
    ];

    for (const value of nestedArrays) {
      if (Array.isArray(value)) {
        return value;
      }
    }
  }

  return [];
}

async function loadContentData() {
  try {
    const response = await fetch(
      `${API_BASE}/video/sync?platform=youtube&creatorId=UC_x5XG1OV2P6uZZ5FSM9Ttw&limit=20`
    );

    if (!response.ok) {
      throw new Error(`Content API returned ${response.status}`);
    }

    const payload = await response.json();
    const videos = extractVideos(payload);

    if (!videos.length) {
      throw new Error('No content records returned.');
    }

    contentState = {
      items: videos.map(normalizeVideo),
      loading: false,
      usingDemoData: false,
      error: null
    };
  } catch (error) {
    console.warn(
      'SignalDNA Content Library: backend unavailable, keeping frontend data.',
      error
    );

    contentState = {
      items: demoContentItems,
      loading: false,
      usingDemoData: true,
      error: error
    };
  }

  updateContentLibrary();
}

function renderContentItems() {
  if (contentState.loading) {
    return `
      <div class="content-library-loading">
        <div class="small-note">
          Loading content evidence…
        </div>
      </div>
    `;
  }

  if (!contentState.items.length) {
    return `
      <div class="content-library-loading">
        <div class="card-kicker">No content yet</div>
        <p class="small-note">
          No content records are currently available.
        </p>
      </div>
    `;
  }

  return contentState.items
    .map(
      (item) => `
        <article
          class="content-item"
          data-content-type="${escapeHtml(item.type)}"
        >

          <div class="content-item-main">

            <div class="content-item-heading">

              <div>

                <div class="content-meta">
                  <span>${escapeHtml(item.platform)}</span>
                  <span>·</span>
                  <span>${escapeHtml(item.type)}</span>
                </div>

                <h3>${escapeHtml(item.title)}</h3>

              </div>

              ${Tag({
                children: escapeHtml(item.pattern),
                tone: 'primary'
              })}

            </div>

            <p class="content-evidence">
              ${escapeHtml(item.evidence)}
            </p>

            <div class="content-stats">

              <div>
                <span>Reach</span>
                <strong>${escapeHtml(item.reach)}</strong>
              </div>

              <div>
                <span>Engagement</span>
                <strong>${escapeHtml(item.engagement)}</strong>
              </div>

              <div>
                <span>Saves</span>
                <strong>${escapeHtml(item.saves)}</strong>
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
              ${escapeHtml(item.source)}
            </span>

          </div>

        </article>
      `
    )
    .join('');
}

function renderLibraryNotice() {
  if (contentState.loading) {
    return '';
  }

  if (contentState.usingDemoData) {
    return `
      <div class="small-note" style="margin-top: 10px;">
        Live content data will appear when the SignalDNA backend is available.
      </div>
    `;
  }

  return `
    <div class="small-note" style="margin-top: 10px;">
      Showing live content data from SignalDNA.
    </div>
  `;
}

function getLibraryMetrics() {
  const items = contentState.items;

  if (contentState.usingDemoData || !items.length) {
    return {
      count: '24',
      strongest: 'Tutorial',
      evidence: '18'
    };
  }

  const typeCounts = {};

  items.forEach((item) => {
    typeCounts[item.type] =
      (typeCounts[item.type] || 0) + 1;
  });

  const strongestFormat =
    Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Video';

  return {
    count: String(items.length),
    strongest: strongestFormat,
    evidence: String(items.length)
  };
}

function renderLibraryOverview() {
  const metrics = getLibraryMetrics();

  return `
    <section class="metric-grid three-col">

      ${MetricCard({
        label: 'Content pieces',
        value: metrics.count,
        detail: contentState.usingDemoData
          ? 'current library preview'
          : 'from connected content',
        accent: 'primary'
      })}

      ${MetricCard({
        label: 'Strongest format',
        value: metrics.strongest,
        detail: 'based on current content mix',
        accent: 'secondary'
      })}

      ${MetricCard({
        label: 'Evidence signals',
        value: metrics.evidence,
        detail: 'content records observed',
        accent: 'neutral'
      })}

    </section>
  `;
}

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

    <div id="content-library-overview">
      ${renderLibraryOverview()}
    </div>

    <section class="panel content-library-panel">

      <div class="library-toolbar">

        <div>
          <div class="card-kicker">Content collection</div>
          <h3>Recent content</h3>
          <p class="small-note">
            Explore the evidence behind each content pattern.
          </p>

          ${renderLibraryNotice()}

        </div>

        <div class="content-filters">
          ${filters
            .map(
              (filter, index) => `
                <button
                  class="filter-button ${index === 0 ? 'active' : ''}"
                  data-filter="${escapeHtml(filter)}"
                >
                  ${escapeHtml(filter)}
                </button>
              `
            )
            .join('')}
        </div>

      </div>

      <div class="content-list" id="content-library-list">
        ${renderContentItems()}
      </div>

    </section>

    <section class="dashboard-grid">

      <div class="panel">

        ${EvidenceCard({
          title: 'Content evidence builds over time',
          evidence:
            'Individual content pieces become more useful when repeated patterns appear across the creator history.',
          source: contentState.usingDemoData
            ? 'Frontend preview data'
            : 'Live content data',
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

function applyActiveFilter(selectedFilter) {
  const filterButtons =
    document.querySelectorAll('.filter-button');

  const contentItems =
    document.querySelectorAll('.content-item');

  filterButtons.forEach((button) => {
    button.classList.toggle(
      'active',
      button.dataset.filter === selectedFilter
    );
  });

  contentItems.forEach((item) => {
    const contentType =
      item.dataset.contentType;

    item.style.display =
      selectedFilter === 'All content' ||
      contentType === selectedFilter
        ? ''
        : 'none';
  });
}

function updateContentLibrary() {
  const list =
    document.getElementById('content-library-list');

  const overview =
    document.getElementById('content-library-overview');

  if (!list || !overview) {
    return;
  }

  list.innerHTML = renderContentItems();
  overview.innerHTML = renderLibraryOverview();

  const activeButton =
    document.querySelector('.filter-button.active');

  applyActiveFilter(
    activeButton?.dataset.filter || 'All content'
  );

  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      applyActiveFilter(button.dataset.filter);
    });
  });
}

export function mountContentLibrary() {
  document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      applyActiveFilter(button.dataset.filter);
    });
  });

  /*
   * Start with the existing frontend data so the page
   * renders immediately, then try to replace it with
   * live backend data.
   */
  loadContentData();
}