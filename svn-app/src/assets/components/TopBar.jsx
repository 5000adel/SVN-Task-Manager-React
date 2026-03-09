import './styles/TopBar.css'
export default function TopBar({onLogOut}) {
    return (
        <div className='top-bar-container'>
            <div className='company-container'style={{flexShrink:'0',padding:'0 10px'}}>
                <div className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={32} height={32}>
                        <path d="M384 328L384 128C384 110.3 369.7 96 352 96L288 96C270.3 96 256 110.3 256 128L256 328C256 341.3 245.3 352 232 352C218.7 352 208 341.3 208 328L208 142.1C122 173.8 64 255.8 64 352L64 416L576 416L576 352C575 256.8 517.6 174.3 432 142.2L432 328C432 341.3 421.3 352 408 352C394.7 352 384 341.3 384 328zM72 464C49.9 464 32 481.9 32 504C32 526.1 49.9 544 72 544L568 544C590.1 544 608 526.1 608 504C608 481.9 590.1 464 568 464L72 464z" />
                    </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                    <div style={{ color: '#ffffffc4', fontFamily: '"Syne", sans-serif', fontSize: '20px', textAlign: 'left' }}>SVN</div>
                    <div style={{ color: '#ffffffc4', fontFamily: '"Syne", sans-serif', fontSize: '15px' }}>Construction & Hardware</div>
                </div>
            </div>
            <div style={{ flex:'1' }}>
                <div className='search'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input placeholder='Search'/>
                </div>
            </div>
            <div className='right-container' style={{flexShrink:'0'}}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    [worker placeholder]
                </div>
                <button onClick={onLogOut}>Sign Out</button>
            </div>
        </div>
    )
}