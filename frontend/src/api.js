// In local dev, default to whatever host loaded the page (localhost or a LAN IP)
// instead of a fixed value, so the same build works from a laptop and a phone
// on the same WiFi without needing to rebuild. Production always sets
// REACT_APP_API_BASE_URL explicitly, so this fallback never applies there.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || `http://${window.location.hostname}:4000`;

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    data = null;
  }

  if (!res.ok) {
    const error = new Error((data && data.error) || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function apiGet(path) {
  return apiRequest(path, { method: 'GET' });
}

export function apiPost(path, body) {
  return apiRequest(path, { method: 'POST', body: JSON.stringify(body) });
}

export function apiDelete(path) {
  return apiRequest(path, { method: 'DELETE' });
}

export async function apiGetBlob(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, { credentials: 'include' });
  if (!res.ok) {
    let data = null;
    try {
      data = await res.json();
    } catch (err) {
      data = null;
    }
    const error = new Error((data && data.error) || `Request failed with status ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.blob();
}

export default API_BASE_URL;
