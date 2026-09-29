import {
  EvidenceCard,
  WhyThisCard,
  SectionHeader,
  Tag
} from '../components/cards.js';

const DEFAULT_CREATOR_ID =
  'bb6a0826-e6ba-47b3-8f3e-001f1712330f';

function getCreatorId() {
  return (
    localStorage.getItem('signaldna_creator_id') ||
    DEFAULT_CREATOR_ID
  );
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderExperiment(experiment, creator) {
  const talkingPoints = Array.isArray(experiment.talkingPoints)
    ? experiment.talkingPoints
    : [];

  const successMetrics = Array.isArray(experiment.successMetrics)
    ? experiment.successMetrics
    : [];

  return `
    ${SectionHeader({
      eyebrow: 'SignalDNA workspace',
      title: 'Experiments',
      description: 'Small tests that turn content hypotheses into evidence.'
    })}

    <section class="panel experiment-intro">
      <div>
        <div class="card-kicker">Experiment workspace</div>

        <h2>Test one idea. Learn something useful.</h2>

        <p>
          Experiments connect opportunities to measurable content tests.
          The goal is learning, not publishing a large content plan.
        </p>
      </div>

      <span class="tag tag-primary">
        ${escapeHtml(experiment.status || 'planned')}
      </span>
    </section>

    <section class="experiment-layout">

      <div class="panel experiment-main">

        <div class="card-kicker">
          Current experiment
        </div>

        <h2>
          ${escapeHtml(experiment.title)}
        </h2>

        <p class="experiment-description">
          ${escapeHtml(
            experiment.opening ||
            'Create one focused piece of content and observe how the audience responds.'
          )}
        </p>

        <div class="experiment-field">
          <span>Hypothesis</span>

          <strong>
            ${escapeHtml(experiment.hypothesis)}
          </strong>
        </div>

        <div class="experiment-details">

          <div>
            <span>Format</span>

            <strong>
              ${escapeHtml(experiment.format)}
            </strong>
          </div>

          <div>
            <span>Target duration</span>

            <strong>
              ${escapeHtml(experiment.targetDuration)} seconds
            </strong>
          </div>

          <div>
            <span>CTA</span>

            <strong>
              ${escapeHtml(experiment.cta)}
            </strong>
          </div>

        </div>

        <div class="experiment-field">

          <span>Hook</span>

          <strong>
            ${escapeHtml(experiment.hook)}
          </strong>

        </div>

        <div class="experiment-field">

          <span>Structure</span>

          <strong>
            ${escapeHtml(experiment.structure)}
          </strong>

        </div>

        <div class="experiment-field">

          <span>Talking points</span>

          <ul>
            ${talkingPoints
              .map(
                point => `
                  <li>
                    ${escapeHtml(point)}
                  </li>
                `
              )
              .join('')}
          </ul>

        </div>

        <div class="experiment-field">

          <span>Success metrics</span>

          <div class="tag-cloud">

            ${successMetrics
              .map(metric =>
                Tag({
                  children: escapeHtml(metric),
                  tone: 'secondary'
                })
              )
              .join('')}

          </div>

        </div>

        <div class="experiment-actions">

          <button
            class="primary-button"
            data-action="start-experiment"
          >
            Start experiment
          </button>

          <button
            class="secondary-button"
            data-route="opportunities"
          >
            Back to opportunities
          </button>

        </div>

      </div>

      <div class="panel">

        ${SectionHeader({
          eyebrow: 'Creator context',
          title: 'Why this experiment?',
          description:
            'This experiment is connected to the selected creator and the opportunity that generated it.'
        })}

        <div class="tag-cloud">

          ${Tag({
            children: escapeHtml(creator?.name || 'Creator'),
            tone: 'secondary'
          })}

          ${Tag({
            children: escapeHtml(creator?.handle || ''),
            tone: 'primary'
          })}

        </div>

        ${EvidenceCard({
          title: 'Experiment hypothesis',
          evidence:
            experiment.hypothesis ||
            'This experiment is designed to generate measurable audience feedback.',
          source: 'Experiment evidence',
          tone: 'secondary'
        })}

        ${EvidenceCard({
          title: 'Opportunity connection',
          evidence:
            'This experiment was generated from a SignalDNA opportunity based on current trend signals and creator context.',
          source: 'Opportunity evidence',
          tone: 'primary'
        })}

      </div>

    </section>

    <section class="panel experiment-learning">

      ${SectionHeader({
        eyebrow: 'Learning plan',
        title: 'What should we remember?',
        description:
          'After the experiment, the result can become new evidence for creator memory.'
      })}

      <div class="learning-grid">

        <div class="learning-item">
          <span>01</span>
          <strong>Observe</strong>
          <p>Record meaningful audience response.</p>
        </div>

        <div class="learning-item">
          <span>02</span>
          <strong>Compare</strong>
          <p>Compare the result with similar content.</p>
        </div>

        <div class="learning-item">
          <span>03</span>
          <strong>Remember</strong>
          <p>Capture the useful learning for future decisions.</p>
        </div>

      </div>

      ${WhyThisCard({
        title: 'Experiments improve memory',
        children:
          'A result is useful when it changes what SignalDNA understands about your content.'
      })}

    </section>
  `;
}

export function renderExperiments() {

  setTimeout(async () => {

    const root = document.getElementById('view-root');

    if (!root) return;

    const creatorId = getCreatorId();

    try {

      const response = await fetch(
        `http://localhost:3000/api/experiments?creatorId=${encodeURIComponent(
          creatorId
        )}`
      );

      if (!response.ok) {
        throw new Error(
          `Experiments API returned ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.error || 'Failed to load experiments'
        );
      }

      localStorage.setItem(
        'signaldna_creator_id',
        creatorId
      );

      if (!data.experiments || data.experiments.length === 0) {

        root.innerHTML = `
          ${SectionHeader({
            eyebrow: 'SignalDNA workspace',
            title: 'Experiments',
            description:
              'Small tests that turn content hypotheses into evidence.'
          })}

          <section class="panel">

            <h2>No experiments yet</h2>

            <p>
              No experiments are available for this creator.
            </p>

          </section>
        `;

        return;
      }

      root.innerHTML = renderExperiment(
        data.experiments[0],
        data.creator
      );

    } catch (error) {

      console.error(
        '❌ Failed to load experiments:',
        error
      );

      root.innerHTML = `
        ${SectionHeader({
          eyebrow: 'SignalDNA workspace',
          title: 'Experiments',
          description:
            'Small tests that turn content hypotheses into evidence.'
        })}

        <section class="panel">

          <h2>Could not load experiments</h2>

          <p>
            ${escapeHtml(error.message)}
          </p>

          <button
            class="primary-button"
            onclick="window.location.reload()"
          >
            Retry
          </button>

        </section>
      `;
    }

  }, 0);

  return `
    ${SectionHeader({
      eyebrow: 'SignalDNA workspace',
      title: 'Experiments',
      description:
        'Small tests that turn content hypotheses into evidence.'
    })}

    <section class="panel">

      <div class="card-kicker">
        SignalDNA
      </div>

      <h2>
        Loading experiments...
      </h2>

      <p>
        Connecting opportunities to measurable experiments.
      </p>

    </section>
  `;
}