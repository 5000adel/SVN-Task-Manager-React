import './styles/AccountSettings.css'
import { useApp } from '../../context/AppContext'

export default function AccountSettings() {
    const { currentUser } = useApp();

    const fullName = currentUser
        ? `${currentUser.first_name} ${currentUser.last_name}`
        : '';
    const initial = currentUser?.first_name?.charAt(0) ?? '?';

    return (
        <div className='account-settings-container'>
            <div className='as-header'>
                <div className='as-title'>Account Settings</div>
                <div className='as-subtitle'>Manage your account information</div>
            </div>

            <div className='as-avatar-row'>
                <div className='as-avatar'>{initial}</div>
                <div className='as-avatar-info'>
                    <div className='as-name'>{fullName}</div>
                    <div className='as-role-badge'>{currentUser?.role}</div>
                </div>
            </div>

            <div className='as-divider' />

            <div className='as-section'>
                <div className='as-section-title'>Personal Information</div>
                <div className='as-field'>
                    <label className='as-label'>First Name</label>
                    <input className='as-input' defaultValue={currentUser?.first_name} placeholder='First Name' />
                </div>
                <div className='as-field'>
                    <label className='as-label'>Last Name</label>
                    <input className='as-input' defaultValue={currentUser?.last_name} placeholder='Last Name' />
                </div>
                <div className='as-field'>
                    <label className='as-label'>Username</label>
                    <input className='as-input' defaultValue={currentUser?.username} placeholder='Username' />
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
    );
}