import '../styles/Auth.css'
import Blur from '../components/Blur'

export default function Auth({onLogIn}) {
    return (
        <Blur>
            <div className='parent-container'>
                <div className='container'>
                    <div className='header'>
                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={32} height={32}>
                                <path d="M384 328L384 128C384 110.3 369.7 96 352 96L288 96C270.3 96 256 110.3 256 128L256 328C256 341.3 245.3 352 232 352C218.7 352 208 341.3 208 328L208 142.1C122 173.8 64 255.8 64 352L64 416L576 416L576 352C575 256.8 517.6 174.3 432 142.2L432 328C432 341.3 421.3 352 408 352C394.7 352 384 341.3 384 328zM72 464C49.9 464 32 481.9 32 504C32 526.1 49.9 544 72 544L568 544C590.1 544 608 526.1 608 504C608 481.9 590.1 464 568 464L72 464z" />
                            </svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop:'auto', marginBottom:'auto'}}>
                            <div style={{ color: '#ffffffc4', fontSize: '20px', textAlign:'left' }}>SVN</div>
                            <div style={{ color: '#ffffffc4', fontSize: '15px' }}>Construction</div>
                        </div>
                    </div>

                    <div className='container-box cb-1'>
                        <div className='h1' style={{paddingLeft:'5px'}}>Enter Username</div>
                        <input placeholder='Username' className='auth-input' />
                        <div className='h1' style={{paddingLeft:'5px'}}>Enter Password</div>
                        <input placeholder='Password' type='password' className='auth-input' />
                    </div>

                    <div className='container-box cb-2'>
                        <button style={{ marginLeft: 'auto' }} onClick={onLogIn} >Log In</button>
                    </div>
                </div>
            </div>
        </Blur>
    )
}