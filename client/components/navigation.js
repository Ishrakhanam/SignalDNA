const NAV_ITEMS = [
  { id: 'landing', label: 'Overview', icon: '◫' },
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'content-library', label: 'Content Library', icon: '▤' },
  { id: 'audience-intelligence', label: 'Audience Intelligence', icon: '◎' },
  { id: 'content-dna', label: 'Content DNA', icon: '◇' },
  { id: 'trends', label: 'Trends', icon: '↗' },
  { id: 'opportunities', label: 'Opportunities', icon: '✦' },
  { id: 'experiments', label: 'Experiments', icon: '⌁' },
  { id: 'memory', label: 'Memory', icon: '▥' },
  { id: 'settings', label: 'Settings', icon: '⚙' }
];

export function renderSidebar(activeView) {
  return `
    <div class="sidebar-brand">
      <div class="brand-mark" aria-hidden="true">S</div>
      <div>
        <div class="brand-name">SignalDNA</div>
        <div class="brand-caption">Content intelligence</div>
      </div>
      <button class="icon-button sidebar-close" data-action="close-sidebar" aria-label="Close navigation">×</button>
    </div>
    <div class="sidebar-section-label">Workspace</div>
    <nav class="nav-list">
      ${NAV_ITEMS.map(item => `
        <button class="nav-item ${item.id === activeView ? 'active' : ''}" data-route="${item.id}">
          <span class="nav-icon" aria-hidden="true">${item.icon}</span>
          <span>${item.label}</span>
        </button>`).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="memory-mini">
        <span class="status-dot"></span>
        <div>
          <strong>Memory is learning</strong>
          <span>Patterns update as evidence accumulates.</span>
        </div>
      </div>
    </div>`;
}

export function renderTopbar(title, subtitle = '') {
  return `
    <button class="mobile-menu icon-button" data-action="open-sidebar" aria-label="Open navigation">☰</button>
    <div class="topbar-copy">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ''}
    </div>
    <div class="topbar-actions">
      <button class="topbar-link" data-route="memory">Memory</button>
      <div class="avatar" aria-label="Creator profile">AK</div>
    </div>`;
}

export { NAV_ITEMS };
