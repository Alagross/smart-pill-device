const API_BASE_URL = 'http://localhost:8000/api';

export async function createWrap(data) {
    const response = await fetch(`${API_BASE_URL}/wraps/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    });

    return response.ok ? await response.json() : null;
}

export async function listWraps(filter) {
    const response = await fetch(`${API_BASE_URL}/wraps/list/?filter=${filter}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    return response.ok ? await response.json() : [];
}

export async function likeWrap(wrapId) {
    await fetch(`${API_BASE_URL}/wraps/${wrapId}/like/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}

export async function followUser(userId) {
    await fetch(`${API_BASE_URL}/users/${userId}/follow/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
}
