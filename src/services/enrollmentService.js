import { supabase } from "../config/supabase";

export const getEnrollments = async () => {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createEnrollment = async (enrollment) => {
  const { data, error } = await supabase
    .from("enrollments")
    .insert([enrollment])
    .select();

  if (error) throw error;
  return data;
};

export const updateEnrollment = async (enrollmentid, updates) => {
  const { data, error } = await supabase
    .from("enrollments")
    .update(updates)
    .eq("enrollmentid", enrollmentid)
    .select();

  if (error) throw error;
  return data;
};

export const deleteEnrollment = async (enrollmentid) => {
  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("enrollmentid", enrollmentid);

  if (error) throw error;
  return true;
};
