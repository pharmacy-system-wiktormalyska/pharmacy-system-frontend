import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import {AuthMain, HeaderText, Credentials, Submit, InputCredentials, SpanCredentials, Divider} from "../values/components.ts";
import {useAuth} from "../api/AuthContext.tsx";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {User} from "../values/types.ts";

const AuthPage: React.FC  = () => {
    const {login} = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<User>('/api/auth/login', {username, password})
            login(response.data)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <AuthMain>
                <Divider>
                    <Credentials onSubmit={handleSubmit}>
                        <HeaderText>Pharmacy System Manager</HeaderText>
                        <div className="input-group mb-3">
                            <SpanCredentials className="input-group-text" id="inputGroup-sizing-default">
                                <FontAwesomeIcon icon={faUser} />
                            </SpanCredentials>
                            <InputCredentials
                                type="login"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required={true}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <SpanCredentials className="input-group-text" id="inputGroup-sizing-default">
                                <FontAwesomeIcon icon={faLock} />
                            </SpanCredentials>
                            <InputCredentials
                                type="login"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required={true}
                            />
                        </div>
                        <Submit className="btn btn-primary" type="submit">Sign in</Submit>
                    </Credentials>
                </Divider>
            </AuthMain>
        </>
    )
}

export default AuthPage