import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ firstName: "", lastName:"",email: "", username: "", password: "", role: "STUDENT" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            console.log(user);
            await client.signup(user);
            navigate("/Signin");
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
                                <input type="text" className="form-control" id="firstName" value={user.firstName} onChange={(e) => setUser({
                                    ...user, firstName: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" value={user.lastName} onChange={(e) => setUser({
                                    ...user, lastName: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" value={user.email} onChange={(e) => setUser({
                                    ...user, email: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" value={user.username} onChange={(e) => setUser({
                                    ...user, username: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={user.password} onChange={(e) => setUser({
                                    ...user, password: e.target.value
                                })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" value={user.role} onChange={(e) => setUser({
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