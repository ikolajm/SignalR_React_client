import { Fragment, useContext, useState } from "react"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
import UserContext from "../../../context/UserContext";
import { createRoom } from "../../../helpers/room";
import Checkbox from "../../reusable/Checkbox";
import FormInput from "../../reusable/FormInput";

export default () => {
    const history = useNavigate();
    let CurrentUser = useContext(UserContext)
    const [name, setName] = useState('')
    const [passEnabled, setPassEnable] = useState(false);
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    let loggedIn = CurrentUser?.id !== null

    if (!loggedIn) {
        console.log(loggedIn, CurrentUser)
        return <Navigate to='/login' />
    }

    const handleChange = () => {
        console.log('fired')
        setPassword('')
        setConfirm('');
        if (passEnabled) {
            setPassEnable(false)
        } else {
            setPassEnable(true)
        }
        console.log(passEnabled)
    }

    return (
        <div className="create-container">
            <div className="background-overlay"></div>
            <div className="content">

                <form action="POST" className="create-post--form">
                    <h1>Create a room</h1>
                        <FormInput
                            forId="name"
                            incomingFor="name"
                            handleChange={setName}
                            label="Room name"
                            type="text"
                            value={name}
                        />
                        <Checkbox
                            label="Enable password?"
                            value={passEnabled}
                            handleChange={() => handleChange()}
                        />
                        {
                            !passEnabled ?
                                '' :
                                <Fragment>
                                    <FormInput
                                        forId="password"
                                        incomingFor="password"
                                        handleChange={setPassword}
                                        label="Password"
                                        type="password"
                                        value={password}
                                    />
                                    <FormInput
                                        forId="confirm"
                                        incomingFor="confirm"
                                        handleChange={setConfirm}
                                        label="Confirm Password"
                                        type="password"
                                        value={confirm}
                                    />
                                </Fragment>
                        }
                    <div className="form-footer">
                        <NavLink to="/rooms">Go back</NavLink>
                        <button onClick={e => createRoom(e, name, passEnabled, password,confirm, CurrentUser, history)} className="save">Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}