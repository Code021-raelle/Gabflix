import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!file || !title || !description) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const token = localStorage.getItem('token');
            await api.post('/upload_movie', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Movie uploaded successfully!');
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Upload failed');
        }
    };

    return (
        <div className='p-6 max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Upload Movie</h2>

            <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className='block w-full mb-2 text-sm text-gray-400'
            />

            <input
                type="text"
                placeholder="Title"
                className="block w-full mb-2 p-2 bg-gray-800 rounded"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter category/genre (e.g., Action, Comedy)"
                className="block w-full mb-2 p-2 bg-gray-800 rounded"
                name='category'
                value={form.category}
                onChange={handleChange}
                required
            />

            <textarea
                placeholder="Description"
                className="block w-full mb-2 p-2 bg-gray-800 rounded"
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button
                onClick={handleUpload}
                className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
            >
                Upload
            </button>
        </div>
    );
}
