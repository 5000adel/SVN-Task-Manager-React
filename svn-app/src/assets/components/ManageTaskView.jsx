import './styles/ManageTaskView.css'
import { useState } from 'react'

const projects = [
    { id: 1, name: 'Project Alpha' },
    { id: 2, name: 'Project Beta' },
    { id: 3, name: 'Project Gamma' },
]

const tasksByProject = {
    1: [
        { id: 1, title: 'Fix roof — Section B', assignee: 'Vince', priority: 'High', status: 'In Progress', due: 'Mar 15' },
        { id: 2, title: 'Install pipes — Unit 4', assignee: 'Daniel', priority: 'Medium', status: 'Overdue', due: 'Mar 10' },
    ],
    2: [
        { id: 3, title: 'Paint walls — Block A', assignee: 'Unassigned', priority: 'Low', status: 'To Do', due: 'Mar 20' },
    ],
    3: [
        { id: 4, title: 'Electrical wiring check', assignee: 'Vince', priority: 'High', status: 'Completed', due: 'Mar 8' },
    ],
}

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue': '#f8cfcc54',
    'To Do': '#41405054',
    'Completed': '#85cc8554',
}

const priorityColor = {
    'High': '#f8cfcc54',
    'Medium': '#f8eacc54',
    'Low': '#85cc8554',
}

export default function ManageTaskView() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('All');

    const tasks = selectedProject ? tasksByProject[selectedProject] || [] : [];
    const filters = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue'];
    const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

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
                    {projects.map(p => (
                        <div
                            key={p.id}
                            className={`mt-project-pill ${selectedProject === p.id ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedProject(p.id);
                                setFilter('All');
                            }}
                        >
                            {p.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters — only show when project is selected */}
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
                <div className='mt-empty-state'>
                    Select a project to view and manage its tasks
                </div>
            ) : filteredTasks.length === 0 ? (
                <div className='mt-empty-state'>
                    No tasks found for this filter
                </div>
            ) : (
                <div className='manage-task-list'>
                    <div className='manage-task-list-header'>
                        <span>Task</span>
                        <span>Assignee</span>
                        <span>Priority</span>
                        <span>Due</span>
                        <span>Status</span>
                        <span></span>
                    </div>
                    {filteredTasks.map(task => (
                        <div className='manage-task-row' key={task.id}>
                            <span className='mt-task-title'>{task.title}</span>
                            <span className='mt-assignee'>{task.assignee}</span>
                            <span className='mt-badge' style={{ background: priorityColor[task.priority] }}>{task.priority}</span>
                            <span className='mt-due'>{task.due}</span>
                            <span className='mt-badge' style={{ background: statusColor[task.status] }}>{task.status}</span>
                            <div className='mt-actions'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}