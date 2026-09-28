export function LoadingState({ label = 'Loading signal data…' } = {}) {
  return `<div class="state-card"><span class="loader" aria-hidden="true"></span><span>${label}</span></div>`;
}

export function EmptyState({ title = 'Nothing here yet', description = 'New evidence will appear here as your workspace grows.' } = {}) {
  return `<div class="state-card state-empty"><div class="empty-icon">○</div><strong>${title}</strong><span>${description}</span></div>`;
}

export function ErrorState({ title = 'Something went wrong', description = 'We could not load this section. Try again when the data source is available.' } = {}) {
  return `<div class="state-card state-error"><div class="empty-icon">!</div><strong>${title}</strong><span>${description}</span></div>`;
}

export function MemoryUpdateToast(message = 'Memory update queued for review.') {
  return `
    <div class="memory-toast">
      <div class="toast-icon">✓</div>
      <div><strong>Memory update</strong><span>${message}</span></div>
      <button class="toast-dismiss" data-action="dismiss-toast" aria-label="Dismiss">×</button>
    </div>`;
}
