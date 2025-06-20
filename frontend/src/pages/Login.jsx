import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2 mb-2 border border-gray-300 bg-gray-800 rounded"
            />
            <button
                onClick={handleLogin}
                className="w-full bg-red-600 p-2 rounded hover:bg-red-700"
            >
                Login
            </button>
            <p className="mt-2 text-center">
                Don't have an account?{' '}
                <span
                  className="text-red-400 cursor-pointer underline"
                  onClick={() => navigate('/signup')}
                >
                    Sign up
                </span>
            </p>
        </div>
    );
}
