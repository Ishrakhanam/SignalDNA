import { EvidenceCard, MetricCard, SectionHeader, Tag, WhyThisCard } from '../components/cards.js';

const demoData = {
  creator: { initials: 'AK', name: 'Aarav Kapoor', niche: 'Tech education · Bengaluru', cadence: '3 posts / week' },
  performance: { reach: '84.2K', engagement: '6.8%', saves: '4.1K' },
  dna: ['Practical teaching', 'Strong hooks', 'Step-by-step', 'Proof-led'],
  demand: ['Debugging workflows', 'AI productivity', 'Career transitions']
};

function performanceChart() {
  return `<div class="chart-wrap"><canvas id="performanceChart" aria-label="Recent content performance"></canvas></div>`;
}

export function renderDashboard() {
  return `
    <section class="welcome-row">
      <div>
        <div class="eyebrow">Workspace signal</div>
        <h2>Good evening, ${demoData.creator.name.split(' ')[0]}.</h2>
        <p>Here is what your current content evidence is saying.</p>
      </div>
      <button class="secondary-button" data-route="content-library">Review content →</button>
    </section>

    <section class="profile-strip">
      <div class="creator-avatar">${demoData.creator.initials}</div>
      <div class="creator-copy"><strong>${demoData.creator.name}</strong><span>${demoData.creator.niche}</span></div>
      <div class="profile-stat"><span>Publishing rhythm</span><strong>${demoData.creator.cadence}</strong></div>
      <div class="profile-stat"><span>Memory observations</span><strong>28</strong></div>
      <button class="text-button" data-route="settings">Edit profile →</button>
    </section>

    ${SectionHeader({ eyebrow: 'Performance overview', title: 'What happened recently', description: 'Demo values are intentionally local and can later be replaced by API data.' })}
    <section class="metric-grid three-col">
      ${MetricCard({ label: 'Audience reach', value: demoData.performance.reach, detail: 'last 30 days', trend: ' +12%', accent: 'primary' })}
      ${MetricCard({ label: 'Engagement rate', value: demoData.performance.engagement, detail: 'content average', trend: ' +0.8%', accent: 'secondary' })}
      ${MetricCard({ label: 'Meaningful saves', value: demoData.performance.saves, detail: 'high-intent actions', trend: ' +18%', accent: 'neutral' })}
    </section>
    <section class="panel chart-panel">
      <div class="panel-heading"><div><div class="card-kicker">Signal over time</div><h3>Recent content performance</h3></div><span class="small-note">Demo data</span></div>
      ${performanceChart()}
    </section>

    <section class="dashboard-grid">
      <div class="panel">
        ${SectionHeader({ eyebrow: 'Content DNA', title: 'Patterns showing up repeatedly', description: 'A compact view of the creative traits currently supported by evidence.' })}
        <div class="tag-cloud">${demoData.dna.map(t => Tag({ children: t, tone: 'primary' })).join('')}</div>
        ${EvidenceCard({ title: 'Practical teaching is a durable signal', evidence: 'Step-by-step posts generated stronger save behavior than broad opinion posts in the demo history.', source: 'Content history · 7 observations', tone: 'primary' })}
      </div>
      <div class="panel">
        ${SectionHeader({ eyebrow: 'Audience demand', title: 'What people are trying to solve', description: 'Themes inferred from the current evidence set.' })}
        <div class="demand-list">${demoData.demand.map((item, i) => `<div class="demand-row"><span class="rank">0${i + 1}</span><strong>${item}</strong><span class="demand-bar"><i style="width:${88 - i * 18}%"></i></span></div>`).join('')}</div>
        ${WhyThisCard({ title: 'Why these themes?', children: 'Demand is shown as a context layer for creator decisions, not as a promise of virality.' })}
      </div>
    </section>

    <section class="decision-grid">
      <div class="panel fit-panel">
        ${SectionHeader({ eyebrow: 'Trend → You', title: 'AI workflows for junior developers', description: 'A demo opportunity connected to your current Content DNA.' })}
        <div class="fit-score"><div class="score-ring">82<span>/100</span></div><div><strong>Strong creator fit</strong><p>Matches practical teaching + step-by-step patterns.</p></div></div>
        <div class="evidence-stack">
          ${EvidenceCard({ title: 'Audience demand overlap', evidence: 'Career transition and AI productivity appear in recent audience questions.', source: 'Audience evidence', tone: 'secondary' })}
          ${EvidenceCard({ title: 'Format compatibility', evidence: 'A 60–90 second walkthrough aligns with your strongest recent format.', source: 'Content evidence', tone: 'default' })}
        </div>
      </div>
      <div class="panel experiment-panel">
        ${SectionHeader({ eyebrow: 'Recommended experiment', title: 'Teach one workflow end-to-end', description: 'A small, testable next step rather than a broad content plan.' })}
        <div class="experiment-card">
          <div class="experiment-number">01</div>
          <div><strong>“Build it with me” walkthrough</strong><p>Show the problem, the implementation, and one measurable result in a single piece.</p></div>
        </div>
        <div class="experiment-meta"><span>Hypothesis</span><strong>Concrete demonstrations may increase saves.</strong></div>
        <button class="primary-button full-width" data-route="experiments">Open experiment workspace</button>
      </div>
    </section>`;
}

export function mountDashboardCharts() {
  if (!window.Chart) return;
  const canvas = document.getElementById('performanceChart');
  if (!canvas) return;
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Sep 1', 'Sep 5', 'Sep 9', 'Sep 13', 'Sep 17', 'Sep 21', 'Sep 25'],
      datasets: [{ label: 'Engagement signal', data: [42, 49, 46, 58, 55, 67, 72], borderWidth: 2, tension: 0.28, pointRadius: 3, fill: false }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#E7E3E6' }, ticks: { color: '#77737A' } }, x: { grid: { display: false }, ticks: { color: '#77737A' } } } }
  });
}
