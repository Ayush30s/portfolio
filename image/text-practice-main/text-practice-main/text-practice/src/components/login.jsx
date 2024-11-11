import { useState } from 'react';
import {Link} from "react-router-dom";
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="flex flex-col justify-around items-center">
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Link to="/app"><button onClick={handleLogin}>Login</button></Link>
        </div>
    );
};

export default LoginPage;
