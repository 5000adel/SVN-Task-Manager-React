import './styles/ViewEmployees.css'
import { useApp } from '../../context/AppContext'
import ViewCard from './ViewCard'
import { useState } from 'react'

export default function ViewEmployees() {
    const { employees, getTasksForEmployee, loading } = useApp();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <div className='view-employees-container'>
            <div className='ve-header'>
                <div className='ve-title'>Employees</div>
                <button className='ve-add-btn'>+ Add Employee</button>
            </div>

            <div className='ve-list'>
                {loading ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        Loading employees...
                    </div>
                ) : employees.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        No employees found
                    </div>
                ) : (
                    employees.map(emp => {
                        const empTasks = getTasksForEmployee(emp.user_id);
                        const activeTasks = empTasks.filter(
                            t => t.task_status === 'In Progress' || t.task_status === 'To Do'
                        ).length;

                        return (
                            <div
                                className='ve-card'
                                key={emp.user_id}
                                onClick={() => setSelectedEmployee(emp)}
                            >
                                <div className='ve-avatar'>
                                    {emp.first_name.charAt(0)}
                                </div>
                                <div className='ve-info'>
                                    <div className='ve-name'>{emp.first_name} {emp.last_name}</div>
                                    <div className='ve-role'>{emp.role} · {emp.experience_years}y exp</div>
                                </div>
                                <div className='ve-meta'>
                                    <div className='ve-tasks'>{activeTasks} active tasks</div>
                                    <div className='ve-joined'>
                                        {emp.availability_status ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>
                                <div className='ve-status-badge' style={{
                                    background: emp.availability_status ? '#85cc8554' : '#f8cfcc54'
                                }}>
                                    {emp.availability_status ? 'Active' : 'Inactive'}
                                </div>
                                <div className='ve-actions' onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setSelectedEmployee(emp)}>View</button>
                                    <button>Edit</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {selectedEmployee && (
                <ViewCard
                    onClose={() => setSelectedEmployee(null)}
                    cardType="employee"
                    data={{
                        employee: selectedEmployee,
                        employeeTasks: getTasksForEmployee(selectedEmployee.user_id),
                    }}
                />
            )}
        </div>
    );
}