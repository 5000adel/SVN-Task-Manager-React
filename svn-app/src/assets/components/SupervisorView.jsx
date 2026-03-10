import './styles/SupervisorView.css'
import TaskObject from './TaskObject'
import WorkerCard from './WorkerCard';
export default function SupervisorView() {
    return (
        <div className='supervisor-view-container'>
            <div className='header' style={{ color: '#ffffffc4', fontSize: '20px', textAlign: 'left', alignItems: 'center' }}>
                Dashboard
            </div>

            <div className='supervisor-dashboard-container'>
                <div className='supervisor-dashboard-sub-container'>
                    <div className='header' style={{fontSize:'20px'}}>Workers</div>
                    <div className='supervisor-body'>
                        <WorkerCard/>
                        <WorkerCard/>
                        <WorkerCard/>
                        <WorkerCard/>
                        <WorkerCard/>
                        <WorkerCard/>
                    </div>
                </div>
                <div className='supervisor-dashboard-sub-container'>
                    <div className='header' style={{fontSize:'20px'}}>Tasks</div>
                </div>
                <div className='supervisor-dashboard-sub-container'>
                    <div className='header' style={{fontSize:'20px'}}>Overall Status</div>
                </div>
            </div>

            <div className='footer'>
                <div>SVN Yard - Safety First</div>
                <div style={{marginLeft:'auto', color:'#ffffff94'}}>Role: SUPERVISOR </div>
            </div>
        </div>
    );
}