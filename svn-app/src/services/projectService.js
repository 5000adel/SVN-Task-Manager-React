// projectService.js
// Currently uses mock data. When Supabase + Vercel is ready:
// replace each function body with: fetch('/api/projects/...') call

import { projects } from '../data/projects';
import { projectProgress } from '../data/projectProgress';

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getProjects() {
    // TODO: replace with → fetch('/api/projects')
    return projects;
}

export async function getProjectById(project_id) {
    // TODO: replace with → fetch(`/api/projects/${project_id}`)
    return projects.find(p => p.project_id === project_id) ?? null;
}

export async function getProjectsByStatus(status) {
    // TODO: replace with → fetch(`/api/projects?status=${status}`)
    return projects.filter(p => p.project_status === status);
}

export async function getProjectProgress(project_id) {
    // TODO: replace with → fetch(`/api/projects/${project_id}/progress`)
    return projectProgress.find(p => p.project_id === project_id) ?? null;
}

export async function getAllProjectProgress() {
    // TODO: replace with → fetch('/api/projects/progress')
    return projectProgress;
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

export async function createProject(projectData) {
    // TODO: replace with → fetch('/api/projects', { method: 'POST', body: JSON.stringify(projectData) })
    console.log("[stub] createProject:", projectData);
    return { ...projectData, project_id: `p-${Date.now()}`, created_at: new Date().toISOString() };
}

export async function updateProject(project_id, projectData) {
    // TODO: replace with → fetch(`/api/projects/${project_id}`, { method: 'PUT', body: JSON.stringify(projectData) })
    console.log("[stub] updateProject:", project_id, projectData);
    return { project_id, ...projectData };
}

export async function deleteProject(project_id) {
    // TODO: replace with → fetch(`/api/projects/${project_id}`, { method: 'DELETE' })
    console.log("[stub] deleteProject:", project_id);
    return { success: true };
}

export async function updateProjectProgress(project_id, progressData) {
    // TODO: replace with → fetch(`/api/projects/${project_id}/progress`, { method: 'PUT', body: JSON.stringify(progressData) })
    console.log("[stub] updateProjectProgress:", project_id, progressData);
    return { project_id, ...progressData, last_updated: new Date().toISOString() };
}
