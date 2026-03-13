// mock data — matches tbl_skill, tbl_employee_skill, tbl_skill_requirement in ERD
// replace with Supabase query when backend is ready

export const skills = [
    { skill_id: 1, skill_name: "Roofing",     description: "Roof repair and installation" },
    { skill_id: 2, skill_name: "Plumbing",    description: "Pipe installation and repair" },
    { skill_id: 3, skill_name: "Electrical",  description: "Wiring and electrical systems" },
    { skill_id: 4, skill_name: "Painting",    description: "Surface preparation and painting" },
    { skill_id: 5, skill_name: "Inspection",  description: "Structural and safety inspection" },
];

export const employeeSkills = [
    { employee_skill_id: 1, user_id: "u-001", skill_id: 1 },
    { employee_skill_id: 2, user_id: "u-001", skill_id: 4 },
    { employee_skill_id: 3, user_id: "u-001", skill_id: 5 },
    { employee_skill_id: 4, user_id: "u-003", skill_id: 2 },
    { employee_skill_id: 5, user_id: "u-003", skill_id: 3 },
];

export const skillRequirements = [
    { skill_requirement_id: 1, task_id: "t-001", skill_id: 1 },
    { skill_requirement_id: 2, task_id: "t-002", skill_id: 2 },
    { skill_requirement_id: 3, task_id: "t-003", skill_id: 4 },
    { skill_requirement_id: 4, task_id: "t-004", skill_id: 3 },
    { skill_requirement_id: 5, task_id: "t-005", skill_id: 5 },
];
