import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import './styles/ManageAccounts.css';

const roleColor = {
    admin:      { background: '#f8cfcc54', color: '#f8a4a4' },
    supervisor: { background: '#f8eacc54', color: '#e0cb84' },
    employee:   { background: '#a78bfa54', color: '#a78bfa' },
};

const emptyForm = {
    first_name: '', last_name: '', username: '',
    password_hash: '', role: 'employee',
    availability_status: true, experience_years: 0,
};

export default function ManageAccounts() {
    const { users, loading } = useApp();
    const { showToast } = useToast();

    const [search, setSearch]           = useState('');
    const [roleFilter, setRoleFilter]   = useState('All');
    const [showCreate, setShowCreate]   = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form, setForm]               = useState(emptyForm);

    const roleFilters = ['All', 'Admin', 'Supervisor', 'Employee'];

    const filtered = users.filter(u => {
        const matchRole   = roleFilter === 'All' || u.role === roleFilter.toLowerCase();
        const matchSearch = search === '' ||
            `${u.first_name} ${u.last_name} ${u.username}`.toLowerCase().includes(search.toLowerCase());
        return matchRole && matchSearch;
    });

    function openCreate() {
        setForm(emptyForm);
        setEditingUser(null);
        setShowCreate(true);
    }

    function openEdit(user) {
        setForm({
            first_name:          user.first_name,
            last_name:           user.last_name,
            username:            user.username,
            password_hash:       '',
            role:                user.role,
            availability_status: user.availability_status,
            experience_years:    user.experience_years,
        });
        setEditingUser(user);
        setShowCreate(true);
    }

    function handleSave() {
        if (!form.first_name || !form.last_name || !form.username) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        if (editingUser) {
            // TODO: replace with updateUser(editingUser.user_id, form)
            console.log('[stub] updateUser:', editingUser.user_id, form);
            showToast(`${form.first_name} ${form.last_name} updated`);
        } else {
            // TODO: replace with createUser(form)
            console.log('[stub] createUser:', form);
            showToast(`${form.first_name} ${form.last_name} created`);
        }
        setShowCreate(false);
        setEditingUser(null);
    }

    function handleDelete(user) {
        // TODO: replace with deleteUser(user.user_id)
        console.log('[stub] deleteUser:', user.user_id);
        showToast(`${user.first_name} ${user.last_name} deleted`, 'error');
    }

    return (
        <div className='manage-accounts-container'>

            {/* Header */}
            <div className='ma-header'>
                <div className='ma-title'>Manage Accounts</div>
                <button className='ma-add-btn' onClick={openCreate}>+ New User</button>
            </div>

            {/* Search + Filter */}
            <div className='ma-toolbar'>
                <input
                    className='ma-search'
                    placeholder='Search by name or username...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className='ma-role-filters'>
                    {roleFilters.map(f => (
                        <button
                            key={f}
                            className={`ma-filter-btn ${roleFilter === f ? 'active' : ''}`}
                            onClick={() => setRoleFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className='ma-table'>
                <div className='ma-table-header'>
                    <span>Name</span>
                    <span>Username</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Experience</span>
                    <span></span>
                </div>

                {loading ? (
                    <div className='ma-empty'>Loading users...</div>
                ) : filtered.length === 0 ? (
                    <div className='ma-empty'>No users found</div>
                ) : (
                    filtered.map(user => (
                        <div className='ma-table-row' key={user.user_id}>
                            <div className='ma-user-info'>
                                <div className='ma-avatar'>
                                    {user.first_name.charAt(0)}
                                </div>
                                <div>
                                    <div className='ma-name'>
                                        {user.first_name} {user.last_name}
                                    </div>
                                </div>
                            </div>
                            <span className='ma-username'>@{user.username}</span>
                            <span className='ma-role-badge' style={roleColor[user.role]}>
                                {user.role}
                            </span>
                            <span className='ma-status-badge' style={{
                                background: user.availability_status ? '#85cc8554' : '#f8cfcc54'
                            }}>
                                {user.availability_status ? 'Active' : 'Inactive'}
                            </span>
                            <span className='ma-exp'>{user.experience_years}y</span>
                            <div className='ma-actions'>
                                <button onClick={() => openEdit(user)}>Edit</button>
                                <button
                                    className='ma-delete-btn'
                                    onClick={() => handleDelete(user)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create / Edit Modal */}
            {showCreate && (
                <div className='ma-modal-overlay' onClick={() => setShowCreate(false)}>
                    <div className='ma-modal' onClick={e => e.stopPropagation()}>

                        <div className='ma-modal-header'>
                            <div className='ma-modal-title'>
                                {editingUser ? 'Edit User' : 'Create New User'}
                            </div>
                            <button className='ma-modal-close' onClick={() => setShowCreate(false)}>✕</button>
                        </div>

                        <div className='ma-modal-body'>
                            <div className='ma-form-row'>
                                <div className='ma-form-field'>
                                    <label className='ma-form-label'>First Name *</label>
                                    <input className='ma-form-input'
                                        value={form.first_name}
                                        onChange={e => setForm({ ...form, first_name: e.target.value })}
                                        placeholder='First name'
                                    />
                                </div>
                                <div className='ma-form-field'>
                                    <label className='ma-form-label'>Last Name *</label>
                                    <input className='ma-form-input'
                                        value={form.last_name}
                                        onChange={e => setForm({ ...form, last_name: e.target.value })}
                                        placeholder='Last name'
                                    />
                                </div>
                            </div>
                            <div className='ma-form-field'>
                                <label className='ma-form-label'>Username *</label>
                                <input className='ma-form-input'
                                    value={form.username}
                                    onChange={e => setForm({ ...form, username: e.target.value })}
                                    placeholder='Username'
                                />
                            </div>
                            <div className='ma-form-field'>
                                <label className='ma-form-label'>
                                    {editingUser ? 'New Password (leave blank to keep)' : 'Password *'}
                                </label>
                                <input className='ma-form-input' type='password'
                                    value={form.password_hash}
                                    onChange={e => setForm({ ...form, password_hash: e.target.value })}
                                    placeholder='Password'
                                />
                            </div>
                            <div className='ma-form-row'>
                                <div className='ma-form-field'>
                                    <label className='ma-form-label'>Role</label>
                                    <select className='ma-form-input ma-form-select'
                                        value={form.role}
                                        onChange={e => setForm({ ...form, role: e.target.value })}
                                    >
                                        <option value='employee'>Employee</option>
                                        <option value='supervisor'>Supervisor</option>
                                        <option value='admin'>Admin</option>
                                    </select>
                                </div>
                                <div className='ma-form-field'>
                                    <label className='ma-form-label'>Experience (years)</label>
                                    <input className='ma-form-input' type='number' min='0'
                                        value={form.experience_years}
                                        onChange={e => setForm({ ...form, experience_years: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='ma-form-field'>
                                <label className='ma-form-label'>Availability</label>
                                <select className='ma-form-input ma-form-select'
                                    value={form.availability_status ? 'true' : 'false'}
                                    onChange={e => setForm({ ...form, availability_status: e.target.value === 'true' })}
                                >
                                    <option value='true'>Available</option>
                                    <option value='false'>Unavailable</option>
                                </select>
                            </div>
                        </div>

                        <div className='ma-modal-actions'>
                            <button className='ma-cancel-btn' onClick={() => setShowCreate(false)}>Cancel</button>
                            <button className='ma-save-btn' onClick={handleSave}>
                                {editingUser ? 'Save Changes' : 'Create User'}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}