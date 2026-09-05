import { supabase } from "../config/supabase";

export const getDashboardStats = async () => {
  const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("enrollments").select("*", { count: "exact", head: true }),
  ]);

  if (studentsRes.error) throw studentsRes.error;
  if (coursesRes.error) throw coursesRes.error;
  if (enrollmentsRes.error) throw enrollmentsRes.error;

  return {
    students: studentsRes.count ?? 0,
    courses: coursesRes.count ?? 0,
    enrollments: enrollmentsRes.count ?? 0,
  };
};
