import FormInput from "../reusable/FormInput";
import React, { useState, useContext, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import _UserContext from "../../context/UserContext";
import Nav from "./Nav";
import { Modal, Button } from "react-bootstrap";
import APIURL from "../../helpers/urlSwitch";
import axios from "axios";
import { toast } from "react-toastify";


export default () => {
    const [show, setShow] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom]: any = useState(null);
    const [password, setPassword] = useState('')
    const CurrentUser: any = useContext(_UserContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();
    // console.log(CurrentUser)

    const getRooms = async () => {
        let url = `${APIURL}/room`;
        let request: any = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        request = request.data;
        const sorted = request.rooms.sort((a:any, b:any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        console.log(sorted)
        setRooms(sorted);
    }

    useEffect(() => {
        getRooms()
    }, [])

    if (!CurrentUser.id) {
        console.log('should be logged out')
        return <Navigate to="/login"/>
    }

    const openPasswordModal = (room: any) => {
        setActiveRoom(room)
        handleShow()
    }

    const closePasswordModal = () => {
        setActiveRoom(null)
        handleClose()
    }

    const checkRoomPassword = (password:string) => {
        if (password === activeRoom.password) {
            console.log('correct')
            navigate("/room/" + activeRoom.id)
        } else {
            console.log('incorrect')
            toast.error("Incorrect password for selected room");
        }
    }

    interface Iuser {
        id: number;
        username: string;
        avatar: string;
    }

    interface Iroom {
        id: number;
        name: string;
        password: string;
        passEnabled: boolean;
        userId: string;
        user: Iuser;
    }

    return (
        <div className="rooms-container">
            <div className="background-overlay"></div>
            <div className="content">
                <Nav />

                <div className="room-options">
                    <h1>{rooms.length} Available</h1>
                    <NavLink to="/create-room"><button>Create Room</button></NavLink>
                    <div className="room-list">
                        {
                            rooms && rooms.length > 0 ?
                                rooms.map((room: Iroom, index) => {
                                    return (
                                        room && room.passEnabled ?
                                            <div onClick={() => openPasswordModal(room)} className="room">
                                                <h1>{room.name}</h1>
                                                <div className="info">
                                                    <div className="owner">
                                                        <i className="fas fa-user-circle"></i>
                                                        <span>{room.user.username}</span>
                                                    </div>
                                                    <i className="fas fa-lock"></i>
                                                </div>
                                            </div>
                                            :
                                            <NavLink to={"/room/" + room.id} className="room">
                                                <h1>{room.name}</h1>
                                                <div className="info">
                                                    <div className="owner">
                                                        <i className="fas fa-user-circle"></i>
                                                        <span>{room.user.username}</span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                    )
                                })
                                : ''
                        }
                    </div>
                </div>
                {
                    activeRoom && activeRoom.name ?
                        <Modal show={show} onHide={closePasswordModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirm Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Please confirm the password to enter "<span>{activeRoom.name}</span>"</p>
                                <FormInput
                                    forId="password"
                                    incomingFor="password"
                                    handleChange={setPassword}
                                    label="Password"
                                    type="password"
                                    value={password}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleClose}>
                                    Close
                                </Button>
                                <Button onClick={() => checkRoomPassword(password)}>
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Modal> : ''
                }
            </div>
        </div>
    )
}