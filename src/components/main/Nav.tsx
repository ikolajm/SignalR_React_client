import { NavLink } from "react-router-dom"
import { logout } from "../../helpers/auth";
import { toggleDropdown } from '../../helpers/nav';
import {useState, Fragment, useContext} from 'react';
import UserContext from "../../context/UserContext";
import UserUpdateContext from "../../context/UserUpdateContext";


export default () => {
    const CurrentUser = useContext(UserContext);
    const SetCurrentUser = useContext(UserUpdateContext);

    return (
        <nav>
            <div className="title">
                <NavLink to="/rooms">
                    <h1>ChatApp</h1>
                </NavLink>
            </div>
            <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-button">
                    <i className="fas fa-bars"></i>
                </button>
                <div id="dropdown-content" className="dropdown-content">
                    <NavLink className='editProfileLink' to="/edit-profile">
                        <i className="fas fa-user-cog"></i>
                        Edit profile
                    </NavLink>
                    <button className="logoutLink" onClick={e => logout(e, SetCurrentUser)}>
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}