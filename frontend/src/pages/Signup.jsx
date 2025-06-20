import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await api.post('/register', { username, password });
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto">
            <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              className="block w-full mb-2 p-2 bg-gray-800 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="block w-full mb-2 p-2 bg-gray-800 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignup}
              className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
            >
                Sign Up
            </button>
            <p className="mt-2 text-center">
                Already have an account?{' '}
                <span
                  className="text-red-400 cursor-pointer underline"
                  onClick={() => navigate('/login')}
                >
                    Log in
                </span>
            </p>
        </div>
    );
}
