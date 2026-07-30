// Default API URL (Local vs Render Production)
let API_BASE_URL = localStorage.getItem('render_api_url') || 'http://localhost:3000';

const apiUrlInput = document.getElementById('apiUrlInput');
const saveApiUrlBtn = document.getElementById('saveApiUrlBtn');
const statusText = document.getElementById('statusText');
const statusDot = document.querySelector('.dot');
const proposalsList = document.getElementById('proposalsList');
const proposalForm = document.getElementById('proposalForm');
const refreshBtn = document.getElementById('refreshBtn');

if (apiUrlInput) {
  apiUrlInput.value = API_BASE_URL;
}

// Save API Base URL
if (saveApiUrlBtn) {
  saveApiUrlBtn.addEventListener('click', () => {
    API_BASE_URL = apiUrlInput.value.trim().replace(/\/$/, '');
    localStorage.setItem('render_api_url', API_BASE_URL);
    checkBackendHealth();
    fetchProposals();
  });
}

// Check Health of Backend Server
async function checkBackendHealth() {
  if (!statusText || !statusDot) return;
  statusText.textContent = 'Connecting to Backend...';
  statusDot.classList.remove('connected');
  statusDot.classList.add('pulse');

  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    const data = await res.json();
    if (data.status === 'ok') {
      statusText.textContent = 'Backend Connected';
      statusDot.classList.add('connected');
      statusDot.classList.remove('pulse');
    }
  } catch (err) {
    statusText.textContent = 'Backend Disconnected';
    statusDot.classList.remove('connected');
    statusDot.classList.remove('pulse');
  }
}

// Fetch proposals from API
async function fetchProposals() {
  if (!proposalsList) return;
  proposalsList.innerHTML = '<div class="loading-spinner">Fetching data from backend...</div>';
  try {
    const res = await fetch(`${API_BASE_URL}/api/proposals`);
    const result = await res.json();

    if (result.success && result.data.length > 0) {
      proposalsList.innerHTML = result.data.map(item => `
        <div class="proposal-item">
          <div class="proposal-info">
            <h4>${escapeHtml(item.title)}</h4>
            <p>Client: ${escapeHtml(item.client)}</p>
          </div>
          <div class="proposal-tag">${escapeHtml(item.amount)}</div>
        </div>
      `).join('');
    } else {
      proposalsList.innerHTML = '<p class="text-muted">No proposals found.</p>';
    }
  } catch (err) {
    proposalsList.innerHTML = `<p style="color: #ef4444; font-size: 0.85rem;">Failed to fetch from backend at <code>${API_BASE_URL}</code>. Make sure server is running.</p>`;
  }
}

// Submit new proposal to API
if (proposalForm) {
  proposalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const client = document.getElementById('client').value;
    const amount = document.getElementById('amount').value;

    try {
      const res = await fetch(`${API_BASE_URL}/api/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, client, amount })
      });
      const result = await res.json();
      if (result.success) {
        proposalForm.reset();
        fetchProposals();
      }
    } catch (err) {
      alert('Error submitting proposal to backend server.');
    }
  });
}

if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    checkBackendHealth();
    fetchProposals();
  });
}

// Helper for security
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial Load
checkBackendHealth();
fetchProposals();
