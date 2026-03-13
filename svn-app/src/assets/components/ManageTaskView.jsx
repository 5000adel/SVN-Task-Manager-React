import './styles/ManageTaskView.css'
import './styles/ManageTaskView.modal.css'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import EditModal from './EditModal'

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue':     '#f8cfcc54',
    'To Do':       '#41405054',
    'Completed':   '#85cc8554',
}

const filters = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue']

// ── Task Detail Modal ─────────────────────────────────────────────────────────
function TaskDetailModal({ task, onClose, onAssign }) {
    const {
        employees, taskAssignments, getUserById,
        getSkillsForTask, getSkillsForEmployee,
        getQualifiedEmployeesForTask,
    } = useApp();
    const { showToast } = useToast();

    const assignment   = taskAssignments.find(a => a.task_id === task.task_id) ?? null;
    const assignee     = assignment ? getUserById(assignment.employee_user_id) : null;
    const assignedBy   = assignment ? getUserById(assignment.assigned_by) : null;

    const requiredSkills    = getSkillsForTask(task.task_id);
    const qualifiedEmployees = getQualifiedEmployeesForTask(task.task_id);

    // If no skill requirements, show all employees
    const assignableEmployees = requiredSkills.length > 0
        ? qualifiedEmployees
        : employees;

    const [selectedEmployee, setSelectedEmployee] = useState(
        assignment?.employee_user_id ?? ''
    );

    function handleAssign() {
        if (!selectedEmployee) {
            showToast('Please select an employee', 'error');
            return;
        }
        const emp = getUserById(selectedEmployee);
        const empName = emp ? `${emp.first_name} ${emp.last_name}` : selectedEmployee;

        // TODO: replace with assignTask({ task_id, employee_user_id, assigned_by: currentUser.user_id })
        //       or updateAssignment(assignment_id, { employee_user_id: selectedEmployee })
        console.log('[stub] assignTask:', {
            task_id:          task.task_id,
            employee_user_id: selectedEmployee,
            assignment_id:    assignment?.assignment_id ?? null,
        });
        showToast(`${task.task_name} assigned to ${empName}`);
        onAssign?.();
        onClose();
    }

    function handleUnassign() {
        // TODO: replace with updateAssignment(assignment_id, { assignment_status: 'Removed' })
        console.log('[stub] unassignTask:', assignment?.assignment_id);
        showToast(`${task.task_name} unassigned`, 'info');
        onClose();
    }

    return (
        <div className='mt-modal-overlay' onClick={onClose}>
            <div className='mt-modal' onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className='mt-modal-header'>
                    <div>
                        <div className='mt-modal-title'>{task.task_name}</div>
                        <div className='mt-modal-subtitle'>{task.task_description ?? 'No description provided.'}</div>
                    </div>
                    <button className='mt-modal-close' onClick={onClose}>✕</button>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className='mt-badge' style={{ background: statusColor[task.task_status] }}>
                        {task.task_status}
                    </span>
                    <span style={{
                        padding: '3px 10px', borderRadius: '12px', fontSize: '11px',
                        fontWeight: '900', textTransform: 'uppercase',
                        fontFamily: '"DM Sans",sans-serif',
                        background: '#cfccf854', color: 'rgba(255,255,255,0.7)',
                    }}>
                        ⚠ Due {task.target_date}
                    </span>
                </div>

                <div className='mt-modal-divider' />

                {/* Current assignment */}
                <div className='mt-modal-section'>
                    <div className='mt-modal-label'>Currently Assigned To</div>
                    {assignee ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: '#a78bfa54', border: '1px solid #a78bfa',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: '"Syne",sans-serif', fontWeight: '800',
                                fontSize: '14px', color: '#a78bfa', flexShrink: 0,
                            }}>
                                {assignee.first_name.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontFamily: '"Syne",sans-serif', fontWeight: '700', fontSize: '14px', color: '#ffffffc4' }}>
                                    {assignee.first_name} {assignee.last_name}
                                </div>
                                <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                    Assigned by {assignedBy ? `${assignedBy.first_name} ${assignedBy.last_name}` : '—'}
                                </div>
                            </div>
                            <button
                                onClick={handleUnassign}
                                style={{
                                    marginLeft: 'auto', padding: '4px 10px',
                                    borderRadius: '6px', height: 'unset',
                                    border: '1px solid #e9919180',
                                    background: 'transparent', color: '#e99191',
                                    fontFamily: '"DM Sans",sans-serif', fontSize: '12px',
                                    cursor: 'pointer',
                                }}
                            >
                                Unassign
                            </button>
                        </div>
                    ) : (
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                            Unassigned
                        </div>
                    )}
                </div>

                {/* Required skills */}
                {requiredSkills.length > 0 && (
                    <div className='mt-modal-section'>
                        <div className='mt-modal-label'>Required Skills</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {requiredSkills.map(s => (
                                <span key={s.skill_id} style={{
                                    padding: '3px 10px', borderRadius: '12px',
                                    fontSize: '11px', fontWeight: '700',
                                    fontFamily: '"DM Sans",sans-serif', textTransform: 'uppercase',
                                    background: '#a78bfa54', border: '1px solid #a78bfa80', color: '#a78bfa',
                                }}>
                                    {s.skill_name}
                                </span>
                            ))}
                        </div>
                        {requiredSkills.length > 0 && (
                            <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
                                {qualifiedEmployees.length} qualified employee{qualifiedEmployees.length !== 1 ? 's' : ''} available
                            </div>
                        )}
                    </div>
                )}

                <div className='mt-modal-divider' />

                {/* Assign dropdown */}
                <div className='mt-modal-section'>
                    <div className='mt-modal-label'>
                        {assignee ? 'Reassign To' : 'Assign To'}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <select
                            className='mt-modal-select'
                            value={selectedEmployee}
                            onChange={e => setSelectedEmployee(e.target.value)}
                        >
                            <option value=''>Select employee...</option>
                            {assignableEmployees.map(emp => {
                                const empSkills = getSkillsForEmployee(emp.user_id);
                                return (
                                    <option key={emp.user_id} value={emp.user_id}>
                                        {emp.first_name} {emp.last_name}
                                        {empSkills.length > 0 ? ` — ${empSkills.map(s => s.skill_name).join(', ')}` : ''}
                                        {!emp.availability_status ? ' (Unavailable)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                        <button className='mt-modal-assign-btn' onClick={handleAssign}>
                            {assignee ? 'Reassign' : 'Assign'}
                        </button>
                    </div>
                    {requiredSkills.length > 0 && assignableEmployees.length === 0 && (
                        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', color: '#e99191', marginTop: '6px' }}>
                            No qualified employees found for this task's skill requirements
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

// ── New Task Modal ────────────────────────────────────────────────────────────
function NewTaskModal({ projectId, onClose }) {
    const { currentUser, employees, skills, getSkillsForEmployee } = useApp();
    const { showToast } = useToast();

    const [form, setForm] = useState({
        task_name: '', task_description: '',
        task_status: 'To Do', target_date: '', assigned_to: '',
    });
    const [selectedSkills, setSelectedSkills] = useState([]);

    const qualifiedEmployees = selectedSkills.length === 0
        ? employees
        : employees.filter(emp => {
            const empSkillIds = getSkillsForEmployee(emp.user_id).map(s => s.skill_id);
            return selectedSkills.every(id => empSkillIds.includes(id));
        });

    function toggleSkill(skill_id) {
        setSelectedSkills(prev =>
            prev.includes(skill_id) ? prev.filter(id => id !== skill_id) : [...prev, skill_id]
        );
        setForm(f => ({ ...f, assigned_to: '' }));
    }

    function handleSave() {
        if (!form.task_name.trim()) { showToast('Task name is required', 'error'); return; }
        if (!form.target_date)      { showToast('Target date is required', 'error'); return; }

        // TODO: replace with:
        //   const task = await createTask({ ...form, project_id: projectId, created_by: currentUser.user_id })
        //   if (form.assigned_to) await assignTask({ task_id: task.task_id, employee_user_id: form.assigned_to, assigned_by: currentUser.user_id })
        //   if (selectedSkills.length > 0) await setSkillRequirements(task.task_id, selectedSkills)
        console.log('[stub] createTask:', { ...form, project_id: projectId, created_by: currentUser?.user_id });
        console.log('[stub] assignTask:', { employee_user_id: form.assigned_to });
        console.log('[stub] setSkillRequirements:', selectedSkills);
        showToast(`Task "${form.task_name}" created`);
        onClose();
    }

    return (
        <div className='mt-modal-overlay' onClick={onClose}>
            <div className='mt-modal' onClick={e => e.stopPropagation()}>

                <div className='mt-modal-header'>
                    <div>
                        <div className='mt-modal-title'>New Task</div>
                        <div className='mt-modal-subtitle'>Fields marked * are required</div>
                    </div>
                    <button className='mt-modal-close' onClick={onClose}>✕</button>
                </div>

                <div className='mt-modal-divider' />

                {/* Task Name */}
                <div className='mt-modal-section'>
                    <div className='mt-modal-label'>Task Name *</div>
                    <input
                        className='mt-modal-select' style={{ backgroundImage: 'none' }}
                        placeholder='Enter task name...'
                        value={form.task_name}
                        onChange={e => setForm({ ...form, task_name: e.target.value })}
                    />
                </div>

                {/* Description */}
                <div className='mt-modal-section'>
                    <div className='mt-modal-label'>Description</div>
                    <textarea
                        className='mt-modal-select'
                        style={{ backgroundImage: 'none', resize: 'vertical', minHeight: '72px', fontFamily: '"DM Sans",sans-serif' }}
                        placeholder='Enter task description...'
                        value={form.task_description}
                        onChange={e => setForm({ ...form, task_description: e.target.value })}
                    />
                </div>

                {/* Status + Target Date */}
                <div style={{ display: 'flex', gap: '14px' }}>
                    <div className='mt-modal-section' style={{ flex: 1 }}>
                        <div className='mt-modal-label'>Status</div>
                        <select className='mt-modal-select'
                            value={form.task_status}
                            onChange={e => setForm({ ...form, task_status: e.target.value })}
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Overdue</option>
                        </select>
                    </div>
                    <div className='mt-modal-section' style={{ flex: 1 }}>
                        <div className='mt-modal-label'>Target Date *</div>
                        <input
                            className='mt-modal-select' style={{ backgroundImage: 'none' }}
                            type='date'
                            value={form.target_date}
                            onChange={e => setForm({ ...form, target_date: e.target.value })}
                        />
                    </div>
                </div>

                <div className='mt-modal-divider' />

                {/* Skill Requirements */}
                <div className='mt-modal-section'>
                    <div className='mt-modal-label'>
                        Skill Requirements
                        <span style={{ marginLeft: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'none', fontWeight: '400', letterSpacing: 0 }}>
                            — filters qualified employees below
                        </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {skills.map(skill => {
                            const active = selectedSkills.includes(skill.skill_id);
                            return (
                                <div key={skill.skill_id} onClick={() => toggleSkill(skill.skill_id)} style={{
                                    padding: '5px 14px', borderRadius: '20px', cursor: 'pointer',
                                    fontFamily: '"DM Sans",sans-serif', fontSize: '12px',
                                    fontWeight: '700', textTransform: 'uppercase',
                                    userSelect: 'none', transition: 'all 0.15s',
                                    background: active ? '#a78bfa54' : 'transparent',
                                    border: `1px solid ${active ? '#a78bfa' : 'rgba(255,255,255,0.15)'}`,
                                    color: active ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                                }}>
                                    {active && '✓ '}{skill.skill_name}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Assign Employee */}
                <div className='mt-modal-section'>
                    <div className='mt-modal-label'>
                        Assign Employee
                        {selectedSkills.length > 0 && (
                            <span style={{
                                marginLeft: '8px', fontSize: '11px', textTransform: 'none',
                                fontWeight: '400', letterSpacing: 0,
                                color: qualifiedEmployees.length > 0 ? '#91df91' : '#e99191',
                            }}>
                                — {qualifiedEmployees.length} qualified employee{qualifiedEmployees.length !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                    <select
                        className='mt-modal-select'
                        value={form.assigned_to}
                        onChange={e => setForm({ ...form, assigned_to: e.target.value })}
                        disabled={selectedSkills.length > 0 && qualifiedEmployees.length === 0}
                    >
                        <option value=''>Unassigned</option>
                        {qualifiedEmployees.map(emp => {
                            const empSkills = getSkillsForEmployee(emp.user_id);
                            return (
                                <option key={emp.user_id} value={emp.user_id}>
                                    {emp.first_name} {emp.last_name}
                                    {empSkills.length > 0 ? ` — ${empSkills.map(s => s.skill_name).join(', ')}` : ''}
                                    {!emp.availability_status ? ' (Unavailable)' : ''}
                                </option>
                            );
                        })}
                    </select>
                    {selectedSkills.length > 0 && qualifiedEmployees.length === 0 && (
                        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', color: '#e99191', marginTop: '4px' }}>
                            No employees match all selected skill requirements
                        </div>
                    )}
                </div>

                <div className='mt-modal-divider' />

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{
                        padding: '8px 20px', borderRadius: '8px', height: 'unset',
                        border: '1px solid rgba(255,255,255,0.15)', background: 'transparent',
                        color: 'rgba(255,255,255,0.6)', fontFamily: '"DM Sans",sans-serif',
                        fontSize: '13px', cursor: 'pointer',
                    }}>
                        Cancel
                    </button>
                    <button className='mt-modal-assign-btn' onClick={handleSave}>
                        Create Task
                    </button>
                </div>

            </div>
        </div>
    );
}

// ── ManageTaskView ────────────────────────────────────────────────────────────
export default function ManageTaskView({ searchQuery = '' }) {
    const {
        projects, tasks, taskAssignments,
        getUserById, loading,
    } = useApp();
    const { showToast } = useToast();

    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter]                   = useState('All');
    const [selectedTask, setSelectedTask]       = useState(null);
    const [editingTask, setEditingTask]         = useState(null);
    const [showNewTask, setShowNewTask]         = useState(false);

    const projectTasks = selectedProject
        ? tasks.filter(t => t.project_id === selectedProject)
        : [];

    const filteredTasks = (filter === 'All' ? projectTasks : projectTasks.filter(t => t.task_status === filter))
        .filter(t => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
                t.task_name.toLowerCase().includes(q) ||
                (t.task_description ?? '').toLowerCase().includes(q) ||
                getAssigneeName(t.task_id).toLowerCase().includes(q)
            );
        });

    function getAssigneeName(task_id) {
        const assignment = taskAssignments.find(a => a.task_id === task_id);
        if (!assignment) return 'Unassigned';
        const user = getUserById(assignment.employee_user_id);
        return user ? `${user.first_name} ${user.last_name}` : 'Unassigned';
    }

    function handleDelete(task) {
        // TODO: replace with deleteTask(task.task_id)
        console.log('[stub] deleteTask:', task.task_id);
        showToast(`"${task.task_name}" deleted`, 'error');
    }

    return (
        <div className='manage-task-container'>

            {/* Header */}
            <div className='manage-task-header'>
                <div className='manage-task-title'>
                    Manage Tasks
                    {searchQuery && (
                        <span style={{ fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.4)', marginLeft: '10px', fontFamily: '"DM Sans",sans-serif' }}>
                            "{searchQuery}"
                        </span>
                    )}
                </div>
                <button
                    className='manage-task-add'
                    disabled={!selectedProject}
                    onClick={() => setShowNewTask(true)}
                >
                    + New Task
                </button>
            </div>

            {/* Project Selector */}
            <div className='mt-project-selector'>
                <div className='mt-project-label'>Select Project</div>
                <div className='mt-project-list'>
                    {loading ? (
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                            Loading projects...
                        </div>
                    ) : (
                        projects.map(p => (
                            <div
                                key={p.project_id}
                                className={`mt-project-pill ${selectedProject === p.project_id ? 'active' : ''}`}
                                onClick={() => { setSelectedProject(p.project_id); setFilter('All'); }}
                            >
                                {p.project_name}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Filters */}
            {selectedProject && (
                <div className='manage-task-filters'>
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`mt-filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {/* Task List */}
            {!selectedProject ? (
                <div className='mt-empty-state'>Select a project to view and manage its tasks</div>
            ) : filteredTasks.length === 0 ? (
                <div className='mt-empty-state'>No tasks found for this filter</div>
            ) : (
                <div className='manage-task-list'>
                    <div className='manage-task-list-header'>
                        <span>Task</span>
                        <span>Assignee</span>
                        <span>Due</span>
                        <span>Status</span>
                        <span></span>
                    </div>
                    {filteredTasks.map(task => (
                        <div
                            className='manage-task-row'
                            key={task.task_id}
                            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', cursor: 'pointer' }}
                            onClick={() => setSelectedTask(task)}
                        >
                            <span className='mt-task-title'>{task.task_name}</span>
                            <span className='mt-assignee'>{getAssigneeName(task.task_id)}</span>
                            <span className='mt-due'>{task.target_date}</span>
                            <span className='mt-badge' style={{ background: statusColor[task.task_status] }}>
                                {task.task_status}
                            </span>
                            <div className='mt-actions' onClick={e => e.stopPropagation()}>
                                <button onClick={() => setEditingTask(task)}>Edit</button>
                                <button
                                    style={{ borderColor: '#e9919180', color: '#e99191' }}
                                    onClick={() => handleDelete(task)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* New Task Modal */}
            {showNewTask && (
                <NewTaskModal
                    projectId={selectedProject}
                    onClose={() => setShowNewTask(false)}
                />
            )}

            {/* Task Detail Modal */}
            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onAssign={() => setSelectedTask(null)}
                />
            )}

            {/* Edit Modal */}
            {editingTask && (
                <EditModal
                    onClose={() => setEditingTask(null)}
                    cardType="task"
                    data={{ task: editingTask, assignment: taskAssignments.find(a => a.task_id === editingTask.task_id) ?? null }}
                />
            )}

        </div>
    );
}
