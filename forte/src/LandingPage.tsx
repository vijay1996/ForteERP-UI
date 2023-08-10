import { useEffect, useState } from 'react';
import './LandingPage.css';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LandingPage = ({setToken} : {setToken: Function}) => {
    
    const [loginMode, setLoginMode] = useState(true);
    const [error, setError] = useState('');
    
    const [disableSignup, setDisableSignup] = useState(true);
    const [signupName, setSignupName] = useState('')
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPwd, setSignupConfirmPwd] = useState('');
    const [signupCheckBox, setSignupCheBox] = useState(false);

    const [disableLogin, setDisableLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginCheckbox, setLoginCheckbox] = useState(false);

    const login = () => {
        axios.post(`${BASE_URL}/b651117c-ee87-4ba0-9d3d-12755ee84db3`, {
            email: loginEmail,
            password: loginPassword
        }, {
            signal: new AbortController().signal
        })
        .then((data: any) => {
            if (data?.data?.token) {
                setToken(data.data)
            } else {
                setError(data.data)
            }
        })
        .catch(error => {
            setError(error.message);
        })
    }

    useEffect(() => {
        if (signupName.length && signupEmail.length && signupPassword.length && signupPassword === signupConfirmPwd && signupCheckBox) {
            setDisableSignup(false);
        } else {
            setDisableSignup(true);
        }
    }, [signupEmail, signupPassword, signupConfirmPwd, signupCheckBox]);

    useEffect(() => {
        if (loginEmail.length && loginPassword.length && loginCheckbox) {
            setDisableLogin(false);
        } else {
            setDisableLogin(true);
        }
    }, [loginEmail, loginPassword, loginCheckbox]);

    return (
        <div className="container-fluid">
            <div id="poster" className="header-box">
                <h1 id="brand-name">ForteERP</h1>
            </div>
            <div id="form" className='form-box'>
                {
                    loginMode ? 
                        (
                            <form 
                                style={{width: "50%", height: "auto"}}
                            >
                                <h1>Login</h1>
                                <span style={{color: "rgba(200, 50, 50, 0.8)"}}>{error}</span>
                                <br/><br/>
                                <div className="form-group">
                                    <label htmlFor="InputEmail">Email address</label>
                                    <input 
                                        name="email"
                                        type="email" 
                                        className="form-control" 
                                        id="InputEmail" aria-describedby="emailHelp" 
                                        placeholder="Enter email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required={true}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="InputPassword">Password</label>
                                    <input 
                                        name="password"
                                        type="password" 
                                        className="form-control" 
                                        id="InputPassword" 
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <br/>
                                <div className="form-check">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="loginTerms" 
                                        checked={loginCheckbox} 
                                        onClick={() => setLoginCheckbox(!loginCheckbox)}
                                    />
                                    <label className="form-check-label" htmlFor="Terms">Check me out</label>
                                </div>
                                <br/>
                                <button 
                                    id="loginButton"
                                    type="button" 
                                    className={disableLogin ? "btn btn-disabled" : "btn btn-primary"} 
                                    onClick={() => !disableLogin && login()}
                                    disabled={disableLogin}
                                >
                                    Login
                                </button>
                                <button type="submit" className="btn btn-link" onClick={() => setLoginMode(false)}>Sign up</button>
                            </form>
                        ) :
                        (
                            <form 
                                style={{width: "50%", height: "auto"}} 
                                action={`${BASE_URL}/953b49e0-3c1f-4acd-a6bb-5ec932e87ccf`}
                                method='POST'
                            >
                                <h1>Sign up</h1>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="OrganisationName">Name of the Organisation</label>
                                    <input 
                                        name="name" 
                                        type="text" 
                                        className="form-control" 
                                        id="OrganisationName" 
                                        placeholder="Name"
                                        required={true}
                                        value={signupName}
                                        onChange={(e) => setSignupName(e.target.value)}
                                    />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="SignupInputEmail">Email address of the organisation</label>
                                    <input
                                        name="email" 
                                        type="email" 
                                        className="form-control" 
                                        id="SignupInputEmail" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                        required={true}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="SignupInputPassword">Password</label>
                                    <input 
                                        name="password" 
                                        type="password" 
                                        className="form-control" 
                                        id="SignupInputPassword" 
                                        placeholder="Password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="SignupInputConfirmPassword">Confirm password</label>
                                    <input 
                                        name="confirmPassword" 
                                        type="password"
                                        className="form-control"
                                        id="SignupInputConfirmPassword"
                                        placeholder="Password"
                                        value={signupConfirmPwd}
                                        onChange={(e) => setSignupConfirmPwd(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <br/>
                                <div className="form-check">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        id="SignupCheck"
                                        checked={signupCheckBox}
                                        onClick={() => setSignupCheBox(!signupCheckBox)}
                                    />
                                    <label className="form-check-label" htmlFor="SignupCheck">Check me out</label>
                                </div>
                                <br/>
                                <button 
                                    type="submit" 
                                    className={disableSignup ? "btn btn-disabled" : "btn btn-primary"} 
                                    disabled={disableSignup}
                                >
                                    Submit
                                </button>
                                <button type="submit" className="btn btn-link" onClick={() => setLoginMode(true)}>Login</button>
                            </form>
                        )
                }
            </div>
        </div>
    )
}

export default LandingPage;