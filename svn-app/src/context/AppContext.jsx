// AppContext.jsx
// Global state — wraps the entire app so any component can access data
// without prop drilling. Uses service functions so swapping to real
// fetch() calls later requires no changes here.

import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, getUsersByRole } from '../services/userService';
import { getProjects, getAllProjectProgress } from '../services/projectService';
import { getTasks, getTaskAssignments } from '../services/taskService';
import { getLogs } from '../services/logService';

const AppContext = createContext(null);

export function AppProvider({ children, currentUser }) {
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [projects, setProjects] = useState([]);
    const [projectProgress, setProjectProgress] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only load data if a user is logged in
        if (!currentUser) return;
        loadAll();
    }, [currentUser]);

    async function loadAll() {
        setLoading(true);
        setError(null);
        try {
            const [u, emp, sup, p, pp, t, ta, l] = await Promise.all([
                getUsers(),
                getUsersByRole("employee"),
                getUsersByRole("supervisor"),
                getProjects(),
                getAllProjectProgress(),
                getTasks(),
                getTaskAssignments(),
                getLogs(),
            ]);
            setUsers(u);
            setEmployees(emp);
            setSupervisors(sup);
            setProjects(p);
            setProjectProgress(pp);
            setTasks(t);
            setTaskAssignments(ta);
            setLogs(l);
        } catch (err) {
            console.error("Failed to load app data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Helper — get progress for a specific project
    function getProgressForProject(project_id) {
        return projectProgress.find(p => p.project_id === project_id) ?? null;
    }

    // Helper — get tasks for a specific project
    function getTasksForProject(project_id) {
        return tasks.filter(t => t.project_id === project_id);
    }

    // Helper — get tasks assigned to a specific employee
    function getTasksForEmployee(user_id) {
        return taskAssignments
            .filter(a => a.employee_user_id === user_id)
            .map(a => tasks.find(t => t.task_id === a.task_id))
            .filter(Boolean);
    }

    // Helper — get assignments for a specific task
    function getAssignmentsForTask(task_id) {
        return taskAssignments.filter(a => a.task_id === task_id);
    }

    // Helper — get user by id
    function getUserById(user_id) {
        return users.find(u => u.user_id === user_id) ?? null;
    }

    return (
        <AppContext.Provider value={{
            // Auth
            currentUser,

            // Data
            users,          setUsers,
            employees,      setEmployees,
            supervisors,    setSupervisors,
            projects,       setProjects,
            projectProgress,setProjectProgress,
            tasks,          setTasks,
            taskAssignments,setTaskAssignments,
            logs,           setLogs,

            // State
            loading,
            error,
            refresh: loadAll,

            // Helpers
            getProgressForProject,
            getTasksForProject,
            getTasksForEmployee,
            getAssignmentsForTask,
            getUserById,
        }}>
            {children}
        </AppContext.Provider>
    );
}

// Hook — use this in any component to access global state
// e.g. const { tasks, currentUser, projects } = useApp();
export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used inside <AppProvider>");
    return context;
}
