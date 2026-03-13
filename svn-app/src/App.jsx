import { useState } from 'react'
import './App.css'
import Auth from './assets/pages/Auth'
import Dashboard from './assets/pages/Dashboard'
import { AppProvider } from './context/AppContext'

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [showAuth, setShowAuth] = useState(true);

    function handleLogin(user) {
        setCurrentUser(user);
        setShowAuth(false);
    }

    function handleLogout() {
        setCurrentUser(null);
        setShowAuth(true);
    }

    return (
        <AppProvider currentUser={currentUser}>
            <div style={{ alignItems: 'center' }}>
                {!showAuth && (
                    <Dashboard
                        onLogOut={handleLogout}
                        role={currentUser?.role}
                    />
                )}
                {showAuth && (
                    <Auth onLogIn={handleLogin} />
                )}
            </div>
        </AppProvider>
    );
}

export default App
