// ToastContext.jsx
// Global toast notifications — wrap App with <ToastProvider>
// then call useToast() anywhere to show a toast
//
// Usage:
//   const { showToast } = useToast();
//   showToast("Task updated successfully");
//   showToast("Something went wrong", "error");

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

const toastStyles = {
    wrapper: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999,
        pointerEvents: 'none',
    },
    base: {
        padding: '12px 18px',
        borderRadius: '10px',
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '260px',
        maxWidth: '380px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        border: '1px solid',
        pointerEvents: 'all',
        animation: 'toast-in 0.2s ease-out',
    },
    success: {
        background: '#1a2e1a',
        borderColor: '#85cc8580',
    },
    error: {
        background: '#2e1a1a',
        borderColor: '#e9919180',
    },
    info: {
        background: '#1a1a2e',
        borderColor: '#a78bfa80',
    },
};

const icons = {
    success: '✓',
    error:   '✕',
    info:    'ℹ',
};

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <style>{`
                @keyframes toast-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <div style={toastStyles.wrapper}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        style={{ ...toastStyles.base, ...toastStyles[toast.type] }}
                        onClick={() => removeToast(toast.id)}
                    >
                        <span style={{ fontWeight: '900', fontSize: '16px' }}>
                            {icons[toast.type]}
                        </span>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used inside <ToastProvider>');
    return context;
}