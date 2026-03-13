import './styles/ViewCard.css'
import ProgressBar from './ProgressBar';
import { useApp } from '../../context/AppContext'

export default function ViewCard({ onClose, cardType, data = {} }) {
    const { getUserById, getTasksForProject } = useApp();

    if (cardType === "task") {
        const { task, supervisorName, assignment } = data;

        return (
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
                            <span>
                                {assignment
                                    ? getUserById(assignment.employee_user_id)?.first_name + ' ' + getUserById(assignment.employee_user_id)?.last_name
                                    : 'Unassigned'}
                            </span>
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

                    <div className='view-card-actions'>
                        <button>Edit</button>
                        <button className='view-card-btn-primary'>Mark Complete</button>
                    </div>

                </div>
            </div>
        );
    }

    if (cardType === "project") {
        const { project, progress, tasks, completed, total } = data;

        return (
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

                    <div className='view-card-actions'>
                        <button>Edit</button>
                        <button className='view-card-btn-primary'>View Tasks</button>
                    </div>

                </div>
            </div>
        );
    }

    if (cardType === "employee") {
        const { employee, employeeTasks = [] } = data;

        const active    = employeeTasks.filter(t => t.task_status === 'In Progress' || t.task_status === 'To Do').length;
        const completed = employeeTasks.filter(t => t.task_status === 'Completed').length;
        const overdue   = employeeTasks.filter(t => t.task_status === 'Overdue').length;

        return (
            <div className="view-card-container-parent" onClick={onClose}>
                <div className='view-card-container' onClick={e => e.stopPropagation()}>

                    <div className='view-card-header'>
                        <div className='view-card-title'>
                            {employee?.first_name} {employee?.last_name}
                        </div>
                        <div className='view-card-status' style={{ background: employee?.availability_status ? '#85cc85a1' : '#f8cfcc54' }}>
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

                    <div className='view-card-actions'>
                        <button>Edit</button>
                        <button className='view-card-btn-primary'>View Tasks</button>
                    </div>

                </div>
            </div>
        );
    }

    return null;
}