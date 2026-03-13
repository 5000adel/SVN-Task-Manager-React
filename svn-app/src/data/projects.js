// mock data — matches tbl_project in ERD
// replace with Supabase query when backend is ready

export const projects = [
    {
        project_id: "p-001",
        project_name: "Project Alpha",
        project_description: "Roof repair and structural reinforcement for Block A.",
        required_workers: 4,
        project_status: "Active",
        start_date: "2026-02-01",
        end_date: "2026-04-01",
        created_at: "2026-01-28T08:00:00Z",
    },
    {
        project_id: "p-002",
        project_name: "Project Beta",
        project_description: "Plumbing installation for Unit 4 residential block.",
        required_workers: 2,
        project_status: "Active",
        start_date: "2026-02-15",
        end_date: "2026-03-30",
        created_at: "2026-02-10T09:00:00Z",
    },
    {
        project_id: "p-003",
        project_name: "Project Gamma",
        project_description: "Electrical wiring inspection and upgrade for Block C.",
        required_workers: 3,
        project_status: "On Hold",
        start_date: "2026-03-01",
        end_date: "2026-05-01",
        created_at: "2026-02-20T10:00:00Z",
    },
];
