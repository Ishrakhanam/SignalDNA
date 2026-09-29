import {
  EvidenceCard,
  MetricCard,
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';

/*
 * Frontend API base.
 * Automatically uses the same hostname as the frontend.
 *
 * Example:
 * http://127.0.0.1:5500
 *        ↓
 * http://127.0.0.1:3000/api
 *
 * Or:
 * http://localhost:5500
 *        ↓
 * http://localhost:3000/api
 */
const API_BASE =
  `${window.location.protocol}//${window.location.hostname}:3000/api`;

let dashboardState = {
  creator: null,
  contentDNA: null,
  memory: null,
  loading: false
};

function performanceChart() {
  return `
    <div class="chart-wrap">
      <canvas
        id="performanceChart"
        aria-label="Recent content performance">
      </canvas>
    </div>
  `;
}

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'CR';
}

function formatNumber(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return new Intl.NumberFormat('en-US', {
    notation: number >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(number);
}

function getCreatorId(creatorResponse) {
  const creator =
    creatorResponse?.creator ||
    creatorResponse?.data ||
    creatorResponse;

  return (
    creator?.id ||
    creator?.creatorId ||
    creator?.creator_id ||
    creatorResponse?.creatorId ||
    null
  );
}

function getCreatorObject(response) {
  return (
    response?.creator ||
    response?.data ||
    response ||
    {}
  );
}

function getDNA(response) {
  return (
    response?.contentDNA ||
    response?.contentDna ||
    response?.dna ||
    {}
  );
}

function getArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [];
}

function renderCreatorSearch() {
  return `
    <section class="panel creator-analysis-panel">
      ${SectionHeader({
        eyebrow: 'Creator analysis',
        title: 'Analyze a creator',
        description:
          'Enter a YouTube Channel ID to load real creator evidence.'
      })}

      <div class="creator-search-row">
        <input
          id="creatorIdInput"
          class="creator-id-input"
          type="text"
          placeholder="Enter YouTube Channel ID"
          autocomplete="off"
        />

        <button
          id="analyzeCreatorButton"
          class="primary-button"
          type="button">
          Analyze creator
        </button>
      </div>

      <div id="analysisStatus" class="small-note">
        Ready to analyze.
      </div>
    </section>
  `;
}

function renderEmptyState() {
  return `
    <section class="panel">
      <div class="empty-state">
        <div class="card-kicker">Creator workspace</div>

        <h3>No creator analyzed yet</h3>

        <p>
          Enter a YouTube Channel ID above to load real creator data,
          Content DNA and Hindsight memory.
        </p>
      </div>
    </section>
  `;
}

function renderCreatorOverview(creator, dnaResponse) {
  const creatorData = getCreatorObject(creator);
  const baseline = dnaResponse?.baseline || {};

  const name =
    creatorData.name ||
    creatorData.title ||
    creatorData.channelName ||
    creatorData.channel_name ||
    'Creator';

  const subscribers =
    creatorData.subscribers ??
    creatorData.subscriberCount ??
    creatorData.subscriber_count;

  const videosAnalyzed =
    dnaResponse?.videosAnalyzed ??
    creatorData.videosAnalyzed ??
    creatorData.videoCount;

  return `
    ${SectionHeader({
      eyebrow: 'Creator overview',
      title: name,
      description:
        'Real creator evidence loaded from SignalDNA.'
    })}

    <section class="profile-strip">
      <div class="creator-avatar">
        ${initials(name)}
      </div>

      <div class="creator-copy">
        <strong>${name}</strong>

        <span>
          ${
            creatorData.niche ||
            creatorData.description ||
            'YouTube creator'
          }
        </span>
      </div>

      <div class="profile-stat">
        <span>Subscribers</span>
        <strong>${formatNumber(subscribers)}</strong>
      </div>

      <div class="profile-stat">
        <span>Videos analyzed</span>
        <strong>${formatNumber(videosAnalyzed)}</strong>
      </div>
    </section>

    <section class="metric-grid three-col">

      ${MetricCard({
        label: 'Average views',
        value: formatNumber(baseline.averageViews),
        detail: 'analyzed videos',
        accent: 'primary'
      })}

      ${MetricCard({
        label: 'Average likes',
        value: formatNumber(baseline.averageLikes),
        detail: 'analyzed videos',
        accent: 'secondary'
      })}

      ${MetricCard({
        label: 'Average comments',
        value: formatNumber(baseline.averageComments),
        detail: 'analyzed videos',
        accent: 'neutral'
      })}

    </section>
  `;
}

function renderDNA(dnaResponse) {
  const dna = getDNA(dnaResponse);

  const topics = getArray(
    dna.topics ||
    dna.topicPatterns ||
    dna.contentTopics
  );

  const formats = getArray(
    dna.formats ||
    dna.formatPatterns
  );

  const hooks = getArray(
    dna.hooks ||
    dna.hookPatterns
  );

  const emotions = getArray(
    dna.emotionalPatterns ||
    dna.emotions ||
    dna.emotionalSignals
  );

  const strongContent = getArray(
    dna.strongPerformingContent ||
    dna.strongPerformers ||
    dna.topPerformingContent
  );

  const audienceInterests = getArray(
    dna.audienceInterests ||
    dna.audienceThemes ||
    dna.demand
  );

  return `
    <section class="dashboard-grid">

      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Content DNA',
          title: 'Recurring creator patterns',
          description:
            'Patterns identified from the creator’s analyzed content.'
        })}

        <div class="card-kicker">Topics</div>

        <div class="tag-cloud">
          ${
            topics.length
              ? topics
                  .map(item =>
                    Tag({
                      children: item,
                      tone: 'primary'
                    })
                  )
                  .join('')
              : '<span class="small-note">No topic signals returned.</span>'
          }
        </div>

        <div
          class="card-kicker"
          style="margin-top:20px;"
        >
          Formats
        </div>

        <div class="tag-cloud">
          ${
            formats.length
              ? formats
                  .map(item =>
                    Tag({
                      children: item,
                      tone: 'secondary'
                    })
                  )
                  .join('')
              : '<span class="small-note">No format signals returned.</span>'
          }
        </div>
      </div>

      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Creative signals',
          title: 'Hooks & emotional patterns',
          description:
            'Recurring creative characteristics identified by the analysis.'
        })}

        <div class="card-kicker">Hooks</div>

        <div class="tag-cloud">
          ${
            hooks.length
              ? hooks
                  .map(item =>
                    Tag({
                      children: item,
                      tone: 'primary'
                    })
                  )
                  .join('')
              : '<span class="small-note">No hook signals returned.</span>'
          }
        </div>

        <div
          class="card-kicker"
          style="margin-top:20px;"
        >
          Emotional patterns
        </div>

        <div class="tag-cloud">
          ${
            emotions.length
              ? emotions
                  .map(item =>
                    Tag({
                      children: item,
                      tone: 'secondary'
                    })
                  )
                  .join('')
              : '<span class="small-note">No emotional signals returned.</span>'
          }
        </div>
      </div>

    </section>

    <section class="dashboard-grid">

      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Strong-performing content',
          title: 'What is working',
          description:
            'Signals associated with stronger-performing content.'
        })}

        ${
          strongContent.length
            ? strongContent
                .map(
                  (item, index) => `
                    <div class="demand-row">
                      <span class="rank">
                        ${String(index + 1).padStart(2, '0')}
                      </span>

                      <strong>${item}</strong>
                    </div>
                  `
                )
                .join('')
            : `
              <span class="small-note">
                No strong-performing content signals returned.
              </span>
            `
        }
      </div>

      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Audience interests',
          title: 'What the audience cares about',
          description:
            'Audience themes connected to the analyzed creator data.'
        })}

        <div class="tag-cloud">
          ${
            audienceInterests.length
              ? audienceInterests
                  .map(item =>
                    Tag({
                      children: item,
                      tone: 'primary'
                    })
                  )
                  .join('')
              : `
                <span class="small-note">
                  No audience-interest signals returned.
                </span>
              `
          }
        </div>

        ${WhyThisCard({
          title: 'Why these signals?',
          children:
            'These patterns are derived from the creator data analyzed by SignalDNA.'
        })}
      </div>

    </section>
  `;
}

function renderMemorySection(memoryResponse) {
  const memories =
    memoryResponse?.memories ||
    memoryResponse?.data ||
    [];

  const memoryArray = Array.isArray(memories)
    ? memories
    : [];

  return `
    <section class="panel">
      ${SectionHeader({
        eyebrow: 'Hindsight Memory',
        title: 'Persistent creator learning',
        description:
          'Signals retained and recalled from the creator’s content journey.'
      })}

      ${
        memoryArray.length
          ? memoryArray
              .map(
                memory => `
                  <div class="evidence-stack">
                    ${EvidenceCard({
                      title:
                        memory.memory_key ||
                        memory.key ||
                        'Creator learning',

                      evidence:
                        memory.memory_value ||
                        memory.value ||
                        memory.content ||
                        'Stored creator insight.',

                      source:
                        memory.source ||
                        memory.memory_type ||
                        'Hindsight Memory',

                      tone: 'primary'
                    })}
                  </div>
                `
              )
              .join('')
          : `
            <div class="small-note">
              No recalled memories were returned for this creator yet.
            </div>
          `
      }
    </section>
  `;
}

async function analyzeCreator(channelId) {
  let status =
    document.getElementById('analysisStatus');

  const button =
    document.getElementById(
      'analyzeCreatorButton'
    );

  if (!channelId) {
    if (status) {
      status.textContent =
        'Please enter a YouTube Channel ID.';
    }

    return;
  }

  dashboardState.loading = true;

  if (button) {
    button.disabled = true;
    button.textContent = 'Analyzing...';
  }

  if (status) {
    status.textContent =
      'Loading creator data...';
  }

  try {
    /*
     * 1. Find/create the creator
     */
    const creatorResponse = await fetch(
      `${API_BASE}/creator?platform=youtube&creatorId=${encodeURIComponent(channelId)}`
    );

    if (!creatorResponse.ok) {
      throw new Error(
        `Creator request failed (${creatorResponse.status})`
      );
    }

    const creatorData =
      await creatorResponse.json();

    const internalCreatorId =
      getCreatorId(creatorData);

    if (!internalCreatorId) {
      throw new Error(
        'Creator loaded, but no internal creator ID was returned.'
      );
    }

    dashboardState.creator =
      creatorData;

    /*
     * 2. Sync real videos
     */
    status =
      document.getElementById('analysisStatus');

    if (status) {
      status.textContent =
        'Syncing videos...';
    }

    const videoResponse = await fetch(
      `${API_BASE}/video/sync?platform=youtube&creatorId=${encodeURIComponent(channelId)}&limit=20`
    );

    if (!videoResponse.ok) {
      throw new Error(
        `Video sync failed (${videoResponse.status})`
      );
    }

    /*
     * 3. Sync comments
     */
    status =
      document.getElementById('analysisStatus');

    if (status) {
      status.textContent =
        'Syncing audience comments...';
    }

    const commentsResponse = await fetch(
      `${API_BASE}/video/sync-comments?platform=youtube&creatorId=${encodeURIComponent(channelId)}&limit=50`
    );

    if (!commentsResponse.ok) {
      console.warn(
        'Comment sync returned:',
        commentsResponse.status
      );
    }

    /*
     * 4. Generate Content DNA
     */
    status =
      document.getElementById('analysisStatus');

    if (status) {
      status.textContent =
        'Generating Content DNA...';
    }

    const dnaResponseRaw = await fetch(
      `${API_BASE}/video/content-dna?creatorId=${encodeURIComponent(internalCreatorId)}`
    );

    if (!dnaResponseRaw.ok) {
      throw new Error(
        `Content DNA request failed (${dnaResponseRaw.status})`
      );
    }

    const dnaResponse =
      await dnaResponseRaw.json();

    dashboardState.contentDNA =
      dnaResponse;

    /*
     * 5. Recall Hindsight memory
     */
    status =
      document.getElementById('analysisStatus');

    if (status) {
      status.textContent =
        'Recalling Hindsight memory...';
    }

    try {
      const memoryResponseRaw =
        await fetch(
          `${API_BASE}/memory/recall?creatorId=${encodeURIComponent(internalCreatorId)}`
        );

      if (memoryResponseRaw.ok) {
        dashboardState.memory =
          await memoryResponseRaw.json();
      } else {
        console.warn(
          'Hindsight recall returned:',
          memoryResponseRaw.status
        );
      }
    } catch (memoryError) {
      console.warn(
        'Hindsight recall unavailable:',
        memoryError
      );
    }

    /*
     * 6. Render real dashboard
     */
    const root =
      document.getElementById('view-root');

    if (!root) {
      throw new Error(
        'Dashboard root element was not found.'
      );
    }

    root.innerHTML = `
      ${renderCreatorSearch()}

      ${renderCreatorOverview(
        dashboardState.creator,
        dashboardState.contentDNA
      )}

      ${renderDNA(
        dashboardState.contentDNA
      )}

      ${
        dashboardState.memory
          ? renderMemorySection(
              dashboardState.memory
            )
          : ''
      }
    `;

    /*
     * Reattach the analyzer button
     * because render replaced the DOM.
     */
    attachAnalyzeButton();

    /*
     * Get the NEW status element
     * after rerender.
     */
    const newStatus =
      document.getElementById(
        'analysisStatus'
      );

    if (newStatus) {
      newStatus.textContent =
        'Analysis complete — real creator data loaded.';
    }

  } catch (error) {

    console.error(
      'SignalDNA creator analysis error:',
      error
    );

    const currentStatus =
      document.getElementById(
        'analysisStatus'
      );

    if (currentStatus) {
      currentStatus.textContent =
        `Analysis failed: ${error.message}`;
    }

  } finally {

    dashboardState.loading = false;

    const currentButton =
      document.getElementById(
        'analyzeCreatorButton'
      );

    if (currentButton) {
      currentButton.disabled = false;
      currentButton.textContent =
        'Analyze creator';
    }
  }
}

function attachAnalyzeButton() {
  const button =
    document.getElementById(
      'analyzeCreatorButton'
    );

  const input =
    document.getElementById(
      'creatorIdInput'
    );

  if (!button || !input) {
    return;
  }

  button.onclick = () => {
    analyzeCreator(
      input.value.trim()
    );
  };

  input.onkeydown = event => {
    if (event.key === 'Enter') {
      analyzeCreator(
        input.value.trim()
      );
    }
  };
}

export function renderDashboard() {
  return `
    <section class="welcome-row">
      <div>
        <div class="eyebrow">
          SignalDNA
        </div>

        <h2>
          Creator intelligence workspace.
        </h2>

        <p>
          Analyze a creator and turn real content evidence
          into Content DNA and persistent memory.
        </p>
      </div>
    </section>

    ${renderCreatorSearch()}

    ${
      dashboardState.contentDNA
        ? `
          ${renderCreatorOverview(
            dashboardState.creator,
            dashboardState.contentDNA
          )}

          ${renderDNA(
            dashboardState.contentDNA
          )}

          ${
            dashboardState.memory
              ? renderMemorySection(
                  dashboardState.memory
                )
              : ''
          }
        `
        : renderEmptyState()
    }
  `;
}

export function mountDashboardCharts() {
  attachAnalyzeButton();

  if (!window.Chart) {
    return;
  }

  const canvas =
    document.getElementById(
      'performanceChart'
    );

  if (!canvas) {
    return;
  }

  new Chart(canvas, {
    type: 'line',

    data: {
      labels: [
        'Video 1',
        'Video 2',
        'Video 3',
        'Video 4',
        'Video 5',
        'Video 6',
        'Video 7'
      ],

      datasets: [
        {
          label: 'Content performance',
          data: [
            42,
            49,
            46,
            58,
            55,
            67,
            72
          ],
          borderWidth: 2,
          tension: 0.28,
          pointRadius: 3,
          fill: false
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        }
      },

      scales: {
        y: {
          beginAtZero: true,

          grid: {
            color: '#E7E3E6'
          },

          ticks: {
            color: '#77737A'
          }
        },

        x: {
          grid: {
            display: false
          },

          ticks: {
            color: '#77737A'
          }
        }
      }
    }
  });
}