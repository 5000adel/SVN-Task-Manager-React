// mock data — matches tbl_users in ERD
// replace with Supabase query when backend is ready

export const users = [
    {
        user_id: "u-001",
        last_name: "Santos",
        first_name: "Vince",
        username: "vince",
        password_hash: "password",
        role: "employee",
        availability_status: true,
        experience_years: 3,
    },
    {
        user_id: "u-002",
        last_name: "Cruz",
        first_name: "Daniel",
        username: "daniel",
        password_hash: "password",
        role: "supervisor",
        availability_status: true,
        experience_years: 7,
    },
    {
        user_id: "u-003",
        last_name: "Reyes",
        first_name: "Maria",
        username: "maria",
        password_hash: "password",
        role: "employee",
        availability_status: false,
        experience_years: 2,
    },
    {
        user_id: "u-004",
        last_name: "Admin",
        first_name: "SVN",
        username: "admin",
        password_hash: "admin",
        role: "admin",
        availability_status: true,
        experience_years: 10,
    },
];
