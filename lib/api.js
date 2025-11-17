// Get session from storage
export function getSessionId() {
  return sessionStorage.getItem('opdms_session_id');
}

// Set session in storage
export function setSessionId(sessionId) {
  sessionStorage.setItem('opdms_session_id', sessionId);
}

// Clear session from storage
export function clearSessionId() {
  sessionStorage.removeItem('opdms_session_id');
  sessionStorage.removeItem('opdms_user');
}

// API request helper
export async function apiRequest(method, url, data) {
  const sessionId = getSessionId();

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(sessionId ? { Authorization: `Bearer ${sessionId}` } : {}),
    },
  };

  if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'Request failed' }));

    // Copy all error properties from the API response into the thrown error
    const errorObj = new Error(
      error.error || `Request failed with status ${response.status}`
    );
    Object.assign(errorObj, error);

    throw errorObj;
  }

  return response.json();
}
