import './styles/TaskView.css'
import TaskCard from './TaskCard'
import { useApp } from '../../context/AppContext'
import { useState } from 'react'

const filters = ['All', 'To Do', 'In Progress', 'Completed', 'Overdue'];

export default function TaskView() {
    const { currentUser, tasks, taskAssignments, loading } = useApp();
    const [activeFilter, setActiveFilter] = useState('All');

    // Get only tasks assigned to this employee
    const assignedTaskIds = taskAssignments
        .filter(a => a.employee_user_id === currentUser?.user_id)
        .map(a => a.task_id);

    const myTasks = tasks.filter(t => assignedTaskIds.includes(t.task_id));

    const filteredTasks = activeFilter === 'All'
        ? myTasks
        : myTasks.filter(t => t.task_status === activeFilter);

    return (
        <div className='task-view-container'>
            <div className='tv-header'>
                <div className='tv-title'>Tasks</div>
                <div className='tv-filters'>
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`tv-filter-btn ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className='task-container'>
                {loading ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', padding: '20px' }}>
                        Loading tasks...
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', padding: '20px' }}>
                        No tasks found
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <TaskCard key={task.task_id} task={task} />
                    ))
                )}
            </div>

            <div className='footer'>
                <div>SVN Yard - Safety First</div>
                <div style={{ marginLeft: 'auto', color: '#ffffff94' }}>
                    Role: {currentUser?.role?.toUpperCase()}
                </div>
            </div>
        </div>
    );
}