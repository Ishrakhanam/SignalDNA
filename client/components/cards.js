export function EvidenceCard({ title, evidence, source = 'Observed pattern', tone = 'default' }) {
  return `
    <article class="evidence-card tone-${tone}">
      <div class="card-kicker">Evidence</div>
      <h3>${title}</h3>
      <p>${evidence}</p>
      <div class="card-meta"><span>${source}</span><span class="evidence-mark">✓</span></div>
    </article>`;
}

export function WhyThisCard({ title = 'Why this matters', children, action = '' }) {
  return `
    <article class="why-card">
      <div class="why-icon">?</div>
      <div class="why-content">
        <div class="card-kicker">Context</div>
        <h3>${title}</h3>
        <p>${children}</p>
        ${action ? `<button class="text-button" data-action="${action}">View evidence →</button>` : ''}
      </div>
    </article>`;
}

export function MetricCard({ label, value, detail, trend = '', accent = 'primary' }) {
  return `
    <article class="metric-card accent-${accent}">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="metric-detail">${detail}${trend ? `<span class="metric-trend">${trend}</span>` : ''}</div>
    </article>`;
}

export function Tag({ children, tone = 'neutral' }) {
  return `<span class="tag tag-${tone}">${children}</span>`;
}

export function SectionHeader({ eyebrow, title, description = '', action = '' }) {
  return `
    <div class="section-header">
      <div>
        ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
        <h2>${title}</h2>
        ${description ? `<p>${description}</p>` : ''}
      </div>
      ${action ? `<button class="secondary-button" data-action="${action}">View all</button>` : ''}
    </div>`;
}
