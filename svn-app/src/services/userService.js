// userService.js
// Currently uses mock data. When Supabase + Vercel is ready:
// replace each function body with: fetch('/api/users/...') call

import { users } from '../data/users';

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export async function login(username, password) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    // Store the token for use in future requests
    localStorage.setItem('token', data.token)
    return data.user
}

export function getAuthHeader() {
    const token = localStorage.getItem('token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export function logout() {
    localStorage.removeItem('token')
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