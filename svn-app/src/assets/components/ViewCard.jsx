import './styles/ViewCard.css';
import ProgressBar from './ProgressBar';
import EditModal from './EditModal';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { useState } from 'react';

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue':     '#f8cfcc54',
    'To Do':       '#41405054',
    'Completed':   '#85cc8554',
};

// Reusable skill pill
function SkillPill({ name, matched = null }) {
    const style = {
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '700',
        fontFamily: '"DM Sans", sans-serif',
        textTransform: 'uppercase',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: matched === null  ? '#a78bfa54'
                  : matched === true  ? '#85cc8554'
                  : '#f8cfcc54',
        border: `1px solid ${
                  matched === null  ? '#a78bfa80'
                : matched === true  ? '#85cc8580'
                : '#e9919180'}`,
        color: matched === null  ? '#a78bfa'
             : matched === true  ? '#91df91'
             : '#e99191',
    };
    return (
        <span style={style}>
            {matched === true  && '✓ '}
            {matched === false && '✕ '}
            {name}
        </span>
    );
}

// Task list modal — shown on top of employee ViewCard
function EmployeeTaskModal({ employee, tasks, onClose, onSelectTask }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={onClose}>
            <div style={{
                background: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px',
                padding: '24px',
                minWidth: '480px',
                maxWidth: '560px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                maxHeight: '80vh',
                overflow: 'hidden',
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontFamily: '"Syne",sans-serif', fontWeight: '800', fontSize: '20px', color: '#ffffffc4' }}>
                            {employee.first_name}'s Tasks
                        </div>
                        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                            {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'transparent', border: 'none',
                        color: 'rgba(255,255,255,0.5)', fontSize: '18px',
                        cursor: 'pointer', padding: '4px 8px',
                        borderRadius: '6px', height: 'unset',
                    }}>✕</button>
                </div>

                {/* Task list */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '8px',
                    overflowY: 'auto', scrollbarWidth: 'thin',
                    scrollbarColor: '#a78bfa #f1f1f100',
                }}>
                    {tasks.length === 0 ? (
                        <div style={{
                            textAlign: 'center', padding: '30px 20px',
                            color: 'rgba(255,255,255,0.3)',
                            fontFamily: '"DM Sans",sans-serif', fontSize: '14px',
                            border: '1px dashed rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                        }}>
                            No tasks assigned
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div
                                key={task.task_id}
                                onClick={() => onSelectTask(task)}
                                style={{
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    gap: '12px',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                                    <div style={{
                                        fontFamily: '"Syne",sans-serif', fontWeight: '700',
                                        fontSize: '14px', color: '#ffffffc4',
                                    }}>
                                        {task.task_name}
                                    </div>
                                    <div style={{
                                        fontFamily: '"DM Sans",sans-serif',
                                        fontSize: '12px', color: 'rgba(255,255,255,0.4)',
                                    }}>
                                        Due {task.target_date}
                                    </div>
                                </div>
                                <span style={{
                                    padding: '3px 10px', borderRadius: '12px',
                                    fontSize: '11px', fontWeight: '900',
                                    textTransform: 'uppercase',
                                    fontFamily: '"DM Sans",sans-serif',
                                    background: statusColor[task.task_status] ?? '#cfccf854',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {task.task_status}
                                </span>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

// ── Project Task Modal ────────────────────────────────────────────────────────
function ProjectTaskModal({ project, tasks, onClose, onSelectTask }) {
    const [filter, setFilter] = useState('All');
    const filters = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue'];

    const statusColor = {
        'In Progress': '#cfccf854',
        'Overdue':     '#f8cfcc54',
        'To Do':       '#41405054',
        'Completed':   '#85cc8554',
    };

    const filtered = filter === 'All'
        ? tasks
        : tasks.filter(t => t.task_status === filter);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={onClose}>
            <div style={{
                background: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px', padding: '24px',
                minWidth: '500px', maxWidth: '580px', width: '100%',
                display: 'flex', flexDirection: 'column', gap: '16px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                maxHeight: '80vh', overflow: 'hidden',
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontFamily: '"Syne",sans-serif', fontWeight: '800', fontSize: '20px', color: '#ffffffc4' }}>
                            {project?.project_name} — Tasks
                        </div>
                        <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                            {tasks.length} task{tasks.length !== 1 ? 's' : ''} in this project
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'transparent', border: 'none',
                        color: 'rgba(255,255,255,0.5)', fontSize: '18px',
                        cursor: 'pointer', padding: '4px 8px',
                        borderRadius: '6px', height: 'unset',
                    }}>✕</button>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '4px 12px', borderRadius: '20px', height: 'unset',
                                border: `1px solid ${filter === f ? '#a78bfa' : 'rgba(255,255,255,0.15)'}`,
                                background: filter === f ? '#a78bfa54' : 'transparent',
                                color: filter === f ? 'white' : 'rgba(255,255,255,0.5)',
                                fontFamily: '"DM Sans",sans-serif', fontSize: '12px',
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Task list */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '8px',
                    overflowY: 'auto', scrollbarWidth: 'thin',
                    scrollbarColor: '#a78bfa #f1f1f100',
                }}>
                    {filtered.length === 0 ? (
                        <div style={{
                            textAlign: 'center', padding: '30px 20px',
                            color: 'rgba(255,255,255,0.3)',
                            fontFamily: '"DM Sans",sans-serif', fontSize: '14px',
                            border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px',
                        }}>
                            No tasks found
                        </div>
                    ) : (
                        filtered.map(task => (
                            <div
                                key={task.task_id}
                                onClick={() => onSelectTask(task)}
                                style={{
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '8px', cursor: 'pointer',
                                    transition: 'background 0.2s', gap: '12px',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                                    <div style={{ fontFamily: '"Syne",sans-serif', fontWeight: '700', fontSize: '14px', color: '#ffffffc4' }}>
                                        {task.task_name}
                                    </div>
                                    <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                        Due {task.target_date}
                                    </div>
                                </div>
                                <span style={{
                                    padding: '3px 10px', borderRadius: '12px',
                                    fontSize: '11px', fontWeight: '900',
                                    textTransform: 'uppercase',
                                    fontFamily: '"DM Sans",sans-serif',
                                    background: statusColor[task.task_status] ?? '#cfccf854',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {task.task_status}
                                </span>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default function ViewCard({ onClose, cardType, data = {} }) {
    const {
        currentUser, getUserById,
        getSkillsForEmployee, getSkillsForTask,
        employeeMeetsTaskRequirements, taskAssignments,
    } = useApp();
    const { showToast } = useToast();
    const role = currentUser?.role;

    const [showEdit, setShowEdit]                       = useState(false);
    const [showTaskModal, setShowTaskModal]             = useState(false);
    const [selectedTask, setSelectedTask]               = useState(null);
    const [showProjectTaskModal, setShowProjectTaskModal] = useState(false);

    function handleMarkComplete() {
        console.log('[stub] markComplete:', data.task?.task_id);
        showToast(`Task "${data.task?.task_name}" marked as complete`);
        onClose();
    }

    function handleDelete() {
        if (cardType === 'task')     console.log('[stub] deleteTask:', data.task?.task_id);
        if (cardType === 'project')  console.log('[stub] deleteProject:', data.project?.project_id);
        if (cardType === 'employee') console.log('[stub] deleteUser:', data.employee?.user_id);
        showToast(
            `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} deleted`,
            'error'
        );
        onClose();
    }

    function renderActions() {
        if (cardType === 'task') return (
            <div className='view-card-actions'>
                {(role === 'supervisor' || role === 'admin') && (
                    <button onClick={() => setShowEdit(true)}>Edit</button>
                )}
                {role === 'admin' && (
                    <button onClick={handleDelete}
                        style={{ borderColor: '#e9919180', color: '#e99191' }}>
                        Delete
                    </button>
                )}
                <button className='view-card-btn-primary' onClick={handleMarkComplete}>
                    Mark Complete
                </button>
            </div>
        );

        if (cardType === 'project') return (
            <div className='view-card-actions'>
                {(role === 'supervisor' || role === 'admin') && (
                    <button onClick={() => setShowEdit(true)}>Edit</button>
                )}
                {role === 'admin' && (
                    <button onClick={handleDelete}
                        style={{ borderColor: '#e9919180', color: '#e99191' }}>
                        Delete
                    </button>
                )}
                <button
                    className='view-card-btn-primary'
                    onClick={() => setShowProjectTaskModal(true)}
                >
                    View Tasks
                </button>
            </div>
        );

        if (cardType === 'employee') return (
            <div className='view-card-actions'>
                {role === 'admin' && (
                    <>
                        <button onClick={() => setShowEdit(true)}>Edit</button>
                        <button onClick={handleDelete}
                            style={{ borderColor: '#e9919180', color: '#e99191' }}>
                            Delete
                        </button>
                    </>
                )}
                <button
                    className='view-card-btn-primary'
                    onClick={() => setShowTaskModal(true)}
                >
                    View Tasks
                </button>
            </div>
        );
    }

    // ── TASK ──────────────────────────────────────────────────────────────────
    if (cardType === 'task') {
        const { task, supervisorName, assignment } = data;
        const assignee = assignment ? getUserById(assignment.employee_user_id) : null;
        const assigneeName = assignee
            ? `${assignee.first_name} ${assignee.last_name}`
            : 'Unassigned';

        const requiredSkills   = getSkillsForTask(task?.task_id);
        const employeeSkillIds = assignee
            ? getSkillsForEmployee(assignee.user_id).map(s => s.skill_id)
            : [];
        const allMet = assignee
            ? employeeMeetsTaskRequirements(assignee.user_id, task?.task_id)
            : null;

        return (
            <>
                <div className="view-card-container-parent" onClick={onClose}>
                    <div className='view-card-container' onClick={e => e.stopPropagation()}>
                        <div className='view-card-header'>
                            <div className='view-card-title'>{task?.task_name ?? '—'}</div>
                            <div className='view-card-status'>{task?.task_status ?? '—'}</div>
                            <button className='view-card-close' onClick={onClose}>✕</button>
                        </div>
                        <div className='view-card-description'>
                            {task?.task_description ?? 'No description provided.'}
                        </div>
                        <div className='view-card-tags'>
                            <div className='view-card-tag view-card-tag-priority'>{task?.task_status ?? '—'}</div>
                            <div className='view-card-tag view-card-tag-deadline'>⚠ Due {task?.target_date ?? '—'}</div>
                            <div className='view-card-tag view-card-tag-supervisor'>👤 {supervisorName ?? 'Unassigned'}</div>
                        </div>
                        <div className='view-card-divider' />
                        <div className='view-card-details'>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Assigned to</span>
                                <span>{assigneeName}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Due Date</span>
                                <span>{task?.target_date ?? '—'}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Project</span>
                                <span>{task?.project_id ?? '—'}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Created</span>
                                <span>{task?.created_at ? new Date(task.created_at).toLocaleDateString() : '—'}</span>
                            </div>
                            {requiredSkills.length > 0 && (
                                <div className='view-card-detail-row' style={{ flexDirection: 'column', gap: '8px' }}>
                                    <span className='view-card-detail-label'>
                                        Required Skills
                                        {assignee && (
                                            <span style={{
                                                marginLeft: '8px', fontSize: '11px',
                                                color: allMet ? '#91df91' : '#e99191',
                                            }}>
                                                {allMet ? '✓ All requirements met' : '✕ Missing skills'}
                                            </span>
                                        )}
                                    </span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {requiredSkills.map(skill => (
                                            <SkillPill
                                                key={skill.skill_id}
                                                name={skill.skill_name}
                                                matched={assignee ? employeeSkillIds.includes(skill.skill_id) : null}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='view-card-divider' />
                        {renderActions()}
                    </div>
                </div>
                {showEdit && (
                    <EditModal onClose={() => setShowEdit(false)} cardType="task" data={data} />
                )}
            </>
        );
    }

    // ── PROJECT ───────────────────────────────────────────────────────────────
    if (cardType === 'project') {
        const { project, progress, completed, total } = data;

        return (
            <>
                <div className="view-card-container-parent" onClick={onClose}>
                    <div className='view-card-container' onClick={e => e.stopPropagation()}>
                        <div className='view-card-header'>
                            <div className='view-card-title'>{project?.project_name ?? '—'}</div>
                            <div className='view-card-status'>{project?.project_status ?? '—'}</div>
                            <button className='view-card-close' onClick={onClose}>✕</button>
                        </div>
                        <div className='view-card-description'>
                            {project?.project_description ?? 'No description provided.'}
                        </div>
                        <div className='view-card-tags'>
                            <div className='view-card-tag view-card-tag-priority'>📅 Start: {project?.start_date ?? '—'}</div>
                            <div className='view-card-tag view-card-tag-deadline'>⚠ Due: {project?.end_date ?? '—'}</div>
                        </div>
                        <div className='view-card-divider' />
                        <div className='view-card-details'>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Progress</span>
                                <div style={{ flex: 1 }}>
                                    <ProgressBar value={completed ?? 0} max={total || 1} />
                                </div>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Tasks</span>
                                <span>{completed} / {total} completed</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Workers Needed</span>
                                <span>{project?.required_workers ?? '—'}</span>
                            </div>
                            {progress?.remarks && (
                                <div className='view-card-detail-row'>
                                    <span className='view-card-detail-label'>Remarks</span>
                                    <span>{progress.remarks}</span>
                                </div>
                            )}
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Created</span>
                                <span>{project?.created_at ? new Date(project.created_at).toLocaleDateString() : '—'}</span>
                            </div>
                        </div>
                        <div className='view-card-divider' />
                        {renderActions()}
                    </div>
                </div>
                {showEdit && (
                    <EditModal onClose={() => setShowEdit(false)} cardType="project" data={data} />
                )}
                {showProjectTaskModal && (
                    <ProjectTaskModal
                        project={project}
                        tasks={data.tasks ?? []}
                        onClose={() => setShowProjectTaskModal(false)}
                        onSelectTask={(task) => {
                            setSelectedTask(task);
                            setShowProjectTaskModal(false);
                        }}
                    />
                )}
                {selectedTask && (
                    <ViewCard
                        onClose={() => setSelectedTask(null)}
                        cardType="task"
                        data={(() => {
                            const assignment = taskAssignments.find(a => a.task_id === selectedTask.task_id) ?? null;
                            const supervisor = assignment ? getUserById(assignment.assigned_by) : null;
                            return {
                                task: selectedTask,
                                assignment,
                                supervisorName: supervisor
                                    ? `${supervisor.first_name} ${supervisor.last_name}`
                                    : 'Unassigned',
                            };
                        })()}
                    />
                )}
            </>
        );
    }

    // ── EMPLOYEE ──────────────────────────────────────────────────────────────
    if (cardType === 'employee') {
        const { employee, employeeTasks = [] } = data;
        const active    = employeeTasks.filter(t => t.task_status === 'In Progress' || t.task_status === 'To Do').length;
        const completed = employeeTasks.filter(t => t.task_status === 'Completed').length;
        const overdue   = employeeTasks.filter(t => t.task_status === 'Overdue').length;
        const empSkills = employee ? getSkillsForEmployee(employee.user_id) : [];

        // When a task is selected from the task modal — find its assignment + supervisor
        function getTaskViewData(task) {
            const assignment = taskAssignments.find(a => a.task_id === task.task_id) ?? null;
            const supervisor = assignment ? getUserById(assignment.assigned_by) : null;
            const supervisorName = supervisor
                ? `${supervisor.first_name} ${supervisor.last_name}`
                : 'Unassigned';
            return { task, assignment, supervisorName };
        }

        return (
            <>
                <div className="view-card-container-parent" onClick={onClose}>
                    <div className='view-card-container' onClick={e => e.stopPropagation()}>
                        <div className='view-card-header'>
                            <div className='view-card-title'>
                                {employee?.first_name} {employee?.last_name}
                            </div>
                            <div className='view-card-status'
                                style={{ background: employee?.availability_status ? '#85cc85a1' : '#f8cfcc54' }}>
                                {employee?.availability_status ? 'Active' : 'Inactive'}
                            </div>
                            <button className='view-card-close' onClick={onClose}>✕</button>
                        </div>
                        <div className='view-card-description'>
                            {employee?.role?.charAt(0).toUpperCase() + employee?.role?.slice(1)} · {employee?.experience_years} years experience
                        </div>
                        <div className='view-card-divider' />
                        <div className='view-card-details'>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Employee ID</span>
                                <span>{employee?.user_id}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Username</span>
                                <span>{employee?.username}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Active Tasks</span>
                                <span>{active}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Completed</span>
                                <span>{completed}</span>
                            </div>
                            <div className='view-card-detail-row'>
                                <span className='view-card-detail-label'>Overdue</span>
                                <span style={{ color: overdue > 0 ? '#e99191' : 'inherit' }}>{overdue}</span>
                            </div>
                            {empSkills.length > 0 && (
                                <div className='view-card-detail-row' style={{ flexDirection: 'column', gap: '8px' }}>
                                    <span className='view-card-detail-label'>Skills</span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {empSkills.map(skill => (
                                            <SkillPill key={skill.skill_id} name={skill.skill_name} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='view-card-divider' />
                        {renderActions()}
                    </div>
                </div>

                {/* Task list modal */}
                {showTaskModal && (
                    <EmployeeTaskModal
                        employee={employee}
                        tasks={employeeTasks}
                        onClose={() => setShowTaskModal(false)}
                        onSelectTask={(task) => {
                            setSelectedTask(task);
                            setShowTaskModal(false);
                        }}
                    />
                )}

                {/* Task ViewCard — opened from task list modal */}
                {selectedTask && (
                    <ViewCard
                        onClose={() => setSelectedTask(null)}
                        cardType="task"
                        data={getTaskViewData(selectedTask)}
                    />
                )}

                {/* Edit modal */}
                {showEdit && (
                    <EditModal onClose={() => setShowEdit(false)} cardType="employee" data={data} />
                )}
            </>
        );
    }

    return null;
}