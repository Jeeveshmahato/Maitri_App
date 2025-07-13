import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../Utiles/Socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../Utiles/Constants";
import moment from "moment";
import "moment-timezone";

const Chat = () => {
  const { userID } = useParams();
  console.log("Chat userID:", userID);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loginuser = useSelector((s) => s?.userAuth?.loginDetails);
  
  console.log("Login user data:", loginuser);
  const fetchChatMessages = async () => {
    const chat = await axios.get(BaseUrl + "/chat/" + userID, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data.messages.map((msg) => {
      const { senderId, text, firstName, lastName, img_Url } = msg;
      return {
        firstName,
        lastName,
        text,
        img_Url,
      };
    });
    setMessage(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!loginuser._id) return;
    
    const newSocket = createSocketConnection();
    setSocket(newSocket);
    
    newSocket.emit("joinChat", {
      firstName: loginuser.firstName,
      userId: loginuser._id,
      targetUserId: userID,
    });
    
    newSocket.on("messageReceived", ({ firstName, lastName, text, img_Url }) => {
      console.log("Received message:", { firstName, lastName, text, img_Url });
      setMessage((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text, img_Url },
      ]);
    });
    
    return () => {
      newSocket.disconnect();
    };
  }, [userID, loginuser?._id]);

  const sendMessage = () => {
    if (!socket || !newMessage.trim() || !loginuser._id) {
      console.log("Cannot send message:", { 
        socket: !!socket, 
        message: newMessage.trim(), 
        userId: loginuser._id 
      });
      return;
    }
    
    console.log("Sending message with user data:", {
      firstName: loginuser.firstName,
      lastName: loginuser.lastName,
      userId: loginuser._id,
      targetUserId: userID,
      text: newMessage,
      img_Url: loginuser.img_Url,
    });
    
    socket.emit("sendMessage", {
      firstName: loginuser.firstName,
      lastName: loginuser.lastName,
      userId: loginuser._id,
      targetUserId: userID,
      text: newMessage,
      img_Url: loginuser.img_Url,
    });
    setNewMessage("");
  };
  return (
    <div className="max-w-md mx-auto min-h-72 p-4 border border-b-blue-600 my-10 rounded-lg shadow">
      {message.map((msg, index) => {
        console.log(msg);
        return (
          <div key={index} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={msg.img_Url}
                />
              </div>
            </div>
            <div className="chat-header">
              {`${msg.firstName}  ${msg.lastName}`}
              <time className="text-xs opacity-50">
                {moment(msg.createdAt)
                  .tz("Asia/Kolkata")
                  .format("DD/MM/YYYY hh:mm A")}
              </time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        );
      })}
     
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border bg-black rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
