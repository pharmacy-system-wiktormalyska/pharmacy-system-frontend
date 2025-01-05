import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import {SyntheticEvent, useEffect, useState} from "react";
import styled from "styled-components";
import colorPalette from "../values/colors.ts";
import {HeaderText} from "../components/HeaderText.tsx";
import {useNavigate} from "react-router-dom";
import {url} from "../values/BackendValues.tsx";
import {useAuth} from "../auth/AuthContext.tsx";
import Cookies from "universal-cookie";

const AuthPage: React.FC  = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setToken} = useAuth()
    const cookies = new Cookies(null, {path: '/'})

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()



        const response = await fetch(url+"/auth/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json();
        setToken(data.token)

        const expirationDate = new Date()
        expirationDate.setHours(expirationDate.getHours() + 8)
        cookies.set('token', data.token, { expires: expirationDate})

        if (response.ok) {
            setRedirect(true);
        } else {
            console.error('Login failed:', data);
        }
    }
    useEffect(() => {
        if (redirect) {
            navigate('/')
        }
    }, [redirect, navigate])
    return (
        <>
            <AuthMain>
                <Divider>
                    <CredentialsForm onSubmit={submit}>
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
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required={true}
                            />
                        </div>
                        <Submit className="btn btn-primary" type="submit">Sign in</Submit>
                    </CredentialsForm>
                </Divider>
            </AuthMain>
        </>
    )
}

export default AuthPage

const AuthMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-image: url('/src/assets/images/waves-bg.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
export const CredentialsForm = styled.form`
    display: flex;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color: ${colorPalette.windowBackground.hex};
    padding: 25px;
    border-radius: 20px;
`;

export const Submit = styled.button`
    background-color: ${colorPalette.button.hex};
    width: 100%;
    height: 45px;
    margin-top: 25px;
    margin-bottom: 25px;
    font-family: "Outfit Medium", serif;
    border-width: 0;
    &:hover {
        background-color: ${colorPalette.buttonHover.hex};
    }
`;

export const SpanCredentials = styled.span`
    background-color: ${colorPalette.button.hex};
    color: ${colorPalette.text.hex};
    border-width: 0;
    height: 45px;
    border-right-width: 5px;
    border-color: ${colorPalette.windowBackground.hex};
`;

export const InputCredentials = styled.input`
    background-color: ${colorPalette.inputBox.hex};
    border-width: 0;
    font-family: "Outfit Regular", serif;
`;

export const Divider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;