import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import {useState} from "react";
import styled from "styled-components";
import {COLORS} from "../values/colors.ts";
import {HeaderText} from "../components/HeaderText.tsx";

const AuthPage: React.FC  = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <>
            <AuthMain>
                <Divider>
                    <Credentials>
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
                    </Credentials>
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
export const Credentials = styled.form`
    display: flex;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.windowBackground};
    padding: 25px;
    border-radius: 20px;
`;

export const Submit = styled.button`
    background-color: ${COLORS.button};
    width: 100%;
    height: 45px;
    margin-top: 25px;
    margin-bottom: 25px;
    font-family: "Outfit Medium", serif;
    border-width: 0;
    &:hover {
        background-color: ${COLORS.buttonHover};
    }
`;

export const SpanCredentials = styled.span`
    background-color: ${COLORS.button};
    color: ${COLORS.text};
    border-width: 0;
    height: 45px;
    border-right-width: 5px;
    border-color: ${COLORS.windowBackground};
`;

export const InputCredentials = styled.input`
    background-color: ${COLORS.inputBox};
    border-width: 0;
    font-family: "Outfit Regular", serif;
`;

export const Divider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;