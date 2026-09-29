import {
  EvidenceCard,
  SectionHeader,
  Tag,
  WhyThisCard
} from '../components/cards.js';

const API_BASE =
  `${window.location.protocol}//${window.location.hostname}:3000/api`;

const CREATOR_ID =
  'UC_x5XG1OV2P6uZZ5FSM9Ttw';

const demoDnaPatterns = [
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

let dnaState = {
  patterns: demoDnaPatterns,
  confidence: 82,
  loading: true,
  usingDemoData: true
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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

function extractPatterns(payload) {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload;
  }

  const possibleArrays = [
    payload.patterns,
    payload.dnaPatterns,
    payload.contentDNA,
    payload.contentDna,
    payload.data,
    payload.results
  ];

  for (const value of possibleArrays) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    const nestedArrays = [
      payload.data.patterns,
      payload.data.dnaPatterns,
      payload.data.contentDNA,
      payload.data.contentDna,
      payload.data.results
    ];

    for (const value of nestedArrays) {
      if (Array.isArray(value)) {
        return value;
      }
    }
  }

  return [];
}

function normalizePattern(pattern) {
  return {
    title:
      getFirstValue(pattern, [
        'title',
        'name',
        'pattern',
        'label'
      ]) || 'Content pattern',

    description:
      getFirstValue(pattern, [
        'description',
        'summary',
        'details'
      ]) ||
      'A recurring pattern detected across the creator content history.',

    evidence:
      getFirstValue(pattern, [
        'evidence',
        'reason',
        'explanation'
      ]) ||
      'This pattern is supported by content evidence.',

    source:
      getFirstValue(pattern, [
        'source',
        'evidenceSource'
      ]) ||
      'Content history · backend analysis',

    strength:
      getFirstValue(pattern, [
        'strength',
        'confidence',
        'signal'
      ]) || 'Observed'
  };
}

function extractConfidence(payload) {
  const value = getFirstValue(payload, [
    'confidence',
    'score',
    'dnaConfidence'
  ]);

  if (value !== null) {
    const number = Number(value);

    if (Number.isFinite(number)) {
      return Math.round(number);
    }
  }

  if (payload?.data && typeof payload.data === 'object') {
    const nestedValue = getFirstValue(payload.data, [
      'confidence',
      'score',
      'dnaConfidence'
    ]);

    const number = Number(nestedValue);

    if (Number.isFinite(number)) {
      return Math.round(number);
    }
  }

  return 82;
}

function extractCreatorInternalId(payload) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const directId = getFirstValue(payload, [
    'id',
    'creatorId',
    '_id',
    'internalCreatorId'
  ]);

  if (directId) {
    return directId;
  }

  if (payload.creator && typeof payload.creator === 'object') {
    return getFirstValue(payload.creator, [
      'id',
      'creatorId',
      '_id',
      'internalCreatorId'
    ]);
  }

  if (payload.data && typeof payload.data === 'object') {
    return getFirstValue(payload.data, [
      'id',
      'creatorId',
      '_id',
      'internalCreatorId'
    ]);
  }

  return null;
}

function renderPatternTags() {
  return dnaState.patterns
    .map((pattern) =>
      Tag({
        children: escapeHtml(pattern.title),
        tone: 'primary'
      })
    )
    .join('');
}

function renderPatterns() {
  return dnaState.patterns
    .map((pattern, index) => `
      <article class="panel dna-pattern-card">

        <div class="pattern-top">
          <span class="pattern-number">
            ${String(index + 1).padStart(2, '0')}
          </span>

          <span class="pattern-strength">
            ${escapeHtml(pattern.strength)}
          </span>
        </div>

        <h3>${escapeHtml(pattern.title)}</h3>

        <p>
          ${escapeHtml(pattern.description)}
        </p>

        ${EvidenceCard({
          title: 'Evidence',
          evidence: escapeHtml(pattern.evidence),
          source: escapeHtml(pattern.source),
          tone: index % 2 === 0 ? 'primary' : 'secondary'
        })}

      </article>
    `)
    .join('');
}

function renderDnaScore() {
  return `
    <div class="dna-score">
      ${dnaState.confidence}<span>/100</span>
    </div>

    <p>
      Current confidence based on repeated content observations.
    </p>

    <div class="small-note">
      ${
        dnaState.usingDemoData
          ? 'Frontend preview data · Live data will appear when the backend is available'
          : 'Live Content DNA data'
      }
    </div>
  `;
}

function updateContentDNA() {
  const root = document.getElementById('content-dna-root');

  if (!root) return;

  const patternTags =
    document.getElementById('dna-pattern-tags');

  const score =
    document.getElementById('dna-score-container');

  const patternGrid =
    document.getElementById('dna-pattern-grid');

  if (patternTags) {
    patternTags.innerHTML = renderPatternTags();
  }

  if (score) {
    score.innerHTML = renderDnaScore();
  }

  if (patternGrid) {
    patternGrid.innerHTML = renderPatterns();
  }
}

async function loadContentDNA() {
  try {
    /*
     * The Content DNA endpoint expects the backend's
     * internal creator ID, so first resolve the creator
     * using the known YouTube channel ID.
     */
    const creatorResponse = await fetch(
      `${API_BASE}/creator?platform=youtube&creatorId=${encodeURIComponent(CREATOR_ID)}`
    );

    if (!creatorResponse.ok) {
      throw new Error(
        `Creator API returned ${creatorResponse.status}`
      );
    }

    const creatorPayload =
      await creatorResponse.json();

    const internalCreatorId =
      extractCreatorInternalId(creatorPayload);

    if (!internalCreatorId) {
      throw new Error(
        'Could not resolve the internal creator ID.'
      );
    }

    const dnaResponse = await fetch(
      `${API_BASE}/video/content-dna?creatorId=${encodeURIComponent(internalCreatorId)}`
    );

    if (!dnaResponse.ok) {
      throw new Error(
        `Content DNA API returned ${dnaResponse.status}`
      );
    }

    const dnaPayload =
      await dnaResponse.json();

    const patterns =
      extractPatterns(dnaPayload);

    if (!patterns.length) {
      throw new Error(
        'No Content DNA patterns were returned.'
      );
    }

    dnaState = {
      patterns: patterns.map(normalizePattern),
      confidence: extractConfidence(dnaPayload),
      loading: false,
      usingDemoData: false
    };

    updateContentDNA();

  } catch (error) {
    console.warn(
      'SignalDNA Content DNA: backend unavailable, keeping frontend data.',
      error
    );

    dnaState = {
      patterns: demoDnaPatterns,
      confidence: 82,
      loading: false,
      usingDemoData: true
    };

    updateContentDNA();
  }
}

export function renderContentDNA() {
  return `
    <div id="content-dna-root">

      ${SectionHeader({
        eyebrow: 'Content intelligence',
        title: 'Your Content DNA',
        description:
          'The recurring patterns that make your content recognizably yours.'
      })}

      <section class="dna-summary-grid">

        <article class="panel dna-hero">

          <div class="card-kicker">
            Creator pattern profile
          </div>

          <h3>
            Practical. Clear. Proof-led.
          </h3>

          <p>
            Your strongest content patterns are based on repeated evidence
            across your current content library.
          </p>

          <div
            class="tag-cloud"
            id="dna-pattern-tags"
          >
            ${renderPatternTags()}
          </div>

        </article>

        <article class="panel dna-signal-card">

          <div class="card-kicker">
            DNA confidence
          </div>

          <div id="dna-score-container">
            ${renderDnaScore()}
          </div>

        </article>

      </section>

      ${SectionHeader({
        eyebrow: 'Recurring patterns',
        title: 'What keeps showing up',
        description:
          'Each pattern is connected to evidence rather than being treated as a fixed identity.'
      })}

      <section
        class="dna-pattern-grid"
        id="dna-pattern-grid"
      >
        ${renderPatterns()}
      </section>

      <section class="dna-bottom-grid">

        <div class="panel">

          ${SectionHeader({
            eyebrow: 'Why this matters',
            title: 'Patterns guide better decisions',
            description:
              'Content DNA helps SignalDNA connect future opportunities to what already works for you.'
          })}

          ${WhyThisCard({
            title: 'Your DNA is not a fixed label',
            children:
              'These patterns can become stronger, weaker, or change as new content creates new evidence.'
          })}

          <div class="dna-rule-list">

            <div>
              <strong>Repeated evidence</strong>
              <span>
                A pattern becomes meaningful when it appears across
                multiple pieces of content.
              </span>
            </div>

            <div>
              <strong>Creator fit</strong>
              <span>
                Future opportunities should connect to patterns
                you can naturally execute.
              </span>
            </div>

            <div>
              <strong>Continuous learning</strong>
              <span>
                New results can update what SignalDNA remembers
                about your content.
              </span>
            </div>

          </div>

        </div>

        <div class="panel">

          ${SectionHeader({
            eyebrow: 'Memory connection',
            title: 'What should be remembered?',
            description:
              'Potential learnings can become part of your persistent creator context.'
          })}

          <div class="memory-learning-card">

            <div class="memory-learning-icon">
              ↗️
            </div>

            <div>

              <div class="card-kicker">
                Potential learning
              </div>

              <h3>
                Step-by-step teaching is a durable pattern.
              </h3>

              <p>
                Recent evidence suggests that practical walkthroughs
                consistently generate meaningful saves.
              </p>

            </div>

          </div>

          <button
            class="primary-button full-width"
            data-action="memory-update"
          >
            Prepare memory update
          </button>

        </div>

      </section>

    </div>
  `;
}

export function mountContentDNA() {
  /*
   * Render the existing frontend immediately.
   * Then try to replace it with live backend data.
   */
  loadContentDNA();
}