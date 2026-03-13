import { useState } from 'react'
import SideMenu from "../components/SideMenu";
import TaskView from "../components/TaskView";
import Background from "../components/Background"
import TopBar from "../components/TopBar";
import SupervisorView from "../components/SupervisorView";
import ProjectStatusView from "../components/ProjectStatusView";
import LogView from "../components/LogView";
import ManageTaskView from "../components/ManageTaskView";
import ViewEmployees from "../components/ViewEmployees";
import AccountSettings from "../components/AccountSettings";
import ManageAccounts from "../components/ManageAccounts";

export default function Dashboard({ onLogOut, role }) {
    const commonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    }

    const defaultView = () => {
        if (role === "admin")      return <><TaskView /><SupervisorView /></>;
        if (role === "employee")   return <TaskView />;
        if (role === "supervisor") return <SupervisorView />;
    }

    const [view, setView] = useState(defaultView());

    function handleNavigate(destination) {
        if      (destination === 'dashboard')  setView(defaultView());
        else if (destination === 'logs')       setView(<LogView />);
        else if (destination === 'managetasks') setView(<ManageTaskView />);
        else if (destination === 'employees')  setView(<ViewEmployees />);
        else if (destination === 'settings')   setView(<AccountSettings />);
        else if (destination === 'tasks')      setView(<TaskView />);
        else if (destination === 'accounts')   setView(<ManageAccounts />);
    }

    return (
        <Background>
            <div style={{ ...commonStyle, paddingTop: '3vh' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    flexGrow: '0'
                }}>
                    <TopBar onLogOut={onLogOut} />
                    <div style={{ ...commonStyle, alignItems: 'stretch', flex: '1' }}>
                        <SideMenu role={role} onNavigate={handleNavigate} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            overflowY: 'auto',
                            alignItems: 'stretch',
                        }}>
                            {view}
                        </div>
                    </div>
                    <ProjectStatusView />
                </div>
            </div>
        </Background>
    )
}