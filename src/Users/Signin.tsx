import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import { useAuth } from "../auth/AuthContext";

export default function Signin() {

    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "STUDENT"
    });

    const { login } = useAuth();
    
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const signin = async () => {
        try {
            await client.signin(credentials);
            login();
            navigate("/Kanbas/Dashboard");
        } catch {
            setError("Invalid Credentials. Please try again.");
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h1 className="card-title">Kanbas Login</h1>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="form-group">
                        <input type="text" className="form-control" value={credentials.username} onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })} placeholder="Username" required /><br />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" value={credentials.password} onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })} placeholder="Password" required /><br />
                    </div>
                    <button className="btn btn-primary" onClick={signin}>Sign in</button><br /><br />
                    Don't have an account? <Link to="/Signup" className="card-link">Register</Link>
                </div>
            </div>
        </div>
    );
}