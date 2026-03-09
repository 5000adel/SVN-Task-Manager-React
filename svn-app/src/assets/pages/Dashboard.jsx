import SideMenu from "../components/SideMenu";
import TaskView from "../components/TaskView";
import Background from "../components/Background"
import TopBar from "../components/TopBar";
export default function Dashboard({onLogOut}) {
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
                    flexDirection:'column',
                    justifyContent: 'center',
                    gap: '20px',
                    flexGrow: '0'
                }}>
                    <TopBar onLogOut={onLogOut}/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        flexGrow: '0'
                    }}>
                        <SideMenu />
                        <TaskView />
                    </div>
                </div>

            </div>
        </Background>
    )

}