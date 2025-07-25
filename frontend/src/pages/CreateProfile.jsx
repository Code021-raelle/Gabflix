import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const avatars = [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theguardian.com%2Ffilm%2Ffilmblog%2F2009%2Fdec%2F21%2Favatar-shows-cinemas-weakness&psig=AOvVaw22iek0S5U1p-mLsiKkFDjz&ust=1753124715676000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCR5f-QzI4DFQAAAAAdAAAAABAE",
        "https://google.com/avatar2.jpg",
        "https://google.com/avatar3.jpg",
        "https://google.com/avatar4.jpg",
        "https://google.com/avatar5.jpg",
    ];

    const handleSubmit = async () => {
        try {
            await api.post("/profiles", { name, avatar, pin });
            navigate("/profiles");
        } catch (err) {
            setError(err.response?.data?.msg || "Error creating profile");
        }
    };

    return (
        <div className="container mx-auto py-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
            <input
                type="text"
                placeholder="Profile Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800"
            />
            <input
                type="password"
                placeholder="4-digit PIN (optional)"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800"
            />
            <div className="flex gap-4 mb-4">
                {avatars.map((a) => (
                    <img
                        key={a}
                        src={a}
                        alt="Avatar"
                        className={`w-16 h-16 rounded-lg cursor-pointer ${
                            avatar === a ? "border-4 border-red-500" : ""
                        }`}
                        onClick={() => setAvatar(a)}
                    />
                ))}
            </div>
            <button onClick={handleSubmit} className="bg-red-600 p-3 rounded hover:bg-red-700">
                Create Profile
            </button>
            {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
    );
}
