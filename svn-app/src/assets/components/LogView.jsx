import './styles/LogView.css'


// temporary logs
const logs = [
    { id: 1, type: 'task', action: 'Task completed', user: 'Vince', time: '2 mins ago', detail: 'Fix roof — Section B' },
    { id: 2, type: 'account', action: 'Account created', user: 'Admin', time: '1 hr ago', detail: 'New employee: Daniel' },
    { id: 3, type: 'project', action: 'Project updated', user: 'Maria', time: '3 hrs ago', detail: 'Project Alpha — status changed' },
    { id: 4, type: 'task', action: 'Task overdue', user: 'System', time: '5 hrs ago', detail: 'Install pipes — Unit 4' },
    { id: 5, type: 'account', action: 'Password changed', user: 'Daniel', time: '1 day ago', detail: 'Account security update' },
]

const typeColor = {
    task: '#a78bfa54',
    account: '#85cc8554',
    project: '#f8eacc54',
}

const typeLabel = {
    task: 'Task',
    account: 'Account',
    project: 'Project',
}

export default function LogView() {
    return (
        <div className='log-view-container'>
            <div className='log-header'>
                <div className='log-title'>Activity Log</div>
                <div className='log-subtitle'>System-wide activity for all users</div>
            </div>

            <div className='log-filters'>
                <button className='log-filter-btn active'>All</button>
                <button className='log-filter-btn'>Tasks</button>
                <button className='log-filter-btn'>Accounts</button>
                <button className='log-filter-btn'>Projects</button>
            </div>

            <div className='log-list'>
                {logs.map(log => (
                    <div className='log-item' key={log.id}>
                        <div className='log-item-left'>
                            <div className='log-type-badge' style={{ background: typeColor[log.type] }}>
                                {typeLabel[log.type]}
                            </div>
                            <div className='log-item-info'>
                                <div className='log-action'>{log.action}</div>
                                <div className='log-detail'>{log.detail}</div>
                            </div>
                        </div>
                        <div className='log-item-right'>
                            <div className='log-user'>{log.user}</div>
                            <div className='log-time'>{log.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}