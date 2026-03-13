// mock data — matches tbl_logs in ERD
// replace with Supabase query when backend is ready

export const logs = [
    {
        log_id: 1,
        action: "Task completed",
        entity_type: "task",
        entity_id: "t-004",
        user_id: "u-001",
        timestamp: "2026-03-08T14:00:00Z",
    },
    {
        log_id: 2,
        action: "Account created",
        entity_type: "account",
        entity_id: "u-003",
        user_id: "u-004",
        timestamp: "2026-02-20T09:00:00Z",
    },
    {
        log_id: 3,
        action: "Project updated",
        entity_type: "project",
        entity_id: "p-003",
        user_id: "u-002",
        timestamp: "2026-03-01T10:00:00Z",
    },
    {
        log_id: 4,
        action: "Task overdue",
        entity_type: "task",
        entity_id: "t-002",
        user_id: "u-004",
        timestamp: "2026-03-10T08:00:00Z",
    },
    {
        log_id: 5,
        action: "Password changed",
        entity_type: "account",
        entity_id: "u-002",
        user_id: "u-002",
        timestamp: "2026-03-11T13:00:00Z",
    },
];
