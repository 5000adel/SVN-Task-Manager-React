import './styles/SideMenu.css'
export default function SideMenu() {
    return (

        <div className='side-menu-container'>
            <div className='header' style={{ fontSize: '20px' }}>Menu</div>

            
            <div className='sub-container'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layers" viewBox="0 0 16 16">
                        <path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0zM8 9.433 1.562 6 8 2.567 14.438 6z" />
                    </svg>
                    <>Tasks</>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                    <>Account Settings</>
                </button>
            </div>


            <div className='sub-container'>
                <div className='overview'>
                    <div className='flex-item'>
                        [placeholder]
                        <subtitle>Workers</subtitle>
                    </div>
                    <div className='flex-item'>
                        [placeholder]
                        <subtitle>Tasks</subtitle>
                    </div>
                    <div className='flex-item'>
                        [placeholder]
                        <subtitle>Overdue</subtitle>
                    </div>
                    <div className='flex-item'>
                        [placeholder]
                        <subtitle>Due Today</subtitle>
                    </div>
                </div>
            </div>


            <div className='sub-container' style={{flex:'1'}}>
                <div className='overview' style={{flex:'1'}}>
                    <div style={{ fontSize: '18px',textAlign:'left'}}>Instructions
                    <subtitle style={{ textAlign: 'left', fontSize: '14px', fontWeight: '100' }}>
                        <ul>
                            <li><span style={{ fontWeight: 'bold' }}>Worker</span>: sees only assigned “To Do” tasks.</li>
                            <li><span style={{ fontWeight: 'bold' }}>Supervisor</span>: create tasks, place assignments.</li>
                            <li><span style={{ fontWeight: 'bold' }}>Admin</span>: manage tasks, workers, and accounts</li>
                        </ul>
                    </subtitle>
                    </div>
                </div>
            </div>

        </div>

    )
}