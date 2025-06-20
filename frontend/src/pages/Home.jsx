import { useEffect, useState } from "react";
import api from '../services/api';

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get('/movies').then((res) => setMovies(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Gabflix 🎬</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                        <p className="text-gray-400">{movie.description}</p>
                        <video
                            src="{`http://localhost:5000/${movie.video_url}`}"
                            controls
                            className="mt-2 w-full h-48 object-cover rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
