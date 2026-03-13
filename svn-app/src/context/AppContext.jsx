// AppContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, getUsersByRole } from '../services/userService';
import { getProjects, getAllProjectProgress } from '../services/projectService';
import { getTasks, getTaskAssignments } from '../services/taskService';
import { getLogs } from '../services/logService';
import { getSkills, getEmployeeSkills, getSkillRequirements } from '../services/skillService';

const AppContext = createContext(null);

export function AppProvider({ children, currentUser }) {
    const [users, setUsers]                     = useState([]);
    const [employees, setEmployees]             = useState([]);
    const [supervisors, setSupervisors]         = useState([]);
    const [projects, setProjects]               = useState([]);
    const [projectProgress, setProjectProgress] = useState([]);
    const [tasks, setTasks]                     = useState([]);
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [logs, setLogs]                       = useState([]);
    const [skills, setSkills]                   = useState([]);
    const [employeeSkills, setEmployeeSkills]   = useState([]);
    const [skillRequirements, setSkillRequirements] = useState([]);
    const [loading, setLoading]                 = useState(true);
    const [error, setError]                     = useState(null);

    useEffect(() => {
        if (!currentUser) return;
        loadAll();
    }, [currentUser]);

    async function loadAll() {
        setLoading(true);
        setError(null);
        try {
            const [u, emp, sup, p, pp, t, ta, l, sk, es, sr] = await Promise.all([
                getUsers(),
                getUsersByRole('employee'),
                getUsersByRole('supervisor'),
                getProjects(),
                getAllProjectProgress(),
                getTasks(),
                getTaskAssignments(),
                getLogs(),
                getSkills(),
                getEmployeeSkills(),
                getSkillRequirements(),
            ]);
            setUsers(u);
            setEmployees(emp);
            setSupervisors(sup);
            setProjects(p);
            setProjectProgress(pp);
            setTasks(t);
            setTaskAssignments(ta);
            setLogs(l);
            setSkills(sk);
            setEmployeeSkills(es);
            setSkillRequirements(sr);
        } catch (err) {
            console.error('Failed to load app data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    function getProgressForProject(project_id) {
        return projectProgress.find(p => p.project_id === project_id) ?? null;
    }

    function getTasksForProject(project_id) {
        return tasks.filter(t => t.project_id === project_id);
    }

    function getTasksForEmployee(user_id) {
        return taskAssignments
            .filter(a => a.employee_user_id === user_id)
            .map(a => tasks.find(t => t.task_id === a.task_id))
            .filter(Boolean);
    }

    function getAssignmentsForTask(task_id) {
        return taskAssignments.filter(a => a.task_id === task_id);
    }

    function getUserById(user_id) {
        return users.find(u => u.user_id === user_id) ?? null;
    }

    // Returns full skill objects for an employee
    function getSkillsForEmployee(user_id) {
        const skillIds = employeeSkills
            .filter(es => es.user_id === user_id)
            .map(es => es.skill_id);
        return skills.filter(s => skillIds.includes(s.skill_id));
    }

    // Returns full skill objects required by a task
    function getSkillsForTask(task_id) {
        const skillIds = skillRequirements
            .filter(sr => sr.task_id === task_id)
            .map(sr => sr.skill_id);
        return skills.filter(s => skillIds.includes(s.skill_id));
    }

    // Returns true if employee has ALL skills required by task
    function employeeMeetsTaskRequirements(user_id, task_id) {
        const required = getSkillsForTask(task_id).map(s => s.skill_id);
        if (required.length === 0) return true;
        const has = employeeSkills
            .filter(es => es.user_id === user_id)
            .map(es => es.skill_id);
        return required.every(id => has.includes(id));
    }

    // Returns employees who have ALL skills required by a task
    function getQualifiedEmployeesForTask(task_id) {
        return employees.filter(emp =>
            employeeMeetsTaskRequirements(emp.user_id, task_id)
        );
    }

    return (
        <AppContext.Provider value={{
            // Auth
            currentUser,

            // Data
            users,              setUsers,
            employees,          setEmployees,
            supervisors,        setSupervisors,
            projects,           setProjects,
            projectProgress,    setProjectProgress,
            tasks,              setTasks,
            taskAssignments,    setTaskAssignments,
            logs,               setLogs,
            skills,             setSkills,
            employeeSkills,     setEmployeeSkills,
            skillRequirements,  setSkillRequirements,

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
            getSkillsForEmployee,
            getSkillsForTask,
            employeeMeetsTaskRequirements,
            getQualifiedEmployeesForTask,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used inside <AppProvider>');
    return context;
}
