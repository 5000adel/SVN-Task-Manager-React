// mock data — matches tbl_task in ERD
// replace with Supabase query when backend is ready

export const tasks = [
    {
        task_id: "t-001",
        task_name: "Fix roof — Section B",
        task_description: "Repair damaged roofing tiles on Section B of Block A.",
        project_id: "p-001",
        task_status: "In Progress",
        target_date: "2026-03-15",
        created_at: "2026-02-01T08:00:00Z",
    },
    {
        task_id: "t-002",
        task_name: "Install pipes — Unit 4",
        task_description: "Install main water supply pipes for Unit 4.",
        project_id: "p-002",
        task_status: "Overdue",
        target_date: "2026-03-10",
        created_at: "2026-02-15T09:00:00Z",
    },
    {
        task_id: "t-003",
        task_name: "Paint walls — Block A",
        task_description: "Apply weatherproof paint to all exterior walls of Block A.",
        project_id: "p-001",
        task_status: "To Do",
        target_date: "2026-03-20",
        created_at: "2026-02-01T10:00:00Z",
    },
    {
        task_id: "t-004",
        task_name: "Electrical wiring check",
        task_description: "Inspect all wiring for safety compliance in Block C.",
        project_id: "p-003",
        task_status: "Completed",
        target_date: "2026-03-08",
        created_at: "2026-02-20T11:00:00Z",
    },
    {
        task_id: "t-005",
        task_name: "Foundation inspection",
        task_description: "Inspect and document foundation integrity for Block A.",
        project_id: "p-001",
        task_status: "To Do",
        target_date: "2026-03-25",
        created_at: "2026-02-01T12:00:00Z",
    },
];
