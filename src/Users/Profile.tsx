import { useNavigate } from "react-router";
import * as client from "./client";
import { useState, useEffect } from "react";

type ProfileType = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    role: string;
};

export default function Profile() {
    const [profile, setProfile] = useState<ProfileType>({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: ""
    });
    const [originalProfile, setOriginalProfile] = useState<ProfileType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    const handleEdit = () => {
        setOriginalProfile({...profile});
        setIsEditMode(true);
    };

    const handleSave = async () => {
        await client.updateUser(profile);
        setIsEditMode(false);
        setOriginalProfile(null);
    };

    const handleCancel = () => {
        if (originalProfile) {
            setProfile(originalProfile);
        }
        setIsEditMode(false);
        setOriginalProfile(null);
    }

    const handleSignOut = async () => {
        await client.signout();
        navigate("/Signin");
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Profile</h1>
            {profile && (
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" value={profile.username} onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })} readOnly={!isEditMode} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={profile.password} onChange={(e) =>
                            setProfile({ ...profile, password: e.target.value })} readOnly={!isEditMode} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={profile.firstName} onChange={(e) =>
                            setProfile({ ...profile, firstName: e.target.value })} readOnly={!isEditMode} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={profile.lastName} onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })} readOnly={!isEditMode} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" value={profile.dob} onChange={(e) =>
                            setProfile({ ...profile, dob: e.target.value })} readOnly={!isEditMode} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={profile.email} onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })} readOnly={!isEditMode} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <input type="text" className="form-control" id="role" value={profile.role} readOnly={true} />
                    </div>
                    {!isEditMode ? (
                        <>
                            <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
                        </>
                    ) : (   <>
                            <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                            <button type="button" className="btn btn-primary" onClick={handleCancel}>Cancel</button>
                            </>
                    )}
                </form>
            )}
        </div>
    );
}