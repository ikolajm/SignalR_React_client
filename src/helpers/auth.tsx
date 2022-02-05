import { toast } from 'react-toastify';
import AuthenticatedUser from '../interfaces/AuthenticatedUser';
import axios from "axios";
import APIURL from "../helpers/urlSwitch";

interface SignupFormDetails {
    name: string,
    username: string,
    email: string,
    password: string,
    confirm: string
}

const signup = async (e: any, form: SignupFormDetails, SetCurrentUser: any) => {
    e.preventDefault();
    let email = form.email.trim();
    let username = form.username.trim();
    let password = form.password.trim();
    let confirm = form.confirm.trim();

    // Any fields are null
    if (username === "" ||  email === "" || password === "" || confirm === "") {
        return toast.error("Please ensure all fields are filled in!")
    }

    // Passwords do not match
    if (password !== confirm) {
        return toast.error("Please make sure your passwords match!")
    }

    // Get user request and set to CurrentUser context
    let request = await axios.post(
        `${APIURL}/auth/register`,
        { username, email, password, "confirmPassword": confirm },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.user) {
        let loggedInUser = data.newUser;
        loggedInUser.token = data.sessionToken;
        toast.success("Successfully signed up!");
        localStorage.setItem('token', data.sessionToken);
        setTimeout(() => {
            SetCurrentUser(loggedInUser);
        }, 300)
    } else {
        toast.error(data.message)
    }
}

interface LoginFormDetails {
    email: string,
    password: string,
}

const login = async (e: any, form: LoginFormDetails, SetCurrentUser: any) => {
    e.preventDefault();
    let email = form.email.trim();
    let password = form.password.trim();

    // Any fields are null
    if (email === "" || password === "") {
        return toast.error("Please ensure all fields are filled in!")
    }

    // Get user request and set to CurrentUser context
    let request = await axios.post(
        `${APIURL}/auth/login`,
        { email, password },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.user) {
        let loggedInUser = data.user;
        loggedInUser.token = data.token;
        toast.success("Successfully logged in!");
        setTimeout(() => {
            SetCurrentUser(loggedInUser);
        }, 300)
    } else {
        toast.error(data.message)
    }
}

const logout = (e:  any, SetCurrentUser: any) => {
    const nullUser: AuthenticatedUser = {
        avatar: "",
        email: "",
        id: null,
        token: null,
        username: ""
    }
    toast.success("Successfully logged out!");
    localStorage.removeItem('token');
    SetCurrentUser(nullUser);
}

const checkToken = async (SetCurrentUser: any) => {
    // If session is still in place and user refreshes
    // let token = localStorage.getItem('token')
    // if (token) {
    //     // Check token
    //     let request: any = await axios.post(
    //         `${APIURL}/user/authenticate`,
    //         {token},
    //         {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }
    //     )
    //     request = request.data;
    //     // If auth fails or expires
    //     if (request.status === "ERROR") {
    //         sessionStorage.removeItem('token');
    //         toast.error(request.message)
    //         return "FAIL";
    //     } else {
    //         let user = request.user;
    //         user.token = token;
    //         SetCurrentUser(user);
    //     }
    // }
    // // If a protected endpoint is hit but there is no token
    // if (!token) {
    //     return "FAIL"
    // }
}

export { login, signup, logout, checkToken }