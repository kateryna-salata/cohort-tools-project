import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CohortListPage from './pages/CohortListPage';
import CohortDetailsPage from './pages/CohortDetailsPage';
import CohortEditPage from './pages/CohortEditPage';
import CohortCreatePage from './pages/CohortCreatePage';
import StudentListPage from './pages/StudentListPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import StudentEditPage from './pages/StudentEditPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthContext, AuthProvider } from './components/auth.context';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App relative z-20 pt-20">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {isSidebarOpen && <Sidebar />}
      <div className={`content ${isSidebarOpen ? 'shifted' : ''} relative z-10`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<CohortListPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/cohorts/details/:cohortId" element={<CohortDetailsPage />} />
          <Route path="/cohorts/edit/:cohortId" element={<CohortEditPage />} />
          <Route path="/cohorts/create" element={<CohortCreatePage />} />
          <Route path="/students/details/:studentId" element={<StudentDetailsPage />} />
          <Route path="/students/edit/:studentId" element={<StudentEditPage />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <UserProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!isLoggedIn ? <SignupPage /> : <Navigate to="/dashboard" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
