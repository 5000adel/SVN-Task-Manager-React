import ViewCard from './ViewCard'
import { useState } from 'react';
import './styles/MinimalTaskCard.css'

const statusStyle = {
    'In Progress': { color: '#e0eb84' },
    'To Do':       { color: '#ffffffc4' },
    'Completed':   { color: '#91df91' },
    'Overdue':     { color: '#e99191' },
}

export default function MinimalTaskCard({ task }) {
    const [showCard, setShowCard] = useState(false);

    if (!task) return null;

    const statusColor = statusStyle[task.task_status] ?? { color: '#ffffffc4' };

    return (
        <>
            <div
                className="task-card-object-container"
                style={{ flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => setShowCard(true)}
            >
                <div style={{ fontWeight: '700', fontSize: '14px', fontFamily: '"Syne", sans-serif' }}>
                    {task.task_name}
                </div>
                <div className="task-card-status-container">
                    <div>
                        <span>Status: </span>
                        <span style={statusColor}>{task.task_status}</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
                        Due: {task.target_date}
                    </div>
                </div>
            </div>
            {showCard && (
                <ViewCard
                    onClose={() => setShowCard(false)}
                    cardType="task"
                    data={{ task }}
                />
            )}
        </>
    );
}