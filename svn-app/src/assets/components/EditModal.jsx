import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import './styles/EditModal.css';

// EditModal opens on top of ViewCard
// cardType: "task" | "project" | "employee"
// data: the current data object
// onClose: close this modal only
// onSave: callback with updated data

export default function EditModal({ onClose, cardType, data = {} }) {
    const { currentUser, employees, projects } = useApp();
    const { showToast } = useToast();
    const role = currentUser?.role;

    // ── Task edit state ───────────────────────────────────────────────────────
    const [taskForm, setTaskForm] = useState({
        task_name:        data.task?.task_name        ?? '',
        task_description: data.task?.task_description ?? '',
        task_status:      data.task?.task_status      ?? 'To Do',
        target_date:      data.task?.target_date      ?? '',
        assigned_to:      data.assignment?.employee_user_id ?? '',
    });

    // ── Project edit state ────────────────────────────────────────────────────
    const [projectForm, setProjectForm] = useState({
        project_name:        data.project?.project_name        ?? '',
        project_description: data.project?.project_description ?? '',
        project_status:      data.project?.project_status      ?? 'Active',
        start_date:          data.project?.start_date          ?? '',
        end_date:            data.project?.end_date            ?? '',
        required_workers:    data.project?.required_workers    ?? 1,
    });

    // ── Employee edit state ───────────────────────────────────────────────────
    const [employeeForm, setEmployeeForm] = useState({
        first_name:          data.employee?.first_name          ?? '',
        last_name:           data.employee?.last_name           ?? '',
        username:            data.employee?.username            ?? '',
        role:                data.employee?.role                ?? 'employee',
        availability_status: data.employee?.availability_status ?? true,
        experience_years:    data.employee?.experience_years    ?? 0,
    });

    function handleSave() {
        // TODO: replace console.log with service call e.g. updateTask(task_id, taskForm)
        if (cardType === 'task') {
            console.log('[stub] updateTask:', data.task?.task_id, taskForm);
            showToast(`Task "${taskForm.task_name}" updated`);
        }
        if (cardType === 'project') {
            console.log('[stub] updateProject:', data.project?.project_id, projectForm);
            showToast(`Project "${projectForm.project_name}" updated`);
        }
        if (cardType === 'employee') {
            console.log('[stub] updateEmployee:', data.employee?.user_id, employeeForm);
            showToast(`Employee "${employeeForm.first_name} ${employeeForm.last_name}" updated`);
        }
        onClose();
    }

    return (
        <div className='edit-modal-overlay' onClick={onClose}>
            <div className='edit-modal-container' onClick={e => e.stopPropagation()}>

                <div className='edit-modal-header'>
                    <div className='edit-modal-title'>
                        {cardType === 'task'     && 'Edit Task'}
                        {cardType === 'project'  && 'Edit Project'}
                        {cardType === 'employee' && 'Edit Employee'}
                    </div>
                    <button className='edit-modal-close' onClick={onClose}>✕</button>
                </div>

                <div className='edit-modal-body'>

                    {/* ── TASK FORM ─────────────────────────────────────── */}
                    {cardType === 'task' && (
                        <>
                            <div className='em-field'>
                                <label className='em-label'>Task Name</label>
                                <input className='em-input'
                                    value={taskForm.task_name}
                                    onChange={e => setTaskForm({ ...taskForm, task_name: e.target.value })}
                                />
                            </div>
                            <div className='em-field'>
                                <label className='em-label'>Description</label>
                                <textarea className='em-input em-textarea'
                                    value={taskForm.task_description}
                                    onChange={e => setTaskForm({ ...taskForm, task_description: e.target.value })}
                                />
                            </div>
                            <div className='em-row'>
                                <div className='em-field'>
                                    <label className='em-label'>Status</label>
                                    <select className='em-input em-select'
                                        value={taskForm.task_status}
                                        onChange={e => setTaskForm({ ...taskForm, task_status: e.target.value })}
                                    >
                                        <option>To Do</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>Overdue</option>
                                    </select>
                                </div>
                                <div className='em-field'>
                                    <label className='em-label'>Due Date</label>
                                    <input className='em-input' type='date'
                                        value={taskForm.target_date}
                                        onChange={e => setTaskForm({ ...taskForm, target_date: e.target.value })}
                                    />
                                </div>
                            </div>
                            {/* Assign employee — supervisor and admin only */}
                            {(role === 'supervisor' || role === 'admin') && (
                                <div className='em-field'>
                                    <label className='em-label'>Assign To</label>
                                    <select className='em-input em-select'
                                        value={taskForm.assigned_to}
                                        onChange={e => setTaskForm({ ...taskForm, assigned_to: e.target.value })}
                                    >
                                        <option value=''>Unassigned</option>
                                        {employees.map(emp => (
                                            <option key={emp.user_id} value={emp.user_id}>
                                                {emp.first_name} {emp.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </>
                    )}

                    {/* ── PROJECT FORM ──────────────────────────────────── */}
                    {cardType === 'project' && (
                        <>
                            <div className='em-field'>
                                <label className='em-label'>Project Name</label>
                                <input className='em-input'
                                    value={projectForm.project_name}
                                    onChange={e => setProjectForm({ ...projectForm, project_name: e.target.value })}
                                />
                            </div>
                            <div className='em-field'>
                                <label className='em-label'>Description</label>
                                <textarea className='em-input em-textarea'
                                    value={projectForm.project_description}
                                    onChange={e => setProjectForm({ ...projectForm, project_description: e.target.value })}
                                />
                            </div>
                            <div className='em-row'>
                                <div className='em-field'>
                                    <label className='em-label'>Status</label>
                                    <select className='em-input em-select'
                                        value={projectForm.project_status}
                                        onChange={e => setProjectForm({ ...projectForm, project_status: e.target.value })}
                                    >
                                        <option>Active</option>
                                        <option>On Hold</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                                <div className='em-field'>
                                    <label className='em-label'>Required Workers</label>
                                    <input className='em-input' type='number' min='1'
                                        value={projectForm.required_workers}
                                        onChange={e => setProjectForm({ ...projectForm, required_workers: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='em-row'>
                                <div className='em-field'>
                                    <label className='em-label'>Start Date</label>
                                    <input className='em-input' type='date'
                                        value={projectForm.start_date}
                                        onChange={e => setProjectForm({ ...projectForm, start_date: e.target.value })}
                                    />
                                </div>
                                <div className='em-field'>
                                    <label className='em-label'>End Date</label>
                                    <input className='em-input' type='date'
                                        value={projectForm.end_date}
                                        onChange={e => setProjectForm({ ...projectForm, end_date: e.target.value })}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* ── EMPLOYEE FORM (admin only) ────────────────────── */}
                    {cardType === 'employee' && role === 'admin' && (
                        <>
                            <div className='em-row'>
                                <div className='em-field'>
                                    <label className='em-label'>First Name</label>
                                    <input className='em-input'
                                        value={employeeForm.first_name}
                                        onChange={e => setEmployeeForm({ ...employeeForm, first_name: e.target.value })}
                                    />
                                </div>
                                <div className='em-field'>
                                    <label className='em-label'>Last Name</label>
                                    <input className='em-input'
                                        value={employeeForm.last_name}
                                        onChange={e => setEmployeeForm({ ...employeeForm, last_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='em-field'>
                                <label className='em-label'>Username</label>
                                <input className='em-input'
                                    value={employeeForm.username}
                                    onChange={e => setEmployeeForm({ ...employeeForm, username: e.target.value })}
                                />
                            </div>
                            <div className='em-row'>
                                <div className='em-field'>
                                    <label className='em-label'>Role</label>
                                    <select className='em-input em-select'
                                        value={employeeForm.role}
                                        onChange={e => setEmployeeForm({ ...employeeForm, role: e.target.value })}
                                    >
                                        <option value='employee'>Employee</option>
                                        <option value='supervisor'>Supervisor</option>
                                        <option value='admin'>Admin</option>
                                    </select>
                                </div>
                                <div className='em-field'>
                                    <label className='em-label'>Experience (years)</label>
                                    <input className='em-input' type='number' min='0'
                                        value={employeeForm.experience_years}
                                        onChange={e => setEmployeeForm({ ...employeeForm, experience_years: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='em-field'>
                                <label className='em-label'>Availability</label>
                                <select className='em-input em-select'
                                    value={employeeForm.availability_status ? 'true' : 'false'}
                                    onChange={e => setEmployeeForm({ ...employeeForm, availability_status: e.target.value === 'true' })}
                                >
                                    <option value='true'>Available</option>
                                    <option value='false'>Unavailable</option>
                                </select>
                            </div>
                        </>
                    )}

                </div>

                <div className='edit-modal-actions'>
                    <button className='em-btn-secondary' onClick={onClose}>Cancel</button>
                    <button className='em-btn-primary' onClick={handleSave}>Save Changes</button>
                </div>

            </div>
        </div>
    );
}