import ViewCard from './ViewCard'
import { useState } from 'react';
import './styles/MinimalTaskCard.css'
export default function MinimalTaskCard() {
    const [showCard, setShowCard] = useState(false);
    return (
        <>
            <div className="task-card-object-container" style={{ flexDirection: 'column' }} onClick={() => { setShowCard(true); console.log("view card") }}>
                <div style={{ fontWeight: '700', fontSize: '14px', fontFamily: '"Syne", sans-serif' }}>[Task Placeholder]</div>
                <div className="task-card-status-container">
                    {/* confirmed finished task */}
                    <div><span>Status:</span> [placeholder] </div>
                </div>
            </div>
            {showCard && <ViewCard onClose={() => setShowCard(false)} cardType={"task"} />}
        </>
    )
}
