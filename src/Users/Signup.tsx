import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUserDetails] = useState({ firstName: "", lastName:"",email: "", username: "", password: "", role: "STUDENT" });
    const navigate = useNavigate();
    const { login, setUser } = useAuth();
    const signup = async () => {
        try {
            const response = await client.signup(user);
            login();
            setUser(response);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h1 className="card-title">Sign up</h1>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" value={user.firstName} onChange={(e) => setUserDetails({
                                    ...user, firstName: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" value={user.lastName} onChange={(e) => setUserDetails({
                                    ...user, lastName: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" value={user.email} onChange={(e) => setUserDetails({
                                    ...user, email: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" value={user.username} onChange={(e) => setUserDetails({
                                    ...user, username: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={user.password} onChange={(e) => setUserDetails({
                                    ...user, password: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" value={user.role} onChange={(e) => setUserDetails({
                                    ...user, role: e.target.value
                                })}>
                                    <option value="STUDENT">STUDENT</option>
                                    <option value="FACULTY">FACULTY</option>
                                </select>
                            </div>
                            
                            <button type="button" className="btn btn-primary" onClick={signup}>Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}