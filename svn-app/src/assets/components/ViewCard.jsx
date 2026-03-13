import './styles/ViewCard.css';
import ProgressBar from './ProgressBar';
import EditModal from './EditModal';
import ProjectTasksModal from './ProjectTasksModal';
import EmployeeTasksModal from './EmployeeTasksModal';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { useState } from 'react';

export default function ViewCard({ onClose, cardType, data = {} }) {
    const { currentUser, getUserById } = useApp();
    const { showToast } = useToast();
    const role = currentUser?.role;
    const [showEdit, setShowEdit] = useState(false);
    const [showTasks, setShowTasks] = useState(false);

    function handleMarkComplete() {
        // TODO: replace with updateTask(task_id, { task_status: 'Completed' })
        console.log('[stub] markComplete:', data.task?.task_id);
        showToast(`Task "${data.task?.task_name}" marked as complete`);
        onClose();
    }

    function handleDelete() {
        // TODO: replace with deleteTask / deleteProject / deleteUser service call
        if (cardType === 'task')     console.log('[stub] deleteTask:', data.task?.task_id);
        if (cardType === 'project')  console.log('[stub] deleteProject:', data.project?.project_id);
        if (cardType === 'employee') console.log('[stub] deleteUser:', data.employee?.user_id);
        showToast(
            `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} deleted`,
            'error'
        );
        onClose();
    }

    // ── Role-gated action buttons ─────────────────────────────────────────────
    function renderActions() {
        if (cardType === 'task') {
            return (
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
                    {(role === 'employee' || role === 'supervisor' || role === 'admin') && (
                        <button className='view-card-btn-primary' onClick={handleMarkComplete}>
                            Mark Complete
                        </button>
                    )}
                </div>
            );
        }

        if (cardType === 'project') {
            return (
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
                    <button className='view-card-btn-primary' onClick={() => setShowTasks(true)}>
                        View Tasks
                    </button>
                </div>
            );
        }

        if (cardType === 'employee') {
            return (
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
                    <button className='view-card-btn-primary' onClick={() => setShowTasks(true)}>
                        View Tasks
                    </button>
                </div>
            );
        }
    }

    // ── Card content ──────────────────────────────────────────────────────────
    if (cardType === 'task') {
        const { task, supervisorName, assignment } = data;
        const assignee = assignment ? getUserById(assignment.employee_user_id) : null;
        const assigneeName = assignee
            ? `${assignee.first_name} ${assignee.last_name}`
            : 'Unassigned';

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
                            <div className='view-card-tag view-card-tag-priority'>
                                {task?.task_status ?? '—'}
                            </div>
                            <div className='view-card-tag view-card-tag-deadline'>
                                ⚠ Due {task?.target_date ?? '—'}
                            </div>
                            <div className='view-card-tag view-card-tag-supervisor'>
                                👤 {supervisorName ?? 'Unassigned'}
                            </div>
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
                        </div>
                        <div className='view-card-divider' />
                        {renderActions()}
                    </div>
                </div>
                {showEdit && (
                    <EditModal
                        onClose={() => setShowEdit(false)}
                        cardType="task"
                        data={data}
                    />
                )}
            </>
        );
    }

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
                            <div className='view-card-tag view-card-tag-priority'>
                                📅 Start: {project?.start_date ?? '—'}
                            </div>
                            <div className='view-card-tag view-card-tag-deadline'>
                                ⚠ Due: {project?.end_date ?? '—'}
                            </div>
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
                    <EditModal
                        onClose={() => setShowEdit(false)}
                        cardType="project"
                        data={data}
                    />
                )}
                {showTasks && (
                    <ProjectTasksModal
                        onClose={() => setShowTasks(false)}
                        project={project}
                    />
                )}
            </>
        );
    }

    if (cardType === 'employee') {
        const { employee, employeeTasks = [] } = data;
        const active    = employeeTasks.filter(t => t.task_status === 'In Progress' || t.task_status === 'To Do').length;
        const completed = employeeTasks.filter(t => t.task_status === 'Completed').length;
        const overdue   = employeeTasks.filter(t => t.task_status === 'Overdue').length;

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
                        </div>
                        <div className='view-card-divider' />
                        {renderActions()}
                    </div>
                </div>
                {showEdit && (
                    <EditModal
                        onClose={() => setShowEdit(false)}
                        cardType="employee"
                        data={data}
                    />
                )}
                {showTasks && (
                    <EmployeeTasksModal
                        onClose={() => setShowTasks(false)}
                        employee={employee}
                    />
                )}
            </>
        );
    }

    return null;
}