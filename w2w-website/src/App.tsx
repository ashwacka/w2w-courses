import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Course } from './pages/Course';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { MyCourses } from './pages/MyCourses';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<Course />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="my-courses" element={<MyCourses />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
