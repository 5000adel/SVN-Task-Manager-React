import './styles/LogView.css'
import { useApp } from '../../context/AppContext'
import { useState } from 'react'

const typeColor = {
    task:    '#a78bfa54',
    account: '#85cc8554',
    project: '#f8eacc54',
}

const typeLabel = {
    task:    'Task',
    account: 'Account',
    project: 'Project',
}

const filterOptions = ['All', 'Task', 'Account', 'Project'];

function timeAgo(timestamp) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins < 60)  return `${mins} min${mins !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}

export default function LogView() {
    const { logs, loading } = useApp();
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredLogs = activeFilter === 'All'
        ? logs
        : logs.filter(l => l.entity_type === activeFilter.toLowerCase());

    return (
        <div className='log-view-container'>
            <div className='log-header'>
                <div className='log-title'>Activity Log</div>
                <div className='log-subtitle'>System-wide activity for all users</div>
            </div>

            <div className='log-filters'>
                {filterOptions.map(f => (
                    <button
                        key={f}
                        className={`log-filter-btn ${activeFilter === f ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className='log-list'>
                {loading ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        Loading logs...
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        No logs found
                    </div>
                ) : (
                    filteredLogs.map(log => (
                        <div className='log-item' key={log.log_id}>
                            <div className='log-item-left'>
                                <div
                                    className='log-type-badge'
                                    style={{ background: typeColor[log.entity_type] ?? '#cfccf854' }}
                                >
                                    {typeLabel[log.entity_type] ?? log.entity_type}
                                </div>
                                <div className='log-item-info'>
                                    <div className='log-action'>{log.action}</div>
                                    <div className='log-detail'>
                                        {log.entity_type} · ID: {log.entity_id}
                                    </div>
                                </div>
                            </div>
                            <div className='log-item-right'>
                                <div className='log-user'>{log.user_name}</div>
                                <div className='log-time'>{timeAgo(log.timestamp)}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}