import './styles/ViewEmployees.css'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import ViewCard from './ViewCard'
import EditModal from './EditModal'
import { useState } from 'react'

const statusColor = {
    'In Progress': '#cfccf854',
    'Overdue':     '#f8cfcc54',
    'To Do':       '#41405054',
    'Completed':   '#85cc8554',
}

export default function ViewEmployees({ searchQuery = '' }) {
    const {
        currentUser, employees, skills, projects, tasks, taskAssignments,
        getTasksForEmployee, getSkillsForEmployee, getSkillsForTask, loading,
    } = useApp();
    const { showToast } = useToast();

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editingEmployee, setEditingEmployee]   = useState(null);
    const [skillFilter, setSkillFilter]           = useState('all');

    // Assign task modal state
    const [showAssignModal, setShowAssignModal]   = useState(false);
    const [assignProject, setAssignProject]       = useState(null);
    const [assignEmployee, setAssignEmployee]     = useState(null);
    const [assignTaskId, setAssignTaskId]         = useState('');
    const [empSearch, setEmpSearch]               = useState('');

    const filteredEmployees = employees
        .filter(emp => {
            if (skillFilter === 'all') return true;
            const empSkillIds = getSkillsForEmployee(emp.user_id).map(s => s.skill_id);
            return empSkillIds.includes(Number(skillFilter));
        })
        .filter(emp => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
                emp.first_name.toLowerCase().includes(q) ||
                emp.last_name.toLowerCase().includes(q) ||
                `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(q) ||
                emp.username.toLowerCase().includes(q) ||
                emp.role.toLowerCase().includes(q)
            );
        });

    // Unassigned tasks for the selected project
    const assignedTaskIds = taskAssignments.map(a => a.task_id);
    const unassignedTasks = assignProject
        ? tasks.filter(t =>
            t.project_id === assignProject &&
            !assignedTaskIds.includes(t.task_id)
          )
        : [];

    // Employee search results inside modal
    const modalEmployees = employees.filter(emp =>
        empSearch === '' ||
        `${emp.first_name} ${emp.last_name} ${emp.username}`
            .toLowerCase().includes(empSearch.toLowerCase())
    );

    function closeAssignModal() {
        setShowAssignModal(false);
        setAssignProject(null);
        setAssignEmployee(null);
        setAssignTaskId('');
        setEmpSearch('');
    }

    function handleAssign() {
        if (!assignEmployee) { showToast('Please select an employee', 'error'); return; }
        if (!assignTaskId)   { showToast('Please select a task', 'error'); return; }

        const emp  = employees.find(e => e.user_id === assignEmployee);
        const task = tasks.find(t => t.task_id === assignTaskId);

        // TODO: replace with assignTask({ task_id: assignTaskId, employee_user_id: assignEmployee, assigned_by: currentUser.user_id })
        console.log('[stub] assignTask:', {
            task_id:          assignTaskId,
            employee_user_id: assignEmployee,
            assigned_by:      currentUser?.user_id,
        });

        showToast(`"${task?.task_name}" assigned to ${emp?.first_name} ${emp?.last_name}`);
        closeAssignModal();
    }


    return (
        <div className='view-employees-container'>

            {/* Header */}
            <div className='ve-header'>
                <div className='ve-title'>
                    Employees
                    {searchQuery && (
                        <span style={{ fontSize: '13px', fontWeight: '400', color: 'rgba(255,255,255,0.4)', marginLeft: '10px', fontFamily: '"DM Sans",sans-serif' }}>
                            "{searchQuery}"
                        </span>
                    )}
                </div>
                <button className='ve-add-btn' onClick={() => setShowAssignModal(true)}>
                    + Assign Task
                </button>
            </div>

            {/* Skill filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '12px', fontWeight: '700',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.35)',
                }}>
                    Filter by Skill
                </span>
                <select
                    value={skillFilter}
                    onChange={e => setSkillFilter(e.target.value)}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '7px 32px 7px 12px',
                        color: skillFilter !== 'all' ? '#a78bfa' : 'rgba(255,255,255,0.6)',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '13px',
                        outline: 'none', cursor: 'pointer', appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                    }}
                >
                    <option value="all">All Skills</option>
                    {skills.map(skill => (
                        <option key={skill.skill_id} value={skill.skill_id}>
                            {skill.skill_name}
                        </option>
                    ))}
                </select>
                {skillFilter !== 'all' && (
                    <button onClick={() => setSkillFilter('all')} style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px', padding: '5px 10px',
                        cursor: 'pointer', height: 'unset',
                    }}>
                        Clear
                    </button>
                )}
            </div>

            {/* Employee list */}
            <div className='ve-list'>
                {loading ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        Loading employees...
                    </div>
                ) : filteredEmployees.length === 0 ? (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px' }}>
                        No employees found
                    </div>
                ) : (
                    filteredEmployees.map(emp => {
                        const empTasks   = getTasksForEmployee(emp.user_id);
                        const empSkills  = getSkillsForEmployee(emp.user_id);
                        const activeTasks = empTasks.filter(
                            t => t.task_status === 'In Progress' || t.task_status === 'To Do'
                        ).length;

                        return (
                            <div className='ve-card' key={emp.user_id}
                                onClick={() => setSelectedEmployee(emp)}>
                                <div className='ve-avatar'>{emp.first_name.charAt(0)}</div>
                                <div className='ve-info'>
                                    <div className='ve-name'>{emp.first_name} {emp.last_name}</div>
                                    <div className='ve-role'>{emp.role} · {emp.experience_years}y exp</div>
                                    {empSkills.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                            {empSkills.map(skill => (
                                                <span key={skill.skill_id} style={{
                                                    padding: '2px 8px', borderRadius: '10px',
                                                    fontSize: '10px', fontWeight: '700',
                                                    fontFamily: '"DM Sans", sans-serif',
                                                    textTransform: 'uppercase',
                                                    background: skill.skill_id === Number(skillFilter) ? '#a78bfa54' : 'rgba(255,255,255,0.06)',
                                                    border: `1px solid ${skill.skill_id === Number(skillFilter) ? '#a78bfa80' : 'rgba(255,255,255,0.1)'}`,
                                                    color: skill.skill_id === Number(skillFilter) ? '#a78bfa' : 'rgba(255,255,255,0.4)',
                                                }}>
                                                    {skill.skill_name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className='ve-meta'>
                                    <div className='ve-tasks'>{activeTasks} active tasks</div>
                                    <div className='ve-joined'>
                                        {emp.availability_status ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>
                                <div className='ve-status-badge' style={{
                                    background: emp.availability_status ? '#85cc8554' : '#f8cfcc54'
                                }}>
                                    {emp.availability_status ? 'Active' : 'Inactive'}
                                </div>
                                <div className='ve-actions' onClick={e => e.stopPropagation()}>
                                    <button onClick={() => setSelectedEmployee(emp)}>View</button>
                                    <button onClick={() => setEditingEmployee(emp)}>Edit</button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Employee ViewCard */}
            {selectedEmployee && (
                <ViewCard
                    onClose={() => setSelectedEmployee(null)}
                    cardType="employee"
                    data={{
                        employee: selectedEmployee,
                        employeeTasks: getTasksForEmployee(selectedEmployee.user_id),
                    }}
                />
            )}

            {/* Edit Employee Modal */}
            {editingEmployee && (
                <EditModal
                    onClose={() => setEditingEmployee(null)}
                    cardType="employee"
                    data={{
                        employee: editingEmployee,
                        employeeTasks: getTasksForEmployee(editingEmployee.user_id),
                    }}
                />
            )}

            {/* ── Assign Task Modal ───────────────────────────────────────── */}
            {showAssignModal && (
                <div className='ve-modal-overlay' onClick={closeAssignModal}>
                    <div className='ve-modal' onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className='ve-modal-header'>
                            <div>
                                <div className='ve-modal-title'>Assign Task</div>
                                <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                                    Select a project, then pick an employee and task
                                </div>
                            </div>
                            <button className='ve-modal-close' onClick={closeAssignModal}>✕</button>
                        </div>

                        {/* Step 1 — Project selector */}
                        <div>
                            <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
                                1. Select Project
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {projects.map(p => (
                                    <div
                                        key={p.project_id}
                                        onClick={() => { setAssignProject(p.project_id); setAssignEmployee(null); setAssignTaskId(''); }}
                                        style={{
                                            padding: '6px 16px', borderRadius: '20px', cursor: 'pointer',
                                            fontFamily: '"DM Sans",sans-serif', fontSize: '13px',
                                            transition: 'all 0.2s',
                                            background: assignProject === p.project_id ? '#a78bfa54' : 'transparent',
                                            border: `1px solid ${assignProject === p.project_id ? '#a78bfa' : 'rgba(255,255,255,0.15)'}`,
                                            color: assignProject === p.project_id ? 'white' : 'rgba(255,255,255,0.5)',
                                        }}
                                    >
                                        {p.project_name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 2 — Employee list */}
                        {assignProject && (
                            <div>
                                <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
                                    2. Select Employee
                                </div>
                                <input
                                    className='ve-form-input'
                                    placeholder='Search employees...'
                                    value={empSearch}
                                    onChange={e => setEmpSearch(e.target.value)}
                                    style={{ marginBottom: '8px' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#a78bfa #f1f1f100' }}>
                                    {modalEmployees.map(emp => {
                                        const isSelected = assignEmployee === emp.user_id;
                                        const empSkills  = getSkillsForEmployee(emp.user_id);
                                        const empTasks   = getTasksForEmployee(emp.user_id);
                                        const activeTasks = empTasks.filter(t => t.task_status === 'In Progress' || t.task_status === 'To Do').length;

                                        return (
                                            <div
                                                key={emp.user_id}
                                                onClick={() => { setAssignEmployee(emp.user_id); setAssignTaskId(''); }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '10px',
                                                    padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
                                                    background: isSelected ? '#a78bfa18' : 'rgba(255,255,255,0.03)',
                                                    border: `1px solid ${isSelected ? '#a78bfa60' : 'rgba(255,255,255,0.07)'}`,
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                {/* Checkbox */}
                                                <div style={{
                                                    width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                                                    border: `2px solid ${isSelected ? '#a78bfa' : 'rgba(255,255,255,0.2)'}`,
                                                    background: isSelected ? '#a78bfa' : 'transparent',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '10px', color: 'white', fontWeight: '900',
                                                }}>
                                                    {isSelected && '✓'}
                                                </div>
                                                {/* Avatar */}
                                                <div style={{
                                                    width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                                                    background: isSelected ? '#a78bfa54' : 'rgba(255,255,255,0.08)',
                                                    border: `1px solid ${isSelected ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontFamily: '"Syne",sans-serif', fontWeight: '800', fontSize: '14px',
                                                    color: isSelected ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                                                }}>
                                                    {emp.first_name.charAt(0)}
                                                </div>
                                                {/* Info */}
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontFamily: '"Syne",sans-serif', fontWeight: '700', fontSize: '13px', color: isSelected ? 'white' : '#ffffffc4' }}>
                                                        {emp.first_name} {emp.last_name}
                                                    </div>
                                                    <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                                                        {activeTasks} active task{activeTasks !== 1 ? 's' : ''}
                                                        {empSkills.length > 0 && ` · ${empSkills.map(s => s.skill_name).join(', ')}`}
                                                    </div>
                                                </div>
                                                <span style={{
                                                    padding: '2px 8px', borderRadius: '10px', fontSize: '10px',
                                                    fontWeight: '900', fontFamily: '"DM Sans",sans-serif', textTransform: 'uppercase',
                                                    background: emp.availability_status ? '#85cc8554' : '#f8cfcc54',
                                                }}>
                                                    {emp.availability_status ? 'Available' : 'Unavailable'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 3 — Task selector */}
                        {assignEmployee && (
                            <div>
                                <div style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
                                    3. Select Task
                                    <span style={{ marginLeft: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'none', fontWeight: '400', letterSpacing: 0 }}>
                                        — unassigned tasks from selected project
                                    </span>
                                </div>
                                {unassignedTasks.length === 0 ? (
                                    <div style={{ padding: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans",sans-serif', fontSize: '13px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                                        No unassigned tasks in this project
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {unassignedTasks.map(task => {
                                            const isSelected = assignTaskId === task.task_id;
                                            const taskSkills = getSkillsForTask(task.task_id);
                                            return (
                                                <div
                                                    key={task.task_id}
                                                    onClick={() => setAssignTaskId(task.task_id)}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: '10px',
                                                        padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
                                                        background: isSelected ? '#a78bfa18' : 'rgba(255,255,255,0.03)',
                                                        border: `1px solid ${isSelected ? '#a78bfa60' : 'rgba(255,255,255,0.07)'}`,
                                                        transition: 'all 0.15s',
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                                                        border: `2px solid ${isSelected ? '#a78bfa' : 'rgba(255,255,255,0.2)'}`,
                                                        background: isSelected ? '#a78bfa' : 'transparent',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '10px', color: 'white', fontWeight: '900',
                                                    }}>
                                                        {isSelected && '✓'}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontFamily: '"Syne",sans-serif', fontWeight: '700', fontSize: '13px', color: isSelected ? 'white' : '#ffffffc4' }}>
                                                            {task.task_name}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                                                            {taskSkills.map(s => (
                                                                <span key={s.skill_id} style={{
                                                                    padding: '1px 6px', borderRadius: '8px', fontSize: '9px',
                                                                    fontWeight: '700', fontFamily: '"DM Sans",sans-serif', textTransform: 'uppercase',
                                                                    background: '#a78bfa20', border: '1px solid #a78bfa40', color: '#a78bfa',
                                                                }}>
                                                                    {s.skill_name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span style={{
                                                        padding: '3px 10px', borderRadius: '12px', fontSize: '11px',
                                                        fontWeight: '900', textTransform: 'uppercase', fontFamily: '"DM Sans",sans-serif',
                                                        background: statusColor[task.task_status] ?? '#cfccf854',
                                                        whiteSpace: 'nowrap',
                                                    }}>
                                                        {task.task_status}
                                                    </span>
                                                    <span style={{ fontFamily: '"DM Sans",sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>
                                                        Due {task.target_date}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className='ve-modal-actions'>
                            <button className='ve-cancel-btn' onClick={closeAssignModal}>Cancel</button>
                            <button
                                className='ve-save-btn'
                                onClick={handleAssign}
                                disabled={!assignEmployee || !assignTaskId}
                                style={{ opacity: (!assignEmployee || !assignTaskId) ? 0.5 : 1 }}
                            >
                                Assign Task
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
