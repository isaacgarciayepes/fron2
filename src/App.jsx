import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/Sidevar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-8">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
