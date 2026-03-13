import { useApp } from '../../context/AppContext';
import './styles/ProjectTasksModal.css';

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue':     '#f8cfcc54',
    'To Do':       '#41405094',
    'Completed':   '#85cc8554',
}

export default function ProjectTasksModal({ onClose, project }) {
    const { getTasksForProject, taskAssignments, getUserById } = useApp();

    const tasks = getTasksForProject(project.project_id);

    function getAssigneeName(task_id) {
        const assignment = taskAssignments.find(a => a.task_id === task_id);
        if (!assignment) return 'Unassigned';
        const user = getUserById(assignment.employee_user_id);
        return user ? `${user.first_name} ${user.last_name}` : 'Unassigned';
    }

    return (
        <div className='ptm-overlay' onClick={onClose}>
            <div className='ptm-container' onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className='ptm-header'>
                    <div className='ptm-header-info'>
                        <div className='ptm-title'>{project.project_name}</div>
                        <div className='ptm-subtitle'>
                            {tasks.length} task{tasks.length !== 1 ? 's' : ''} · {project.project_status}
                        </div>
                    </div>
                    <button className='ptm-close' onClick={onClose}>✕</button>
                </div>

                {/* Task List */}
                <div className='ptm-list'>
                    {tasks.length === 0 ? (
                        <div className='ptm-empty'>No tasks for this project yet</div>
                    ) : (
                        tasks.map(task => (
                            <div className='ptm-task-row' key={task.task_id}>

                                {/* Left — name + description */}
                                <div className='ptm-task-main'>
                                    <div className='ptm-task-name'>{task.task_name}</div>
                                    <div className='ptm-task-desc'>{task.task_description}</div>
                                </div>

                                {/* Assignee */}
                                <div className='ptm-task-assignee'>
                                    <div className='ptm-label'>Assignee</div>
                                    <div className='ptm-value'>{getAssigneeName(task.task_id)}</div>
                                </div>

                                {/* Due date */}
                                <div className='ptm-task-due'>
                                    <div className='ptm-label'>Due</div>
                                    <div className='ptm-value'>{task.target_date ?? '—'}</div>
                                </div>

                                {/* Status badge */}
                                <div
                                    className='ptm-status-badge'
                                    style={{ background: statusColor[task.task_status] ?? '#cfccf854' }}
                                >
                                    {task.task_status}
                                </div>

                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
