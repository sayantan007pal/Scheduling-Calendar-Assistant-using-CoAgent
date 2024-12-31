const API_URL = 'http://localhost:5000';

export async function getAuthUrl() {
  const response = await fetch(`${API_URL}/auth-url`);
  return await response.json();
}

export async function fetchTokens(code) {
  const response = await fetch(`${API_URL}/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return await response.json();
}

export async function getEvents(tokens) {
  const response = await fetch(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  return await response.json();
}
