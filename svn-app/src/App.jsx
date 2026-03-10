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

  return (
    <>
      <div style={{ alignItems: 'center' }}>
        <Background />
        <Dashboard onLogOut={() => setShowAuth(true)} role={"supervisor"}/>
        {showAuth && <Auth onLogIn={() => setShowAuth(false)}/>};
      </div>
    </>
  )
}

export default App
