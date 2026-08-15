
import { getStudents } from '../services/studentService';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';
 export default function Dashboard() {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen">
            <header>
                <Nav/>
                <header 
                title="Estudiantes"
                description="Gestion de estudiantes registrados"
                txtButton="Nuevo estudiante"
                
                />
            </header>
            <main className="flex-1 p-4">
                <h1 className="text-3xl font-bold">Students</h1>
            </main>
            <footer className="mt-4">
                <Footer />
            </footer>
        </div>
   
  );
  }