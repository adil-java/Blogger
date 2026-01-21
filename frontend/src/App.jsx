import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Nav      from './components/Nav.jsx';
import Home     from './pages/Home.jsx';
import Blog     from './pages/Blog.jsx';

import "quill/dist/quill.snow.css"
/* Admin pages */
import Layout     from './pages/admin/Layout.jsx';
import Dashboard  from './pages/admin/Dashboard.jsx';
import AddBlog    from './pages/admin/AddBlog.jsx';
import ListBlog   from './pages/admin/ListBlog.jsx';
import Comments   from './pages/admin/Comments.jsx';

import Login from './components/admin/Login.jsx';
import WriterAuth from './components/admin/WriterAuth.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return isAuthenticated ? children : <WriterAuth />;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public routes - with Nav */}
        <Route path="/" element={<><Nav /><Home /></>} />
        <Route path="/blog/:id" element={<><Nav /><Blog /></>} />

        {/* admin routes - without Nav (has its own sidebar) */}
        <Route path="/admin" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
