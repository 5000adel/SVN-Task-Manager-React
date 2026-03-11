import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './assets/pages/Auth'
import Background from './assets/components/Background'
import Dashboard from './assets/pages/Dashboard'

function App() {
  const [count, setCount] = useState(0);
  const [showAuth, setShowAuth] = useState(true);
  const [role, setRole] = useState("");

  return (
    <>
      <div style={{ alignItems: 'center' }}>
        <Background />
        <Dashboard onLogOut={() => setShowAuth(true)} role={role}/>
        {showAuth && <Auth onLogIn={(selectedRole) => {setShowAuth(false); setRole(selectedRole)}}/>};
      </div>
    </>
  )
}

export default App
