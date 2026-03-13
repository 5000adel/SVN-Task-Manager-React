import './styles/ProjectStatusView.css'
import ProjectCard from './ProjectCard';
import { useApp } from '../../context/AppContext'
import { useState } from 'react'

const filters = ['All', 'Active', 'On Hold', 'Completed'];

export default function ProjectStatusView({ searchQuery = '' }) {
    const { projects, loading } = useApp();
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProjects = projects
        .filter(p => activeFilter === 'All' || p.project_status === activeFilter)
        .filter(p => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
                p.project_name.toLowerCase().includes(q) ||
                (p.project_description ?? '').toLowerCase().includes(q) ||
                p.project_status.toLowerCase().includes(q)
            );
        });

    return (
        <div className='project-container'>
            <div className='header' style={{ color: '#ffffffc4', fontSize: '20px', textAlign: 'left', alignItems: 'center', borderRadius: '5px' }}>
                Projects
                {searchQuery && (
                    <span style={{ fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.4)', marginLeft: '10px', fontFamily: '"DM Sans",sans-serif' }}>
                        "{searchQuery}"
                    </span>
                )}
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: '10px', fontFamily: '"DM Sans",sans-serif' }}>
                    {filters.map(f => (
                        <button
                            key={f}
                            style={{
                                background: activeFilter === f ? '#a78bfa54' : 'transparent',
                                borderColor: activeFilter === f ? '#a78bfa' : undefined,
                                color: activeFilter === f ? 'white' : undefined,
                            }}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {loading ? (
                    <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>Loading projects...</div>
                ) : filteredProjects.length === 0 ? (
                    <div style={{ padding: '16px', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        {searchQuery ? `No projects match "${searchQuery}"` : 'No projects found'}
                    </div>
                ) : (
                    filteredProjects.map(project => <ProjectCard key={project.project_id} project={project} />)
                )}
            </div>
        </div>
    );
}
