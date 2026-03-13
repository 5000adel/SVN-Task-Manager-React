import './styles/ManageTaskView.css'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue':     '#f8cfcc54',
    'To Do':       '#41405054',
    'Completed':   '#85cc8554',
}

const filters = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue'];

export default function ManageTaskView() {
    const { projects, tasks, taskAssignments, getUserById, loading } = useApp();
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');

    const projectTasks = selectedProject
        ? tasks.filter(t => t.project_id === selectedProject)
        : [];

    const filteredTasks = filter === 'All'
        ? projectTasks
        : projectTasks.filter(t => t.task_status === filter);

    function getAssigneeName(task_id) {
        const assignment = taskAssignments.find(a => a.task_id === task_id);
        if (!assignment) return 'Unassigned';
        const user = getUserById(assignment.employee_user_id);
        return user ? `${user.first_name} ${user.last_name}` : 'Unassigned';
    }

    return (
        <div className='manage-task-container'>

            {/* Header */}
            <div className='manage-task-header'>
                <div className='manage-task-title'>Manage Tasks</div>
                <button className='manage-task-add' disabled={!selectedProject}>+ New Task</button>
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
                        <div className='manage-task-row' key={task.task_id}
                            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}>
                            <span className='mt-task-title'>{task.task_name}</span>
                            <span className='mt-assignee'>{getAssigneeName(task.task_id)}</span>
                            <span className='mt-due'>{task.target_date}</span>
                            <span className='mt-badge' style={{ background: statusColor[task.task_status] }}>
                                {task.task_status}
                            </span>
                            <div className='mt-actions'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}