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
    background-image: url('/src/assets/images/waves-bg.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const Header = styled.div`
    color: ${COLORS.darkText};
    padding: 20px 0 50px 0;
    font-size: 25px;
    font-weight: 700;
    //font-family: "Outfit Bold";
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
    padding: 25px;
    border-radius: 20px;
`;

const SpanCredentials = styled.span`
    background-color: ${COLORS.button};
    color: ${COLORS.text};
    border-width: 0;
    height: 45px;
    border-right-width: 5px;
    border-color: ${COLORS.windowBackground};
`;

const InputCredentials = styled.input`
    background-color: ${COLORS.inputBox};
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
    height: 45px;
    margin-top: 25px;
    margin-bottom: 25px;
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
                        <Header>Pharmacy System Manager</Header>
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
                        <Submit className="btn btn-primary" type="button">Sign in</Submit>
                    </Credentials>
                </Divider>
            </Main>
        </>
    )
}