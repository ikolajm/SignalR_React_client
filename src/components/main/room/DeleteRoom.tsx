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
    const [currentRoom, setCurrent]: any = useState(null)
    const [name, setName] = useState('')
    let loggedIn = CurrentUser?.id !== null
    
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

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div className="delete-container">
            <div className="background-overlay"></div>
            <div className="content">

                {
                    currentRoom && currentRoom.id ?
                        <form action="POST" className="create-post--form">
                            <h1>Delete Room</h1>
                            <p>Are you sure you want to delete "<span>{name}</span>"?</p>
                            <div className="form-footer">
                                <NavLink to={"/room/" + currentRoom.id}>Go back</NavLink>
                                <button onClick={e => deleteRoom(e, CurrentUser, history, currentRoom)} className="delete">Delete</button>
                            </div>
                        </form>
                        : ''
                }
            </div>
        </div>
    )
}