// userService.js
// Currently uses mock data. When Supabase + Vercel is ready:
// replace each function body with: fetch('/api/users/...') call

import { users } from '../data/users';

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export async function login(username, password) {
    // TODO: replace with → fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) })
    const user = users.find(
        u => u.username === username && u.password_hash === password
    );
    if (!user) throw new Error("Invalid username or password");
    return user;
}

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getUsers() {
    // TODO: replace with → fetch('/api/users')
    return users;
}

export async function getUserById(user_id) {
    // TODO: replace with → fetch(`/api/users/${user_id}`)
    return users.find(u => u.user_id === user_id) ?? null;
}

export async function getUsersByRole(role) {
    // TODO: replace with → fetch(`/api/users?role=${role}`)
    return users.filter(u => u.role === role);
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

export async function createUser(userData) {
    // TODO: replace with → fetch('/api/users', { method: 'POST', body: JSON.stringify(userData) })
    console.log("[stub] createUser:", userData);
    return { ...userData, user_id: `u-${Date.now()}` };
}

export async function updateUser(user_id, userData) {
    // TODO: replace with → fetch(`/api/users/${user_id}`, { method: 'PUT', body: JSON.stringify(userData) })
    console.log("[stub] updateUser:", user_id, userData);
    return { user_id, ...userData };
}

export async function deleteUser(user_id) {
    // TODO: replace with → fetch(`/api/users/${user_id}`, { method: 'DELETE' })
    console.log("[stub] deleteUser:", user_id);
    return { success: true };
}
