import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center px-4 py-3 bg-gray-900">
            <Link to="/" className="text-2xl font-bold text-red-500">Gabflix</Link>

            <div className="space-x-4">
                <Link to="/" className="text-white hover:text-red-500">Home</Link>
                <Link to="/movies" className="text-white hover:text-red-500">Movies</Link>
                <Link to="/tv-shows" className="text-white hover:text-red-500">TV Shows</Link>
                <Link to="/about" className="text-white hover:text-red-500">About</Link>
                {token ? (
                    <button onClick={handleLogout} className="text-white hover:text-red-500">Logout</button>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-red-500">Login</Link>
                        <Link to="/signup" className="hover:underline">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
