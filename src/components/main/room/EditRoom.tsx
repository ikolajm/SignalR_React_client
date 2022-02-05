import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react"
import { NavLink, Navigate, useNavigate, useLocation } from "react-router-dom"
import UserContext from "../../../context/UserContext";
import { createRoom, deleteRoom, updateRoom } from "../../../helpers/room";
import APIURL from "../../../helpers/urlSwitch";
import Checkbox from "../../reusable/Checkbox";
import FormInput from "../../reusable/FormInput";

export default () => {
    let location = useLocation();
    const history = useNavigate();
    let CurrentUser = useContext(UserContext)
    const [name, setName] = useState('')
    const [currentRoom, setCurrent]: any = useState(null)
    let loggedIn = CurrentUser?.id !== null

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    const getRoom = async () => {
        let urlArr = location.pathname.split('/')
        let urlId = urlArr[urlArr.length - 1];
        let url = `${APIURL}/room/${urlId}`;
        let request: any = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        request = request.data.room;
        console.log(request)
        setName(request.name)
        setCurrent(request)
    }

    useEffect(() => {
        getRoom()
    }, [])

    return (
        <div className="edit-container">
            <div className="background-overlay"></div>
            <div className="content">
                {
                    currentRoom && currentRoom.id ?
                        <form action="PUT" className="create-post--form">
                            <h1>Edit Room</h1>
                                <FormInput
                                    forId="name"
                                    incomingFor="name"
                                    handleChange={setName}
                                    label="Room name"
                                    type="text"
                                    value={name}
                                />
                                {/* <Checkbox
                                    label="Edit password?"
                                    value={passEnabled}
                                    handleChange={() => handleChange()}
                                /> */}
                                {/* {
                                    !passEnabled ?
                                        '' :
                                        <Fragment>
                                            <FormInput
                                                forId="password"
                                                incomingFor="password"
                                                handleChange={setPassword}
                                                label="New Password"
                                                type="password"
                                                value={password}
                                            />
                                            <FormInput
                                                forId="confirm"
                                                incomingFor="confirm"
                                                handleChange={setConfirm}
                                                label="Confirm New Password"
                                                type="password"
                                                value={confirm}
                                            />
                                        </Fragment>
                                } */}
                            <NavLink className="delete-link" to={"/delete-room/" + currentRoom.id}>
                                Delete room
                            </NavLink>
                            <div className="form-footer">
                                <NavLink to={"/room/" + currentRoom.id}>Go back</NavLink>
                                <button onClick={e => updateRoom(e, name, CurrentUser, history, currentRoom)} className="save">Update</button>
                            </div>
                        </form>
                        : ''
                }
            </div>
        </div>
    )
}