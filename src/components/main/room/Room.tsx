import axios from "axios";
import { createRef, Fragment, useContext, useEffect, useRef, useState } from "react"
import { Navigate, NavLink, useLocation } from "react-router-dom"
import { submitMessage } from "../../../helpers/room";
import APIURL from "../../../helpers/urlSwitch";
// import RoomMessages from "./RoomMessages";
import _UserContext from "../../../context/UserContext";
import defaultAvatar from "../../../assets/avatar.png";
// import { joinRoom } from "../../../helpers/signalr";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";

export default () => {
    let location = useLocation();
    const [room, setRoom]: any = useState(null);
    const [roomMessages, setMessages]: any = useState([]);
    const [content, setContent] = useState('')
    const [connection, setConnection]: any = useState();
    const CurrentUser: any = useContext(_UserContext)
    const messagesEndRef: any = useRef(document.querySelector('#messagesEndRef'))

    const scrollToBottom = () => {
        let messages: any = document.querySelector('.messages-container')
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    }

    const joinRoom = async (CurrentUser: any, roomIdString: string, setMessages: any, setConnection: any) => {
        try {
            const connection = new HubConnectionBuilder()
              .withUrl(`${APIURL}/chathub`)
              .configureLogging(LogLevel.Information)
              .build();
      
            connection.on("ReceiveMessage", (userObj, messageContent) => {
                console.log(userObj, messageContent)
                let newMessage = {
                    content: messageContent,
                    user: userObj
                }
                setMessages((messages: any) => [...messages, newMessage]);
            });
      
            connection.onclose(e => {
              setConnection();
                //setMessages([]);
            }); 
      
            await connection.start();
            const userId = CurrentUser.id
            await connection.invoke("JoinRoom", { userId, CurrentUser, roomIdString });
            setConnection(connection);
          } catch (e) {
            console.log(e);
          }
      
    }

    const getRoom = async () => {
        console.log(location.pathname.split('/').length)
        let urlArr = location.pathname.split('/')
        let urlId = urlArr[urlArr.length - 1];
        let url = `${APIURL}/room/${urlId}`;
        let request: any = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        request = request.data;
        setRoom(request.room);
        setMessages(request.messages);
        scrollToBottom()
        joinRoom(CurrentUser, urlId, setMessages, setConnection)
    }

    useEffect(() => {
        getRoom()
    }, [])
    useEffect(() => {
        scrollToBottom()
    }, [roomMessages])

    if (!CurrentUser.id) {
        console.log('should be logged out')
        return <Navigate to="/login"/>
    }

    const handleSubmitMessage = async (e: any) => {
        // Handle submittal to db
        let request:any = await submitMessage(e, {content, userId: CurrentUser.id, roomId: room.id}, roomMessages);
        // if successful db post, signal to all users and proceed
        if (request.status === "success") {
            // Invoke the receive message with request.newMessages
            await connection.invoke("SendMessage", CurrentUser, content);
            setContent('')
            scrollToBottom();
        } else {
            toast.error("Error submitting your message!")
        }
    }

    
    return (
        <div className="room-container">
            <div className="background-overlay"></div>
            <div className="content">
                {
                    room && room.name && roomMessages.length >= 0 ?
                        <Fragment>
                            <nav>

                                <NavLink to="/rooms">
                                    <i className="fas fa-long-arrow-alt-left longArrow"></i>
                                </NavLink>
                                <h1>{room.name}
                                    <NavLink to={"/edit-room/" + room.id}>
                                        <i className="fas fa-edit"></i>
                                    </NavLink>
                                </h1>
                            </nav>
                            
                            <div className="messages-container">
                                {/* <RoomMessages messages={roomMessages} /> */}
                                {/* <div id="messages" className="messages"> */}
                                    {
                                        roomMessages && roomMessages.length >= 0 ? 
                                            roomMessages.map((message:any, index: any) => {
                                                console.log(message)
                                                return (
                                                    <div className={message.user.id === CurrentUser.id ? "message owned" : "message"}>
                                                        <div className="message-content">
                                                            {/* Message author */}
                                                            <div className="author">
                                                                <figure><img src={message.user.avatar === "" ? defaultAvatar : message.user.avatar} alt="User avatar" /></figure>
                                                                <span>{message.user.username}</span>
                                                            </div>
                                                            <p>{message.content}</p>
                                                        </div>
                                                    </div>
                                                )
                                            }) : ''
                                    }
                                {/* </div> */}
                            </div>
                        
                            <div className="foot">
                                <input placeholder="Type message here!" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                                <button onClick={(e) => handleSubmitMessage(e)}>Submit</button>
                            </div>
                        </Fragment>
                        : ''
                }
                <div id="messagesEndRef" ref={messagesEndRef} />
            </div>
        </div>
    )
}