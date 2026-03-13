import { useState } from 'react';
import './styles/TaskCard.css'
import ViewCard from './ViewCard'
import { useApp } from '../../context/AppContext'

const statusStyle = {
    'In Progress': { background: '#f8eacc54' },
    'To Do':       { background: '#cfccf854' },
    'Completed':   { background: '#85cc8554' },
    'Overdue':     { background: '#f8cfcc54' },
}

export default function TaskCard({ task }) {
    const [showCard, setShowCard] = useState(false);
    const { getUserById, taskAssignments } = useApp();

    // Get supervisor name from assignment
    const assignment = taskAssignments.find(a => a.task_id === task.task_id);
    const supervisor = assignment ? getUserById(assignment.assigned_by) : null;
    const supervisorName = supervisor
        ? `${supervisor.first_name} ${supervisor.last_name}`
        : 'Unassigned';

    const statusBg = statusStyle[task.task_status] ?? { background: '#cfccf854' };

    return (
        <>
            <div className="object-container" onClick={() => setShowCard(true)}>
                <div style={{ fontWeight: '700', fontSize: '18px', fontFamily: '"Syne", sans-serif' }}>
                    {task.task_name}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    {task.task_description}
                </div>
                <div className="task-status-container">
                    <div style={statusBg}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                        </svg>
                        {task.task_status}
                    </div>
                    <div style={{ background: '#cfccf854' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>
                        {task.target_date}
                    </div>
                    <div style={{ background: '#f8cfcc54' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        {supervisorName}
                    </div>
                </div>
            </div>
            {showCard && (
                <ViewCard
                    onClose={() => setShowCard(false)}
                    cardType="task"
                    data={{ task, supervisorName, assignment }}
                />
            )}
        </>
    );
}