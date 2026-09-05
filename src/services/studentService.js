import { supabase } from "../config/supabase";


export const getStudents = async () => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw error;
  return data;
};

export const createStudent = async (student) => {
  const { data, error } = await supabase
    .from('students')
    .insert([student])
    .select();

  if (error) throw error;
  return data;
};