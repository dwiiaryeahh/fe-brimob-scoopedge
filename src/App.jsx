import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full min-w-full text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/target" replace />} />
            <Route path="/target" element={<TargetPage />} />
            <Route path="/campaign" element={<CampaignPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/setting/about" element={<AboutPage />} />
            <Route path="/setting/sniffer" element={<SnifferPage />} />
            <Route path="/setting/log" element={<LogPage />} />
            <Route path="/setting/distance" element={<DistancePage />} />
            <Route path="/setting/channel" element={<ChannelPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
