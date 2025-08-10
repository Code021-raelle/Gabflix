import { createContext, useState, useEffect } from "react";
export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(
        JSON.parse(localStorage.getItem("profile")) || null
    );

    useEffect(() => {
        profile
            ? localStorage.setItem("profile", JSON.stringify(profile))
            : localStorage.removeItem("profile");
    }, [profile]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}
