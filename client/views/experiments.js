import { EvidenceCard, WhyThisCard, SectionHeader, Tag } from '../components/cards.js';

const experiment = {
  title: 'Teach one workflow end-to-end',
  hypothesis: 'A concrete demonstration may increase meaningful saves.',
  format: 'Build it with me walkthrough',
  duration: '1 content piece',
  successSignal: 'Higher saves compared with recent tutorial content',
  audienceNeed: 'AI productivity + career transition',
  creatorFit: 'Practical teaching + step-by-step structure'
};

export function renderExperiments() {
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
      <span class="tag tag-primary">Draft experiment</span>
    </section>

    <section class="experiment-layout">

      <div class="panel experiment-main">
        <div class="card-kicker">Current experiment</div>
        <h2>${experiment.title}</h2>
        <p class="experiment-description">
          Create one focused piece of content and observe how the audience responds.
        </p>

        <div class="experiment-field">
          <span>Hypothesis</span>
          <strong>${experiment.hypothesis}</strong>
        </div>

        <div class="experiment-details">
          <div>
            <span>Format</span>
            <strong>${experiment.format}</strong>
          </div>

          <div>
            <span>Scope</span>
            <strong>${experiment.duration}</strong>
          </div>

          <div>
            <span>Success signal</span>
            <strong>${experiment.successSignal}</strong>
          </div>
        </div>

        <div class="experiment-actions">
          <button class="primary-button" data-action="start-experiment">
            Start experiment
          </button>

          <button class="secondary-button" data-route="opportunities">
            Back to opportunities
          </button>
        </div>
      </div>

      <div class="panel">
        ${SectionHeader({
          eyebrow: 'Creator context',
          title: 'Why this experiment?',
          description: 'The experiment is connected to existing SignalDNA evidence.'
        })}

        <div class="tag-cloud">
          ${Tag({ children: experiment.audienceNeed, tone: 'secondary' })}
          ${Tag({ children: experiment.creatorFit, tone: 'primary' })}
        </div>

        ${EvidenceCard({
          title: 'Audience demand',
          evidence: 'Recent audience questions show repeated interest in practical AI workflows and career transitions.',
          source: 'Audience evidence',
          tone: 'secondary'
        })}

        ${EvidenceCard({
          title: 'Content pattern',
          evidence: 'Step-by-step teaching and practical demonstrations are recurring patterns in your Content DNA.',
          source: 'Content DNA evidence',
          tone: 'primary'
        })}
      </div>

    </section>

    <section class="panel experiment-learning">
      ${SectionHeader({
        eyebrow: 'Learning plan',
        title: 'What should we remember?',
        description: 'After the experiment, the result can become new evidence for creator memory.'
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
        children: 'A result is useful when it changes what SignalDNA understands about your content.'
      })}
    </section>
  `;
}