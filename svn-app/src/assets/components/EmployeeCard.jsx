import ViewCard from './ViewCard'
import { useState } from 'react';
import './styles/EmployeeCard.css'
export default function EmployeeCard() {
    const [showCard, setShowCard] = useState(false);
    return (
        <>
            <div className="employee-card-object-container" style={{ flexDirection: 'row', cursor:'pointer' }} onClick={() => { setShowCard(true); console.log("view card") }}>
                <div style={{ flexDirection: 'column' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', fontFamily: '"Syne", sans-serif', marginBottom: '10px' }}>[Employee Name]</div>
                    <div className="employee-status-container">
                    </div>
                </div>
                <div className='employee-status-container' >
                    <div style={{ border: 'none', borderLeft: '1px solid #cfccf8a1', borderRadius: '7px', fontWeight: '900', fontSize: '10px', gap: '10px', minWidth: '130px' }}>
                        <div>
                            {/* confirmed finished task */}
                            <span style={{ color: '#91df91' }}>Finished: [AMOUNT] <br /> </span>
                            {/* unfinished task */}
                            <span style={{ color: '#e0eb84' }}>Pending: [AMOUNT] <br /> </span>
                            {/* overdue task */}
                            <span style={{ color: '#e99191' }}>Overdues: [AMOUNT] <br /> </span>
                        </div>
                    </div>
                </div>
            </div>
            {showCard && <ViewCard onClose={() => setShowCard(false)} cardType={"employee"} />}
        </>
    )
}

