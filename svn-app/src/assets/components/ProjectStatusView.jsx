import './styles/ProjectStatusView.css'
import ProjectCard from './ProjectCard';

export default function ProjectStatusView() {
    return (
        <div className='project-container'>
            <div className='header' style={{ color: '#ffffffc4', fontSize: '20px', textAlign: 'left', alignItems: 'center', borderRadius: '5px' }}>Projects
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: '10px', fontFamily: '"DM-Sans",sans-serif' }}>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                    <button>Overdue</button>
                </div>
            </div>
            <div>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    );
}