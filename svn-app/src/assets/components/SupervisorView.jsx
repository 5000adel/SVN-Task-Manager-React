import './styles/SupervisorView.css'
import EmployeeCard from './EmployeeCard';
import MinimalTaskCard from './MinimalTaskCard';
import { useApp } from '../../context/AppContext'

export default function SupervisorView() {
    const { currentUser, employees, tasks, loading } = useApp();

    const pending   = tasks.filter(t => t.task_status === 'To Do' || t.task_status === 'In Progress').length;
    const overdue   = tasks.filter(t => t.task_status === 'Overdue').length;
    const completed = tasks.filter(t => t.task_status === 'Completed').length;

    return (
        <div className='supervisor-view-container'>
            <div className='sv-header'>
                <div className='sv-title'>Dashboard</div>
            </div>

            <div className='supervisor-dashboard-container'>

                {/* Employees column */}
                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>Employees</div>
                    <div className='supervisor-body'>
                        {loading ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                                Loading...
                            </div>
                        ) : employees.length === 0 ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                                No employees found
                            </div>
                        ) : (
                            employees.map(emp => (
                                <EmployeeCard key={emp.user_id} employee={emp} />
                            ))
                        )}
                    </div>
                </div>

                {/* Tasks column */}
                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>Tasks</div>
                    <div className='supervisor-body'>
                        {loading ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                                Loading...
                            </div>
                        ) : tasks.length === 0 ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                                No tasks found
                            </div>
                        ) : (
                            tasks.map(task => (
                                <MinimalTaskCard key={task.task_id} task={task} />
                            ))
                        )}
                    </div>
                </div>

                {/* Overall Status column */}
                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>Overall Status</div>
                    <div className='supervisor-overview-parent-container'>
                        <div className='supervisor-overview-container'>
                            Pending
                            <subtitle>{pending} tasks</subtitle>
                        </div>
                        <div className='supervisor-overview-container'>
                            Overdue
                            <subtitle>{overdue} tasks</subtitle>
                        </div>
                        <div className='supervisor-overview-container'>
                            Employees
                            <subtitle>{employees.length} total</subtitle>
                        </div>
                        <div className='supervisor-overview-container'>
                            Total Tasks
                            <subtitle>{tasks.length} tasks</subtitle>
                        </div>
                    </div>
                </div>

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