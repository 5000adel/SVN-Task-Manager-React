import './styles/SupervisorView.css'
import EmployeeCard from './EmployeeCard';
import MinimalTaskCard from './MinimalTaskCard';
import { useApp } from '../../context/AppContext'

export default function SupervisorView({ searchQuery = '' }) {
    const { currentUser, employees, tasks, loading } = useApp();

    const q = searchQuery.toLowerCase();

    const filteredEmployees = employees.filter(emp => {
        if (!searchQuery) return true;
        return (
            emp.first_name.toLowerCase().includes(q) ||
            emp.last_name.toLowerCase().includes(q) ||
            `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(q) ||
            emp.role.toLowerCase().includes(q)
        );
    });

    const filteredTasks = tasks.filter(t => {
        if (!searchQuery) return true;
        return (
            t.task_name.toLowerCase().includes(q) ||
            (t.task_description ?? '').toLowerCase().includes(q) ||
            t.task_status.toLowerCase().includes(q)
        );
    });

    const pending   = tasks.filter(t => t.task_status === 'To Do' || t.task_status === 'In Progress').length;
    const overdue   = tasks.filter(t => t.task_status === 'Overdue').length;

    return (
        <div className='supervisor-view-container'>
            <div className='sv-header'>
                <div className='sv-title'>
                    Dashboard
                    {searchQuery && (
                        <span style={{ fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.4)', marginLeft: '10px', fontFamily: '"DM Sans",sans-serif' }}>
                            "{searchQuery}"
                        </span>
                    )}
                </div>
            </div>

            <div className='supervisor-dashboard-container'>

                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>
                        Employees {searchQuery && `(${filteredEmployees.length})`}
                    </div>
                    <div className='supervisor-body'>
                        {loading ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>Loading...</div>
                        ) : filteredEmployees.length === 0 ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                                {searchQuery ? `No employees match "${searchQuery}"` : 'No employees found'}
                            </div>
                        ) : (
                            filteredEmployees.map(emp => <EmployeeCard key={emp.user_id} employee={emp} />)
                        )}
                    </div>
                </div>

                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>
                        Tasks {searchQuery && `(${filteredTasks.length})`}
                    </div>
                    <div className='supervisor-body'>
                        {loading ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>Loading...</div>
                        ) : filteredTasks.length === 0 ? (
                            <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                                {searchQuery ? `No tasks match "${searchQuery}"` : 'No tasks found'}
                            </div>
                        ) : (
                            filteredTasks.map(task => <MinimalTaskCard key={task.task_id} task={task} />)
                        )}
                    </div>
                </div>

                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>Overall Status</div>
                    <div className='supervisor-overview-parent-container'>
                        <div className='supervisor-overview-container'>Pending<subtitle>{pending} tasks</subtitle></div>
                        <div className='supervisor-overview-container'>Overdue<subtitle>{overdue} tasks</subtitle></div>
                        <div className='supervisor-overview-container'>Employees<subtitle>{employees.length} total</subtitle></div>
                        <div className='supervisor-overview-container'>Total Tasks<subtitle>{tasks.length} tasks</subtitle></div>
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
