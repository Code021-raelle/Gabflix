import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Profiles from './pages/Profiles';
import CreateProfile from './pages/CreateProfile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/watch/:id" element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />
        <Route path="/create-profile" element={
          <ProtectedRoute>
            <CreateProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
