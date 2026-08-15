
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Students from '../pages/Students';
import Courses from '../pages/Courses';
import Enrollments from '../pages/Enrollments';
import { supabase } from "../config/supabase";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/enrollments" element={<Enrollments />} />
    </Routes>
  );
}

