import { useApp } from '../../context/AppContext';
import './styles/ProjectTasksModal.css';

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue':     '#f8cfcc54',
    'To Do':       '#41405094',
    'Completed':   '#85cc8554',
}

export default function EmployeeTasksModal({ onClose, employee }) {
    const { getTasksForEmployee, projects } = useApp();

    const tasks = getTasksForEmployee(employee.user_id);

    function getProjectName(project_id) {
        const project = projects.find(p => p.project_id === project_id);
        return project ? project.project_name : '—';
    }

    return (
        <div className='ptm-overlay' onClick={onClose}>
            <div className='ptm-container' onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className='ptm-header'>
                    <div className='ptm-header-info'>
                        <div className='ptm-title'>
                            {employee.first_name} {employee.last_name}
                        </div>
                        <div className='ptm-subtitle'>
                            {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned · {employee.role}
                        </div>
                    </div>
                    <button className='ptm-close' onClick={onClose}>✕</button>
                </div>

                {/* Task List */}
                <div className='ptm-list'>
                    {tasks.length === 0 ? (
                        <div className='ptm-empty'>No tasks assigned to this employee</div>
                    ) : (
                        tasks.map(task => (
                            <div className='ptm-task-row' key={task.task_id}>

                                {/* Left — name only */}
                                <div className='ptm-task-main'>
                                    <div className='ptm-task-name'>{task.task_name}</div>
                                    <div className='ptm-task-desc'>
                                        {getProjectName(task.project_id)}
                                    </div>
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