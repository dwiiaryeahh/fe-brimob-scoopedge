import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CampaignPage from './pages/CampaignPage';
import ReportPage from './pages/ReportPage';
import TargetPage from './pages/TargetPage';
import AboutPage from './pages/setting/AboutPage';
import SnifferPage from './pages/setting/SnifferPage';
import LogPage from './pages/setting/LogPage';
import DistancePage from './pages/setting/DistancePage';
import ChannelPage from './pages/setting/ChannelPage';

function Layout() {
  return (
    <div className="min-h-screen w-full min-w-full text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/target" replace />,
      },
      {
        path: "/target",
        element: <TargetPage />,
      },
      {
        path: "/campaign",
        element: <CampaignPage />,
      },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/setting/about",
        element: <AboutPage />,
      },
      {
        path: "/setting/sniffer",
        element: <SnifferPage />,
      },
      {
        path: "/setting/log",
        element: <LogPage />,
      },
      {
        path: "/setting/distance",
        element: <DistancePage />,
      },
      {
        path: "/setting/channel",
        element: <ChannelPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
