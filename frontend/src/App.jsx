import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      
    <Nav/>
      <Routes>
   
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
  

        {/* admin routes */}
        <Route path="/admin" element={true ?< Layout />:<Login/>}>
          <Route index element={<Dashboard />} />           {/* /admin          */}
          <Route path="addBlog"   element={<AddBlog />} />  {/* /admin/addBlog  */}
          <Route path="listBlog"  element={<ListBlog />} /> {/* /admin/listBlog */}
          <Route path="comments"  element={<Comments />} /> {/* /admin/comments */}

        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

     
    </BrowserRouter>
  );
}

export default App;
