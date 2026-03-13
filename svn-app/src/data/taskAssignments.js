// mock data — matches tbl_task_assignment in ERD
// replace with Supabase query when backend is ready

export const taskAssignments = [
    {
        assignment_id: "a-001",
        task_id: "t-001",
        employee_user_id: "u-001",
        assigned_by: "u-002",
        assigned_time: "2026-02-01T09:00:00Z",
        assignment_status: "Active",
    },
    {
        assignment_id: "a-002",
        task_id: "t-002",
        employee_user_id: "u-003",
        assigned_by: "u-002",
        assigned_time: "2026-02-15T10:00:00Z",
        assignment_status: "Active",
    },
    {
        assignment_id: "a-003",
        task_id: "t-003",
        employee_user_id: "u-001",
        assigned_by: "u-002",
        assigned_time: "2026-02-01T11:00:00Z",
        assignment_status: "Active",
    },
    {
        assignment_id: "a-004",
        task_id: "t-004",
        employee_user_id: "u-001",
        assigned_by: "u-002",
        assigned_time: "2026-02-20T11:00:00Z",
        assignment_status: "Completed",
    },
];
