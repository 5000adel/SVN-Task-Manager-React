

const bg = {
    background: '#00072055',
    minWidth: '100vw',
    minHeight: '100vh',
    position: 'absolute',
    top: '0',
    right: '0',
    backdropFilter: 'blur(7px)',
};

const glowbase = {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(90px)',
    opacity: '.14',
    zIndex: '0',
}

export default function Blur({ children }) {
    return (
        <div style={bg}>
            <div style={{
                ...glowbase,
                width: '500px',
                height: '500px',
                background: '#a78bfa',
                top: '-140px',
                left: '-120px',
            }}></div>


            <div style={{
                ...glowbase,
                width: '360px',
                height: '360px',
                background: '#6d28d9',
                bottom: '60px',
                right: '-80px',
            }}></div>
            {children}
        </div>
    );
}

