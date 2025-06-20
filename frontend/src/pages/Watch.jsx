import { useParams } from 'react-router-dom';

export default function Watch() {
    const { id } = useParams();
    const videoUrl = `http://localhost:5000/uploads/${id}`;

    return (
        <div className="p-4">
            <video src={videoUrl} controls className="w-full h-auto rounded" />
        </div>
    );
}
