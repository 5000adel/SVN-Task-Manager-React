import SideMenu from "../components/SideMenu";
import TaskView from "../components/TaskView";
import Background from "../components/Background"
import TopBar from "../components/TopBar";
import SupervisorView from "../components/SupervisorView";
export default function Dashboard({ onLogOut, role }) {
    let view;

    // admin and supervisor to be added
    if (role === "admin") view = <TaskView />;
    else if (role === "worker") view = <TaskView />;
    else if (role === "supervisor") view = <SupervisorView />;
    return (

        <Background>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                height: '100vh'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    flexGrow: '0'
                }}>
                    <TopBar onLogOut={onLogOut} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        flexGrow: '0'
                    }}>

                        <SideMenu role={role} />
                        {view}
                    </div>
                </div>

            </div>
        </Background>
    )

}