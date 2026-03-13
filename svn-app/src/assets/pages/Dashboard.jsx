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

    const [searchQuery, setSearchQuery] = useState('');

    // Reset search when navigating
    function handleNavigate(destination) {
        setSearchQuery('');
        if      (destination === 'dashboard')   setView(defaultView());
        else if (destination === 'logs')        setView(<LogView searchQuery='' />);
        else if (destination === 'managetasks') setView(<ManageTaskView searchQuery='' />);
        else if (destination === 'employees')   setView(<ViewEmployees searchQuery='' />);
        else if (destination === 'settings')    setView(<AccountSettings />);
        else if (destination === 'tasks')       setView(<TaskView searchQuery='' />);
        else if (destination === 'accounts')    setView(<ManageAccounts searchQuery='' />);
    }

    const defaultView = () => {
        if (role === 'admin')      return 'dashboard-admin';
        if (role === 'employee')   return 'tasks';
        if (role === 'supervisor') return 'dashboard-supervisor';
        return 'tasks';
    }

    const [currentView, setCurrentView] = useState(defaultView());

    function setView(v) { setCurrentView(v); }

    function handleNavigateFinal(destination) {
        setSearchQuery('');
        setCurrentView(destination);
    }

    function renderView() {
        switch (currentView) {
            case 'dashboard-admin':
                return <><TaskView searchQuery={searchQuery} /><SupervisorView searchQuery={searchQuery} /></>;
            case 'dashboard-supervisor':
                return <SupervisorView searchQuery={searchQuery} />;
            case 'tasks':
                return <TaskView searchQuery={searchQuery} />;
            case 'logs':
                return <LogView searchQuery={searchQuery} />;
            case 'managetasks':
                return <ManageTaskView searchQuery={searchQuery} />;
            case 'employees':
                return <ViewEmployees searchQuery={searchQuery} />;
            case 'settings':
                return <AccountSettings />;
            case 'accounts':
                return <ManageAccounts searchQuery={searchQuery} />;
            default:
                return <TaskView searchQuery={searchQuery} />;
        }
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
                    <TopBar
                        onLogOut={onLogOut}
                        onSearch={setSearchQuery}
                        searchQuery={searchQuery}
                    />
                    <div style={{ ...commonStyle, alignItems: 'stretch', flex: '1' }}>
                        <SideMenu role={role} onNavigate={handleNavigateFinal} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            overflowY: 'auto',
                            alignItems: 'stretch',
                        }}>
                            {renderView()}
                        </div>
                    </div>
                    <ProjectStatusView searchQuery={searchQuery} />
                </div>
            </div>
        </Background>
    )
}
