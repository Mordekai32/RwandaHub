import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Existing pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import MyApplications from './pages/MyApplications';
import EmployerJobs from './pages/EmployerJobs';
import ApplicantsList from './pages/ApplicantsList';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminJobs from './pages/AdminJobs';
import AdminAnalytics from './pages/AdminAnalytics';

// New pages for footer links
import FindJobs from './pages/FindJobs';
import Companies from './pages/Companies';
import AboutUs from './pages/AboutUs';
import HelpCenter from './pages/HelpCenter';
import CareerTips from './pages/CareerTips';
import Blog from './pages/Blog';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Footer navigation routes */}
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/career-tips" element={<CareerTips />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* Protected routes for jobseekers */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/my-applications" element={<ProtectedRoute role="jobseeker"><MyApplications /></ProtectedRoute>} />

            {/* Protected routes for employers */}
            <Route path="/employer/jobs" element={<ProtectedRoute role="employer"><EmployerJobs /></ProtectedRoute>} />
            <Route path="/employer/post" element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>} />
            <Route path="/employer/applicants/:jobId" element={<ProtectedRoute role="employer"><ApplicantsList /></ProtectedRoute>} />

            {/* Protected routes for admin */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobs /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute role="admin"><AdminAnalytics /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;