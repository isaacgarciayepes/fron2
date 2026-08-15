import { supabase } from "../config/supabase";


export const getStudents = async () => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw error;
  return data;
};