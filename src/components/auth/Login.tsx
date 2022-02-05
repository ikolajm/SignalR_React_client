import AuthInput from "../../components/reusable/FormInput";
import React, { useState, useContext } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { login } from "../../helpers/auth"
import UserUpdateContext from "../../context/UserUpdateContext";
import _UserContext from "../../context/UserContext";
import AuthenticatedUser from "../../interfaces/AuthenticatedUser";


export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SetCurrentUser = useContext(UserUpdateContext);
    const CurrentUser: any = useContext(_UserContext)
    let loggedIn = CurrentUser?.token !== null && CurrentUser?.id !== null && CurrentUser?.uuid !== null

    if (loggedIn) {
        // console.log(CurrentUser)
        return <Navigate to='/rooms' />
    } else {
        // console.log(CurrentUser)
    }

    return (
        <div className="login-container">
            <div className="background-overlay"></div>
            <div className="content">
                <form action="POST">
                    <h1>Welcome back!</h1>
                    {/* Email */}
                    <AuthInput
                        forId="email"
                        incomingFor="email"
                        handleChange={setEmail}
                        label="Email"
                        type="text"
                        value={email}
                    />
                    {/* Password */}
                    <AuthInput
                        forId="password"
                        incomingFor="password"
                        handleChange={setPassword}
                        label="Password"
                        type="password"
                        value={password}
                    />
                    <div className="form-footer">
                        <button type="submit"
                        onClick={e => login(
                            e,
                            {
                                email,
                                password
                            },
                            SetCurrentUser
                        )}>Submit</button>
                        <NavLink to="/signup" className="form-footer--link">
                            <span>I don't have an account</span>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}