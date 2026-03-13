// mock data — matches tbl_project_progress in ERD
// replace with Supabase query when backend is ready

export const projectProgress = [
    {
        progress_id: 1,
        project_id: "p-001",
        progress_percentage: 60,
        last_updated: "2026-03-10T08:00:00Z",
        remarks: "On track, roof section B in progress",
    },
    {
        progress_id: 2,
        project_id: "p-002",
        progress_percentage: 30,
        last_updated: "2026-03-10T09:00:00Z",
        remarks: "Delayed due to missing materials",
    },
    {
        progress_id: 3,
        project_id: "p-003",
        progress_percentage: 10,
        last_updated: "2026-03-01T10:00:00Z",
        remarks: "On hold pending safety inspection",
    },
];
