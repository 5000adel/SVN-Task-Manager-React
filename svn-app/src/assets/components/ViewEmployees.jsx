import './styles/ViewEmployees.css'

const employees = [
    { id: 1, name: 'Vince', role: 'Operator', tasks: 3, status: 'Active', joined: 'Jan 2024' },
    { id: 2, name: 'Daniel', role: 'Manager', tasks: 5, status: 'Active', joined: 'Mar 2023' },
    { id: 3, name: 'Maria', role: 'Operator', tasks: 1, status: 'Inactive', joined: 'Jun 2024' },
]

export default function ViewEmployees() {
    return (
        <div className='view-employees-container'>
            <div className='ve-header'>
                <div className='ve-title'>Employees</div>
                <button className='ve-add-btn'>+ Add Employee</button>
            </div>

            <div className='ve-list'>
                {employees.map(emp => (
                    <div className='ve-card' key={emp.id}>
                        <div className='ve-avatar'>
                            {emp.name.charAt(0)}
                        </div>
                        <div className='ve-info'>
                            <div className='ve-name'>{emp.name}</div>
                            <div className='ve-role'>{emp.role}</div>
                        </div>
                        <div className='ve-meta'>
                            <div className='ve-tasks'>{emp.tasks} active tasks</div>
                            <div className='ve-joined'>Since {emp.joined}</div>
                        </div>
                        <div className='ve-status-badge' style={{
                            background: emp.status === 'Active' ? '#85cc8554' : '#f8cfcc54'
                        }}>
                            {emp.status}
                        </div>
                        <div className='ve-actions'>
                            <button>View</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}