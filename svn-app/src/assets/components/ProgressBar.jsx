export default function ProgressBar({ value = 0, max = 100 }) {
    const percentage = Math.round((value / max) * 100);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
        }}>
            {/* Track */}
            <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '999px',
                overflow: 'hidden',
            }}>
                {/* Fill */}
                <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: '#a78bfa',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease',
                }} />
            </div>

            {/* Label */}
            <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: '"DM Sans", sans-serif',
            }}>
                {value}/{max} tasks
            </div>
        </div>
    );
}