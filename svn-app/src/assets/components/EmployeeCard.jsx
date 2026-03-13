import ViewCard from './ViewCard'
import { useState } from 'react';
import './styles/EmployeeCard.css'
import { useApp } from '../../context/AppContext'

export default function EmployeeCard({ employee }) {
    const [showCard, setShowCard] = useState(false);
    const { getTasksForEmployee } = useApp();

    if (!employee) return null;

    const employeeTasks = getTasksForEmployee(employee.user_id);
    const finished = employeeTasks.filter(t => t.task_status === 'Completed').length;
    const pending  = employeeTasks.filter(t => t.task_status === 'In Progress' || t.task_status === 'To Do').length;
    const overdue  = employeeTasks.filter(t => t.task_status === 'Overdue').length;

    const fullName = `${employee.first_name} ${employee.last_name}`;

    return (
        <>
            <div
                className="employee-card-object-container"
                style={{ flexDirection: 'row', cursor: 'pointer' }}
                onClick={() => setShowCard(true)}
            >
                <div style={{ flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', fontFamily: '"Syne", sans-serif', marginBottom: '10px' }}>
                        {fullName}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans",sans-serif', textTransform: 'uppercase' }}>
                        {employee.role} · {employee.experience_years}y exp
                    </div>
                </div>
                <div className='employee-status-container'>
                    <div style={{ border: 'none', borderLeft: '1px solid #cfccf8a1', borderRadius: '7px', fontWeight: '900', fontSize: '10px', gap: '10px', minWidth: '130px' }}>
                        <div>
                            <span style={{ color: '#91df91' }}>Finished: {finished}<br /></span>
                            <span style={{ color: '#e0eb84' }}>Pending: {pending}<br /></span>
                            <span style={{ color: '#e99191' }}>Overdues: {overdue}<br /></span>
                        </div>
                    </div>
                </div>
            </div>
            {showCard && (
                <ViewCard
                    onClose={() => setShowCard(false)}
                    cardType="employee"
                    data={{ employee, employeeTasks }}
                />
            )}
        </>
    );
}