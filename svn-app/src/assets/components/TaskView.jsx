import './styles/TaskView.css'
import TaskObject from './TaskObject'
export default function TaskView() {
    return (
        <div className='task-view-container'>
            <div className='header' style={{ color: '#ffffffc4', fontSize: '20px', textAlign: 'left', alignItems: 'center' }}>Tasks
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: '10px', fontFamily: '"DM-Sans",sans-serif' }}>
                    <button>All</button>
                    <button>Today</button>
                    <button>Next 3 Days</button>
                    <button>Assigned</button>
                    <button>Overdue</button>
                </div>
            </div>
            <div className='task-container'>
                <TaskObject />
                <TaskObject />
                <TaskObject />
                <TaskObject />
            </div>
            <div className='footer'>
                <div>SVN Yard - Safety First</div>
                <div style={{marginLeft:'auto', color:'#ffffff94'}}>Role: [placeholder] </div>
            </div>
        </div>
    );
}