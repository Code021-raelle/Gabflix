import { useContext, useEffect, useState } from "react";
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';


export default function Home() {
    const { profile } = useContext(ProfileContext);
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        api.get('/movies').then((res) => setMovies(res.data));
    }, [profile]);

    if (!profile) return <Navigate to="/profiles" />;

    const filtered = movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));

    const fetchMovies = async () => {
        try {
            const url = selectedCategory ? `${API_URL}/movies?category=${selectedCategory}` : `${API_URL}/movies`;
            const res = await axios.get(url);
            setMovies(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Dropdown for genres
    <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Sci-Fi">Sci-Fi</option>
        {/* Add more as needed */}
    </select>


    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search movies..."
                className="block w-full p-2 mb-4 rounded bg-gray-800"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filtered.map((movie) => (
                    <div key={movie.id} className="bg-gray-900 p-2 rounded">
                        <Link to={`/watch/${movie.id}`}>
                            <h3 className="text-lg font-semibold">{movie.title}</h3>
                            <video
                                src={`http://localhost:5000/${movie.video_url}`}
                                className="w-full h-auto rounded mt-2"
                                muted
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
