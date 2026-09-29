import { renderSidebar, renderTopbar } from './components/navigation.js';
import { MemoryUpdateToast } from './components/states.js';

import { renderLanding } from './views/landing.js';

import {
  renderDashboard,
  mountDashboardCharts
} from './views/dashboard.js';

import {
  renderContentLibrary,
  mountContentLibrary
} from './views/content-library.js';

import {
  renderAudienceIntelligence
} from './views/audience-intelligence.js';

import {
  renderContentDNA,
  mountContentDNA
} from './views/content-dna.js';

import { renderOpportunities } from './views/opportunities.js';
import { renderExperiments } from './views/experiments.js';
import { renderSettings } from './views/settings.js';

import {
  renderMemory,
  mountMemory
} from './views/memory.js';

import { renderGenericView } from './views/generic.js';

const routes = {
  landing: {
    title: 'SignalDNA',
    subtitle: 'Your content has patterns. We remember them.',
    render: renderLanding
  },

  dashboard: {
    title: 'Dashboard',
    subtitle: 'Your current content intelligence, in one place.',
    render: renderDashboard
  },

  'content-library': {
    title: 'Content Library',
    subtitle: 'The evidence layer behind your content patterns.',
    render: renderContentLibrary
  },

  'audience-intelligence': {
    title: 'Audience Intelligence',
    subtitle: 'What your audience is trying to understand and solve.',
    render: renderAudienceIntelligence
  },

  'content-dna': {
    title: 'Content DNA',
    subtitle: 'The recurring patterns that make your content yours.',
    render: renderContentDNA
  },

  trends: {
    title: 'Trends',
    subtitle: 'External signals, interpreted through creator context.',
    render: () => renderGenericView('trends')
  },

  opportunities: {
    title: 'Opportunities',
    subtitle: 'Where audience demand and creator fit intersect.',
    render: renderOpportunities
  },

  experiments: {
    title: 'Experiments',
    subtitle: 'Small tests that turn hypotheses into evidence.',
    render: renderExperiments
  },

  memory: {
    title: 'Memory',
    subtitle: 'Persistent context built from your content journey.',
    render: renderMemory
  },

  settings: {
    title: 'Settings',
    subtitle: 'Workspace and creator context.',
    render: renderSettings
  }
};

let currentRoute = 'dashboard';

function getInitialRoute() {
  const hash = window.location.hash
    .replace('#/', '')
    .trim();

  return routes[hash] ? hash : 'dashboard';
}

function renderRoute(route) {
  currentRoute = routes[route] ? route : 'dashboard';

  const page = routes[currentRoute];

  document.getElementById('sidebar').innerHTML =
    renderSidebar(currentRoute);

  document.getElementById('topbar').innerHTML =
    renderTopbar(
      page.title,
      page.subtitle
    );

  document.getElementById('view-root').innerHTML =
    page.render();

  document.body.classList.remove('sidebar-open');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  if (currentRoute === 'dashboard') {
    mountDashboardCharts();
  }

  if (currentRoute === 'content-library') {
    mountContentLibrary();
  }

  if (currentRoute === 'content-dna') {
    mountContentDNA();
  }

  if (currentRoute === 'memory') {
    mountMemory();
  }
}

function navigate(route) {
  if (!routes[route]) return;

  window.location.hash = `/${route}`;

  renderRoute(route);
}

function showToast(message) {
  const root =
    document.getElementById('toast-root');

  root.innerHTML =
    MemoryUpdateToast(message);

  requestAnimationFrame(() => {
    root
      .querySelector('.memory-toast')
      ?.classList.add('show');
  });

  window.setTimeout(() => {
    root
      .querySelector('.memory-toast')
      ?.classList.remove('show');
  }, 4200);
}

document.addEventListener('click', event => {
  const routeTarget =
    event.target.closest('[data-route]');

  if (routeTarget) {
    navigate(routeTarget.dataset.route);
    return;
  }

  const actionTarget =
    event.target.closest('[data-action]');

  if (!actionTarget) return;

  const action =
    actionTarget.dataset.action;

  if (action === 'open-sidebar') {
    document.body.classList.add('sidebar-open');
  }

  if (action === 'close-sidebar') {
    document.body.classList.remove('sidebar-open');
  }

  if (action === 'dismiss-toast') {
    document.getElementById('toast-root').innerHTML = '';
  }

  if (action === 'memory-update') {
    showToast(
      'A new learning has been prepared for review.'
    );
  }

  if (action === 'start-experiment') {
    showToast(
      'Experiment started. Results can be recorded after publishing.'
    );
  }

  if (action === 'save-settings') {
    showToast(
      'Settings saved for this frontend session.'
    );
  }
});

window.addEventListener('hashchange', () => {
  renderRoute(getInitialRoute());
});

renderRoute(getInitialRoute());