import { supabase } from "../config/supabase";

export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createCourse = async (course) => {
  const { data, error } = await supabase
    .from("courses")
    .insert([course])
    .select();

  if (error) throw error;
  return data;
};

export const updateCourse = async (courseid, updates) => {
  const { data, error } = await supabase
    .from("courses")
    .update(updates)
    .eq("courseid", courseid)
    .select();

  if (error) throw error;
  return data;
};

export const deleteCourse = async (courseid) => {
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("courseid", courseid);

  if (error) throw error;
  return true;
};
