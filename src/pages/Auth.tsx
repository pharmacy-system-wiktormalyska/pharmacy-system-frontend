import {COLORS} from '../values/colors'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.windowBackground};
`;

const Header = styled.div`
    color: ${COLORS.main};
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
    background-color: ${COLORS.background};
    padding: 20px;
    border-radius: 20px;
`;

const Divider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Submit = styled.button`
    background-color: ${COLORS.main};
    width: 100%;
`;

export const AuthPage = () => {
    return (
        <>
            <Main>
                <Divider>
                    <Credentials>
                        <Header>Login to Pharmacy System Manager</Header>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Login</span>
                            <input type="text" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                            <input type="password" className="form-control" aria-label="Sizing example input"
                                   aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <Submit className="btn btn-primary" type="button">Sign In</Submit>
                    </Credentials>
                </Divider>
            </Main>
        </>
    )
}