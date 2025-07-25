import { useEffect, useState, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Profiles() {
    const { setProfile } = useContext(ProfileContext);
    const [profiles, setProfiles] = useState([]);
    const [pinInput, setPinInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/profiles").then((res) => setProfiles(res.data));
    }, []);

    const selectProfile = (p) => {
        if (p.pin) {
            const entered = prompt("Enter PIN:");
            if (entered !== p.pin) return alert("Incorrect PIN");
        }
        setProfile(p);
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-3xl font-bold mb-8">Who's watching?</h1>
            <div className="flex gap-8">
                {profiles.map((p) => (
                    <div key={p.id} className="text-center cursor-pointer">
                        <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-24 h-24 rounded-lg mb-2"
                            onClick={() => selectProfile(p)}
                        />
                        <p className="mt-2 text-center">{p.name}</p>
                    </div>
                ))}
                {profiles.length < 5 && (
                    <div onClick={() => navigate("/create-profile")} className="cursor-pointer">
                        <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center text-4xl">+</div>
                        <p className="mt-2">Add Profile</p>
                    </div>
                )}
            </div>
        </div>
    );
}
