import './styles/ViewCard.css'
import ProgressBar from './ProgressBar';

export default function ViewCard({ onClose, cardType }) {

    if (cardType === "task") {
        return (
            <div className="view-card-container-parent" onClick={onClose}>
                <div className='view-card-container' onClick={(e) => e.stopPropagation()}>

                    {/* Header */}
                    <div className='view-card-header'>
                        <div className='view-card-title'>[Task Title]</div>
                        <div className='view-card-status'>Active</div>
                        <button className='view-card-close' onClick={onClose}>✕</button>
                    </div>

                    {/* Description */}
                    <div className='view-card-description'>[Task Description]</div>

                    {/* Tags */}
                    <div className='view-card-tags'>
                        <div className='view-card-tag view-card-tag-priority'>In Progress</div>
                        <div className='view-card-tag view-card-tag-deadline'>⚠ Overdue</div>
                        <div className='view-card-tag view-card-tag-supervisor'>👤 [Supervisor]</div>
                    </div>

                    <div className='view-card-divider' />

                    {/* Details */}
                    <div className='view-card-details'>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Assigned to</span>
                            <span>[Employee Name]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Due Date</span>
                            <span>[Date]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Project</span>
                            <span>[Project Name]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Created by</span>
                            <span>[Supervisor]</span>
                        </div>
                    </div>

                    <div className='view-card-divider' />

                    {/* Actions */}
                    <div className='view-card-actions'>
                        <button>Edit</button>
                        <button className='view-card-btn-primary'>Mark Complete</button>
                    </div>

                </div>
            </div>
        );
    }

    if (cardType === "project") {
        return (
            <div className="view-card-container-parent" onClick={onClose}>
                <div className='view-card-container' onClick={(e) => e.stopPropagation()}>

                    <div className='view-card-header'>
                        <div className='view-card-title'>[Project Title]</div>
                        <div className='view-card-status'>Active</div>
                        <button className='view-card-close' onClick={onClose}>✕</button>
                    </div>

                    <div className='view-card-description'>[Project Description]</div>

                    <div className='view-card-tags'>
                        <div className='view-card-tag view-card-tag-priority'>📅 [Start Date]</div>
                        <div className='view-card-tag view-card-tag-deadline'>⚠ [Due Date]</div>
                    </div>

                    <div className='view-card-divider' />

                    {/* Progress */}
                    <div className='view-card-details'>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Progress</span>
                            <div style={{ flex: 1 }}>
                                <ProgressBar value={6} max={10} />
                            </div>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Supervisor</span>
                            <span>[Supervisor Name]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Team</span>
                            <span>[Employee 1], [Employee 2], [Employee 3]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Tasks</span>
                            <span>6 / 10 completed</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Created by</span>
                            <span>[Admin Name]</span>
                        </div>
                    </div>

                    <div className='view-card-divider' />

                    <div className='view-card-actions'>
                        <button>Edit</button>
                        <button className='view-card-btn-primary'>View Tasks</button>
                    </div>

                </div>
            </div>
        );
    }

    if (cardType === "employee") {
        return (
            <div className="view-card-container-parent" onClick={onClose}>
                <div className='view-card-container' onClick={(e) => e.stopPropagation()}>

                    <div className='view-card-header'>
                        <div className='view-card-title'>[Employee Name]</div>
                        <div className='view-card-status' style={{ background: '#85cc85a1' }}>Active</div>
                        <button className='view-card-close' onClick={onClose}>✕</button>
                    </div>

                    <div className='view-card-description'>[Job Title / Role]</div>

                    <div className='view-card-divider' />

                    <div className='view-card-details'>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Employee ID</span>
                            <span>[ID]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Department</span>
                            <span>[Department]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Supervisor</span>
                            <span>[Supervisor Name]</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Tasks</span>
                            <span>[X] Active, [X] Completed</span>
                        </div>
                        <div className='view-card-detail-row'>
                            <span className='view-card-detail-label'>Joined</span>
                            <span>[Date]</span>
                        </div>
                    </div>

                    <div className='view-card-divider' />

                    <div className='view-card-actions'>
                        <button>Edit</button>
                        <button className='view-card-btn-primary'>View Tasks</button>
                    </div>

                </div>
            </div>
        );
    }

    return null;
}