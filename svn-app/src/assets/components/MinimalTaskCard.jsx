import './styles/TaskCard.css'
export default function MinimalTaskCard() {
    return (

        <div className="task-card-object-container" style={{ flexDirection: 'column' }}>
            <div style={{ fontWeight: '700', fontSize: '14px', fontFamily: '"Syne", sans-serif'}}>[Task Placeholder]</div>
            <div className="task-card-status-container">
                {/* confirmed finished task */}
                <div><span>Status:</span> [placeholder] </div>
            </div>
        </div>
    )
}