import './styles/SupervisorView.css'
import TaskObject from './TaskObject'
import EmployeeCard from './EmployeeCard';
import MinimalTaskCard from './TaskCard';
export default function SupervisorView() {
    return (
        <div className='supervisor-view-container'>
            <div className='header' style={{ color: '#ffffffc4', fontSize: '20px', textAlign: 'left', alignItems: 'center' }}>
                Dashboard
            </div>

            <div className='supervisor-dashboard-container'>
                <div className='supervisor-dashboard-sub-container'>
                    <div className='header' style={{ fontSize: '20px' }}>Employees</div>
                    <div className='supervisor-body'>
                        <EmployeeCard />
                        <EmployeeCard />
                        <EmployeeCard />
                        <EmployeeCard />
                        <EmployeeCard />
                        <EmployeeCard />
                    </div>
                </div>
                <div className='supervisor-dashboard-sub-container'>
                    <div className='header' style={{ fontSize: '20px' }}>Tasks</div>
                    <div className='supervisor-body'>
                        <MinimalTaskCard />
                        <MinimalTaskCard />
                        <MinimalTaskCard />
                    </div>
                </div>
                <div className='supervisor-dashboard-sub-container'>
                    <div className='header' style={{ fontSize: '20px' }}>Overall Status</div>
                    <div className='supervisor-overview-parent-container'>
                        <div className='supervisor-overview-container'>
                            Pending
                            <subtitle>[pending tasks]</subtitle>
                        </div>
                        <div className='supervisor-overview-container'>
                            Overdue
                            <subtitle>[overdue tasks]</subtitle>
                        </div>
                        <div className='supervisor-overview-container'>
                            Employees
                            <subtitle>[Employees]</subtitle>
                        </div>
                        <div className='supervisor-overview-container'>
                            Total Tasks
                            <subtitle>[total tasks]</subtitle>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='footer'>
                <div>SVN Yard - Safety First</div>
                <div style={{ marginLeft: 'auto', color: '#ffffff94' }}>Role: SUPERVISOR </div>
            </div>
        </div>
    );
}