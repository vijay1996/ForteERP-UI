import { useState } from 'react';
import './LandingPage.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LandingPage = () => {
    
    const [loginMode, setLoginMode] = useState(true);

    return (
        <div className="container-fluid">
            <div id="poster" className="header-box">
                <h1 id="brand-name">ForteERP</h1>
            </div>
            <div id="form" className='form-box'>
                {
                    loginMode ? 
                        (
                            <form style={{width: "50%", height: "auto"}}>
                                <h1>Login</h1>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="InputEmail">Email address</label>
                                    <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="InputPassword">Password</label>
                                    <input type="password" className="form-control" id="InputPassword" placeholder="Password"/>
                                </div>
                                <br/>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="Terms"/>
                                    <label className="form-check-label" htmlFor="Terms">Check me out</label>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="submit" className="btn btn-link" onClick={() => setLoginMode(false)}>Sign up</button>
                            </form>
                        ) :
                        (
                            <form 
                                style={{width: "50%", height: "auto"}} 
                                action={`${BASE_URL}/signup`}
                                method='POST'
                            >
                                <h1>Sign up</h1>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="OrganisationName">Name of the Organisation</label>
                                    <input name="name" type="text" className="form-control" id="OrganisationName" placeholder="Name"/>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="SignupInputEmail">Email address of the organisation</label>
                                    <input name="email" type="email" className="form-control" id="SignupInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="SignupInputPassword">Password</label>
                                    <input name="password" type="password" className="form-control" id="SignupInputPassword" placeholder="Password"/>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="SignupInputConfirmPassword">Confirm password</label>
                                    <input name="confirmPassword" type="password" className="form-control" id="SignupInputConfirmPassword" placeholder="Password"/>
                                </div>
                                <br/>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="SignupCheck"/>
                                    <label className="form-check-label" htmlFor="SignupCheck">Check me out</label>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="submit" className="btn btn-link" onClick={() => setLoginMode(true)}>Login</button>
                            </form>
                        )
                }
            </div>
        </div>
    )
}

export default LandingPage;