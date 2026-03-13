import './styles/TaskView.css'
import TaskCard from './TaskCard'

export default function TaskView() {
    return (
        <div className='task-view-container'>
            <div className='tv-header'>
                <div className='tv-title'>Tasks</div>
                <div className='tv-filters'>
                    <button className='tv-filter-btn active'>All</button>
                    <button className='tv-filter-btn'>Today</button>
                    <button className='tv-filter-btn'>Next 3 Days</button>
                    <button className='tv-filter-btn'>Assigned</button>
                    <button className='tv-filter-btn'>Overdue</button>
                </div>
            </div>

            <div className='task-container'>
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>

            <div className='footer'>
                <div>SVN Yard - Safety First</div>
                <div style={{ marginLeft: 'auto', color: '#ffffff94' }}>Role: EMPLOYEE</div>
            </div>
        </div>
    );
}