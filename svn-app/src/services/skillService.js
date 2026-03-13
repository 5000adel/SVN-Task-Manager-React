// skillService.js
// Currently uses mock data. When Supabase + Vercel is ready:
// replace each function body with fetch('/api/skills/...') call

import { skills, employeeSkills, skillRequirements } from '../data/skills';

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getSkills() {
    // TODO: replace with → fetch('/api/skills')
    return skills;
}

export async function getSkillsForEmployee(user_id) {
    // TODO: replace with → fetch(`/api/skills?employee_id=${user_id}`)
    const ids = employeeSkills
        .filter(es => es.user_id === user_id)
        .map(es => es.skill_id);
    return skills.filter(s => ids.includes(s.skill_id));
}

export async function getSkillsForTask(task_id) {
    // TODO: replace with → fetch(`/api/skills?task_id=${task_id}`)
    const ids = skillRequirements
        .filter(sr => sr.task_id === task_id)
        .map(sr => sr.skill_id);
    return skills.filter(s => ids.includes(s.skill_id));
}

export async function getEmployeeSkills() {
    // TODO: replace with → fetch('/api/employee-skills')
    return employeeSkills;
}

export async function getSkillRequirements() {
    // TODO: replace with → fetch('/api/skill-requirements')
    return skillRequirements;
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

export async function addSkillToEmployee(user_id, skill_id) {
    // TODO: replace with → fetch('/api/employee-skills', { method: 'POST', body: JSON.stringify({ user_id, skill_id }) })
    console.log('[stub] addSkillToEmployee:', user_id, skill_id);
    return { employee_skill_id: Date.now(), user_id, skill_id };
}

export async function removeSkillFromEmployee(user_id, skill_id) {
    // TODO: replace with → fetch(`/api/employee-skills?user_id=${user_id}&skill_id=${skill_id}`, { method: 'DELETE' })
    console.log('[stub] removeSkillFromEmployee:', user_id, skill_id);
    return { success: true };
}

export async function setEmployeeSkills(user_id, skill_ids) {
    // TODO: replace with → fetch(`/api/employee-skills/${user_id}`, { method: 'PUT', body: JSON.stringify({ skill_ids }) })
    console.log('[stub] setEmployeeSkills:', user_id, skill_ids);
    return { success: true };
}
