import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from './urlSwitch';
// import APIURL from "./environment/urlSwitch";

const createRoom = async (e: any, name: string, passEnabled: boolean, password: string, confirmPassword: string, CurrentUser: any, history: any) => {
    e.preventDefault();
    name  = name.trim()
    password  = password.trim()
    confirmPassword  = confirmPassword.trim()
    let room = {
        name,
        passEnabled,
        password,
        confirmPassword,
        userId: CurrentUser.id
    }

    // Any fields are null
    if (name === "") {
        return toast.error("Please ensure the name field is filled in!")
    }

    if (password !== confirmPassword) {
        return toast.error("Please ensure the password fields match!")
    }

    // Get user request and set to CurrentUser context
    let request = await axios.post(
        `${APIURL}/room`,
        room,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.room) {
        console.log(data)
        toast.success("Successfully created room!");
        setTimeout(() => {
            history('/rooms');
        }, 300)
    } else {
        toast.error(data.message)
    }
}

const updateRoom = async (e: any, name: string, CurrentUser: any, history: any, currentRoom: any) => {
    e.preventDefault()

    let room = {
        id: currentRoom.id,
        name
    }
    
    let request = await axios.put(
        `${APIURL}/room/${currentRoom.id}`,
        room,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.updatedRoom) {
        console.log(data)
        toast.success("Successfully updated room!");
        setTimeout(() => {
            history('/rooms');
        }, 300)
    } else {
        toast.error(data.message)
    }
}

const deleteRoom = async (e: any, CurrentUser: any, history: any, currentRoom: any) => {
    e.preventDefault()

    let room = {
        id: currentRoom.id,
        userId: CurrentUser.id
    }
    
    let request = await axios.post(
        `${APIURL}/room/delete/${currentRoom.id}`,
        room,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.message) {
        console.log(data)
        toast.success("Successfully deleted room!");
        setTimeout(() => {
            history('/rooms');
        }, 300)
    } else {
        toast.error(data.message)
    }
}

const submitMessage = async (e: any, messageObj: any, messages: any) => {
    e.preventDefault();

    let request = await axios.post(
        `${APIURL}/message`,
        messageObj,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.message) {
        let newMessages: any = [...messages];
        newMessages.push(data.message)
        return newMessages;
    } else {
        toast.error(data.message)
    }
}

export  { createRoom, updateRoom, deleteRoom, submitMessage };