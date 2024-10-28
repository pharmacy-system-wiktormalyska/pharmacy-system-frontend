import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import {AuthMain, HeaderText, Credentials, Submit, InputCredentials, SpanCredentials, Divider} from "../values/components.ts";

export const AuthPage = () => {
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
            </AuthMain>
        </>
    )
}