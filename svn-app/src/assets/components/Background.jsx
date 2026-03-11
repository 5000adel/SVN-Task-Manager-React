

const bg = {
    background: '#000720',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    right: '0',
    overflowY: 'auto'
};

const glowbase = {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(90px)',
    opacity: '.14',
    zIndex: '0',
}

export default function Background({ children, blur }) {
    return (
        <div style={{ ...bg, backdropFilter: blur ? 'blur(7px)' : 'none' }}>
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

