import { useContext, useEffect, useRef } from "react";
import defaultAvatar from "../../../assets/avatar.png";
import _UserContext from "../../../context/UserContext";

export default (messages: any) => {
    const CurrentUser: any = useContext(_UserContext)
    const messagesEndRef = useRef<any>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
        console.log(messages)
        scrollToBottom()
    }, []);

    return (
        <div className="messages">
            {
                messages && messages.length >= 0 ? 
                    messages.map((message:any) => {
                        return (
                            <div className={message.user.id === CurrentUser.id ? "message owned" : "message"}>
                                <div className="message-content">
                                    {/* Message author */}
                                    <div className="author">
                                        <figure><img src={message.user.avatar === "" ? defaultAvatar : message.user.avatar} alt="User avatar" /></figure>
                                        <span>{message.user.username}</span>
                                    </div>
                                    {/* Message content */}
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        )
                    }) : ''
            }
            <div ref={messagesEndRef} />
        </div>
    )
}