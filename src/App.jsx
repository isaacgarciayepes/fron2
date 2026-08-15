import { BrowserRouter } from  'react-router-dom';

import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
