// logService.js
// Currently uses mock data. When Supabase + Vercel is ready:
// replace each function body with: fetch('/api/logs/...') call

import { logs } from '../data/logs';
import { users } from '../data/users';

// ─── READ ─────────────────────────────────────────────────────────────────────

// Returns logs with user info joined
export async function getLogs() {
    // TODO: replace with → fetch('/api/logs')
    return logs.map(log => {
        const user = users.find(u => u.user_id === log.user_id);
        return {
            ...log,
            user_name: user ? `${user.first_name} ${user.last_name}` : "System",
        };
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export async function getLogsByType(entity_type) {
    // TODO: replace with → fetch(`/api/logs?entity_type=${entity_type}`)
    const all = await getLogs();
    return all.filter(l => l.entity_type === entity_type);
}

export async function getLogsByEntity(entity_type, entity_id) {
    // TODO: replace with → fetch(`/api/logs?entity_type=${entity_type}&entity_id=${entity_id}`)
    const all = await getLogs();
    return all.filter(l => l.entity_type === entity_type && l.entity_id === entity_id);
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

export async function createLog(logData) {
    // TODO: replace with → fetch('/api/logs', { method: 'POST', body: JSON.stringify(logData) })
    console.log("[stub] createLog:", logData);
    return {
        ...logData,
        log_id: Date.now(),
        timestamp: new Date().toISOString(),
    };
}
