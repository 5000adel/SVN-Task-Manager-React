// taskService.js
// Currently uses mock data. When Supabase + Vercel is ready:
// replace each function body with: fetch('/api/tasks/...') call

import { tasks } from '../data/tasks';
import { taskAssignments } from '../data/taskAssignments';
import { users } from '../data/users';

// ─── READ ─────────────────────────────────────────────────────────────────────

export async function getTasks() {
    // TODO: replace with → fetch('/api/tasks')
    return tasks;
}

export async function getTaskById(task_id) {
    // TODO: replace with → fetch(`/api/tasks/${task_id}`)
    return tasks.find(t => t.task_id === task_id) ?? null;
}

export async function getTasksByProject(project_id) {
    // TODO: replace with → fetch(`/api/tasks?project_id=${project_id}`)
    return tasks.filter(t => t.project_id === project_id);
}

export async function getTasksByStatus(status) {
    // TODO: replace with → fetch(`/api/tasks?status=${status}`)
    return tasks.filter(t => t.task_status === status);
}

// Returns tasks assigned to a specific employee, with assignment info joined
export async function getTasksByEmployee(user_id) {
    // TODO: replace with → fetch(`/api/tasks?employee_id=${user_id}`)
    const assigned = taskAssignments.filter(a => a.employee_user_id === user_id);
    return assigned.map(a => {
        const task = tasks.find(t => t.task_id === a.task_id);
        const assignedBy = users.find(u => u.user_id === a.assigned_by);
        return {
            ...task,
            assignment_id: a.assignment_id,
            assignment_status: a.assignment_status,
            assigned_time: a.assigned_time,
            assigned_by_name: assignedBy
                ? `${assignedBy.first_name} ${assignedBy.last_name}`
                : "Unknown",
        };
    }).filter(Boolean);
}

// Returns all assignments with employee info joined
export async function getTaskAssignments() {
    // TODO: replace with → fetch('/api/task-assignments')
    return taskAssignments.map(a => {
        const employee = users.find(u => u.user_id === a.employee_user_id);
        const supervisor = users.find(u => u.user_id === a.assigned_by);
        return {
            ...a,
            employee_name: employee
                ? `${employee.first_name} ${employee.last_name}`
                : "Unknown",
            assigned_by_name: supervisor
                ? `${supervisor.first_name} ${supervisor.last_name}`
                : "Unknown",
        };
    });
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

export async function createTask(taskData) {
    // TODO: replace with → fetch('/api/tasks', { method: 'POST', body: JSON.stringify(taskData) })
    console.log("[stub] createTask:", taskData);
    return { ...taskData, task_id: `t-${Date.now()}`, created_at: new Date().toISOString() };
}

export async function updateTask(task_id, taskData) {
    // TODO: replace with → fetch(`/api/tasks/${task_id}`, { method: 'PUT', body: JSON.stringify(taskData) })
    console.log("[stub] updateTask:", task_id, taskData);
    return { task_id, ...taskData };
}

export async function deleteTask(task_id) {
    // TODO: replace with → fetch(`/api/tasks/${task_id}`, { method: 'DELETE' })
    console.log("[stub] deleteTask:", task_id);
    return { success: true };
}

export async function assignTask(assignmentData) {
    // TODO: replace with → fetch('/api/task-assignments', { method: 'POST', body: JSON.stringify(assignmentData) })
    console.log("[stub] assignTask:", assignmentData);
    return {
        ...assignmentData,
        assignment_id: `a-${Date.now()}`,
        assigned_time: new Date().toISOString(),
    };
}

export async function updateAssignment(assignment_id, assignmentData) {
    // TODO: replace with → fetch(`/api/task-assignments/${assignment_id}`, { method: 'PUT', body: JSON.stringify(assignmentData) })
    console.log("[stub] updateAssignment:", assignment_id, assignmentData);
    return { assignment_id, ...assignmentData };
}
