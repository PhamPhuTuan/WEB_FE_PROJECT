import "./serverchat.scss"
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
// import axios from "axios";
import socketIOClient from "socket.io-client";

const host = "https://easy-json-sesver-demo.herokuapp.com";

const Serverchat = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState();

    const socketRef = useRef();
    const messagesEnd = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host)
      
        socketRef.current.on('getId', data => {
          setId(data)
        })
    
        socketRef.current.on('sendDataServer', dataGot => {
          setMess(oldMsgs => [...oldMsgs, dataGot.data])
          scrollToBottom()
        })
    
        return () => {
          socketRef.current.disconnect();
        };
      }, []);

    const renderMess =  mess.map((m, index) => 
        <div key={index} className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}>
            {m.content}
        </div>
    )

    const sendMessage = () => {
        if(message !== null) {
            const msg = {
            content: currentUser.displayName + " : " + message, 
            id: id
            }
            socketRef.current.emit('sendDataClient', msg)
            setMessage('')
        }
    }

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    
    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            sendMessage()
        }
    }

    // axios.get("https://easy-json-sesver-demo.herokuapp.com/chat")
    // .then((response) => console.log(response.data));
    
    // var submitInput = async () => {
    //     axios.post("https://easy-json-sesver-demo.herokuapp.com/", {"name": `${currentUser.displayName}`,"content": "yeeee"})
    //     .then((response) => console.log(response.data));
    // };

    return (
        <div className="wrap">
            <div className="box-chat">
            <h2>GENERAL CONVERSATION</h2>
            <div className="box-chat_message">
            {renderMess}
            <div style={{ float:"left", clear: "both" }}
                    ref={messagesEnd}>
                </div>
            </div>

            <div className="send-box">
                <textarea 
                    value={message}  
                    onKeyDown={onEnterPress}
                    onChange={handleChange} 
                    placeholder="Nhập tin nhắn ..." 
                />
                <button onClick={sendMessage}>
                    Send
                </button>
            </div>

            </div>
        </div>
    )
}

export default Serverchat 