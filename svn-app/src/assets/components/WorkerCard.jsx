import './styles/WorkerCard.css'
export default function WorkerCard() {
    return (

        <div className="worker-card-object-container" style={{ flexDirection: 'row' }}>
            <div style={{ flexDirection: 'column' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', fontFamily: '"Syne", sans-serif', marginBottom: '10px' }}>[Worker Name]</div>
                <div className="worker-status-container">
                    {/* confirmed finished task */}
                    <div><span>Finished:</span> [AMOUNT] </div>
                    {/* unfinished task */}
                    <div><span>Pending:</span> [AMOUNT] </div>
                    {/* overdue task */}
                    <div><span>Overdues:</span> [AMOUNT] </div>
                </div>
            </div>
            <div className='worker-status-container' >
                <div style={{ borderRadius: '10px', fontWeight: '900', fontSize: '14px', gap: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5" />
                    </svg>
                    <div>
                        [X] <span style={{ fontSize: '10px' }}>PTS</span>
                    </div>

                </div>
            </div>
        </div>
    )
}