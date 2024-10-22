import {COLORS} from '../values/colors'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.background};
`;

const Header = styled.div`
    color: ${COLORS.text};
    padding: 0 0 50px 0;
    font-size: 20px;
    font-weight: 700;
`;

const Credentials = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.windowBackground};
    padding: 20px;
    border-radius: 20px;
`;
const SpanCredentials = styled.span`
    background-color: ${COLORS.button};
    color: ${COLORS.text};
    border-width: 0;
    border-right-width: 3px;
    border-color: ${COLORS.windowBackground};
`;

const InputCredentials = styled.input`
    background-color: ${COLORS.button};
    border-width: 0;
`;

const Divider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Submit = styled.button`
    background-color: ${COLORS.button};
    width: 100%;
    font-weight: 500;
    border-width: 0;
    &:hover {
        background-color: ${COLORS.buttonHover};
    }
`;

export const AuthPage = () => {
    return (
        <>
            <Main>
                <Divider>
                    <Credentials>
                        <Header>Login to Pharmacy System Manager</Header>
                        <div className="input-group mb-3">
                            <SpanCredentials className="input-group-text" id="inputGroup-sizing-default">
                                <FontAwesomeIcon icon={faUser} />
                            </SpanCredentials>
                            <InputCredentials type="text" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="input-group mb-3">
                            <SpanCredentials className="input-group-text" id="inputGroup-sizing-default">
                                <FontAwesomeIcon icon={faLock} />
                            </SpanCredentials>
                            <InputCredentials type="password" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <Submit className="btn btn-primary" type="button">Sign In</Submit>
                    </Credentials>
                </Divider>
            </Main>
        </>
    )
}