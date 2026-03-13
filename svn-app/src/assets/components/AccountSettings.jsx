import './styles/AccountSettings.css'

export default function AccountSettings({ role }) {
    return (
        <div className='account-settings-container'>
            <div className='as-header'>
                <div className='as-title'>Account Settings</div>
                <div className='as-subtitle'>Manage your account information</div>
            </div>

            <div className='as-avatar-row'>
                <div className='as-avatar'>A</div>
                <div className='as-avatar-info'>
                    <div className='as-name'>[Full Name]</div>
                    <div className='as-role-badge'>{role}</div>
                </div>
            </div>

            <div className='as-divider' />

            <div className='as-section'>
                <div className='as-section-title'>Personal Information</div>
                <div className='as-field'>
                    <label className='as-label'>Full Name</label>
                    <input className='as-input' placeholder='Full Name' />
                </div>
                <div className='as-field'>
                    <label className='as-label'>Username</label>
                    <input className='as-input' placeholder='Username' />
                </div>
                <div className='as-field'>
                    <label className='as-label'>Email</label>
                    <input className='as-input' placeholder='Email' type='email' />
                </div>
            </div>

            <div className='as-divider' />

            <div className='as-section'>
                <div className='as-section-title'>Change Password</div>
                <div className='as-field'>
                    <label className='as-label'>Current Password</label>
                    <input className='as-input' placeholder='Current Password' type='password' />
                </div>
                <div className='as-field'>
                    <label className='as-label'>New Password</label>
                    <input className='as-input' placeholder='New Password' type='password' />
                </div>
                <div className='as-field'>
                    <label className='as-label'>Confirm Password</label>
                    <input className='as-input' placeholder='Confirm Password' type='password' />
                </div>
            </div>

            <div className='as-divider' />

            <div className='as-actions'>
                <button className='as-btn-secondary'>Cancel</button>
                <button className='as-btn-primary'>Save Changes</button>
            </div>
        </div>
    )
}