import { SectionHeader, WhyThisCard } from '../components/cards.js';

export function renderLanding() {
  return `
    <section class="hero-panel">
      <div class="hero-copy">
        <div class="eyebrow">Creator content intelligence</div>
        <h2>Your content has patterns.<br /><span>We remember them.</span></h2>
        <p>SignalDNA connects what you publish, what your audience responds to, and what you should learn next — without reducing your creative work to a score.</p>
        <div class="hero-actions">
          <button class="primary-button" data-route="dashboard">Open dashboard</button>
          <button class="secondary-button" data-route="content-dna">Explore Content DNA</button>
        </div>
      </div>
      <div class="signal-map" aria-label="SignalDNA product flow">
        <div class="flow-node active"><span>01</span>Creator Content</div>
        <div class="flow-line"></div>
        <div class="flow-node"><span>02</span>Audience Understanding</div>
        <div class="flow-line"></div>
        <div class="flow-node featured"><span>03</span>Content DNA</div>
        <div class="flow-line"></div>
        <div class="flow-node"><span>04</span>Persistent Memory</div>
      </div>
    </section>
    <div class="content-grid two-col">
      ${WhyThisCard({ title: 'Built around evidence', children: 'Recommendations should be traceable to observed audience behavior and your own content history, not a generic trend score.' })}
      ${WhyThisCard({ title: 'Memory compounds', children: 'Each result can become evidence for the next experiment, so the workspace gets more specific to a creator over time.' })}
    </div>
    ${SectionHeader({ eyebrow: 'Product loop', title: 'From signals to learning', description: 'A simple operating loop for creator decisions.' })}
    <section class="loop-strip">
      ${['Trends', 'Creator Fit', 'Opportunities', 'Experiments', 'Results', 'Memory Update'].map((item, i) => `<div class="loop-item"><span>0${i + 1}</span>${item}</div>`).join('')}
    </section>`;
}
