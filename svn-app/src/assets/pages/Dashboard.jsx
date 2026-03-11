import SideMenu from "../components/SideMenu";
import TaskView from "../components/TaskView";
import Background from "../components/Background"
import TopBar from "../components/TopBar";
import SupervisorView from "../components/SupervisorView";
import ProjectStatusView from "../components/ProjectStatusView";
export default function Dashboard({ onLogOut, role }) {
    const commonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    }
    let view;

    // admin and supervisor to be added
    if (role === "admin") view = <TaskView />;
    else if (role === "employee") view = <TaskView />;
    else if (role === "supervisor") view = <SupervisorView />;
    return (

        <Background>
            <div style={{
                ...commonStyle,
                paddingTop: '3vh'
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
                        ...commonStyle,
                        alignItems:'flex-start',
                        flexGrow: '0'
                    }}>

                        <SideMenu role={role} />

                        <div style={{ ...commonStyle, display: 'flex', flexDirection: 'column' }}>
                            {view}
                        </div>
                    </div>
                    <ProjectStatusView />
                </div>

            </div>
        </Background>
    )

}