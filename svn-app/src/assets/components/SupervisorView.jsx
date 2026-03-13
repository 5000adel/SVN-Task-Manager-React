import './styles/SupervisorView.css'
import EmployeeCard from './EmployeeCard';
import MinimalTaskCard from './MinimalTaskCard';

export default function SupervisorView() {
    return (
        <div className='supervisor-view-container'>
            <div className='sv-header'>
                <div className='sv-title'>Dashboard</div>
            </div>

            <div className='supervisor-dashboard-container'>

                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>Employees</div>
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
                    <div className='sv-sub-header'>Tasks</div>
                    <div className='supervisor-body'>
                        <MinimalTaskCard />
                        <MinimalTaskCard />
                        <MinimalTaskCard />
                    </div>
                </div>

                <div className='supervisor-dashboard-sub-container'>
                    <div className='sv-sub-header'>Overall Status</div>
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
                <div style={{ marginLeft: 'auto', color: '#ffffff94' }}>Role: SUPERVISOR</div>
            </div>
        </div>
    );
}