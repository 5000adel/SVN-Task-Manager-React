import ProgressBar from './ProgressBar'
import Auth from '../pages/Auth'
import './styles/ProjectCard.css'
import { useState } from 'react'
export default function ProjectCard() {
    const [open, setOpen] = useState(false);
    return (
        <div className="project-card-container" style={{cursor:'pointer'}}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <div style={{ fontWeight: '700', fontSize: '18px', fontFamily: '"Syne", sans-serif' }}>[Task Placeholder]</div>
                <div style={{ marginLeft: 'auto', fontSize: '18px', borderRadius: '25px', padding: ' 0 25px', background: '#cccccc5b' }}>Due Date</div>
                <div style={{ textTransform: 'uppercase', background: '#85cc85a1', padding: '5px 10px', borderRadius: '5px' }}>Active</div>
            </div>

            <div style={{ fontSize: '14px' }}>[Description Placeholder]</div>
            <ProgressBar value={1} max={10} />
        </div >
    )
}