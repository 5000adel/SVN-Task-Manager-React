import ProgressBar from './ProgressBar'
import './styles/ProjectCard.css'
import ViewCard from './ViewCard'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const statusStyle = {
    'Active':    { background: '#85cc85a1' },
    'On Hold':   { background: '#f8eacc54' },
    'Completed': { background: '#cfccf854' },
}

export default function ProjectCard({ project }) {
    const [showCard, setShowCard] = useState(false);
    const { getProgressForProject, getTasksForProject } = useApp();

    if (!project) return null;

    const progress  = getProgressForProject(project.project_id);
    const tasks     = getTasksForProject(project.project_id);
    const completed = tasks.filter(t => t.task_status === 'Completed').length;
    const total     = tasks.length;

    const statusBg = statusStyle[project.project_status] ?? { background: '#cccccc5b' };

    return (
        <>
            <div
                className="project-card-container"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowCard(true)}
            >
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                    <div style={{ fontWeight: '700', fontSize: '18px', fontFamily: '"Syne", sans-serif' }}>
                        {project.project_name}
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: '13px', borderRadius: '25px', padding: '0 14px', background: '#cccccc5b', fontFamily: '"DM Sans",sans-serif' }}>
                        Due {project.end_date}
                    </div>
                    <div style={{ textTransform: 'uppercase', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: '900', ...statusBg }}>
                        {project.project_status}
                    </div>
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    {project.project_description}
                </div>
                <ProgressBar value={completed} max={total || 1} />
            </div>

            {showCard && (
                <ViewCard
                    onClose={() => setShowCard(false)}
                    cardType="project"
                    data={{ project, progress, tasks, completed, total }}
                />
            )}
        </>
    );
}