import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Watch() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        api.get('/movies').then(res => {
            const found = res.data.find(m => m.id === parseInt(id));
            setMovie(found);
        });
    }, [id]);

    if (!movie) return <div className='p-4'>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <video
                src={`http://localhost:5000/${movie.video_url}`}
                controls
                className="w-full h-auto rounded"
            />
            <p className="mt-2 text-gray-400">{movie.description}</p>
        </div>
    );
}
