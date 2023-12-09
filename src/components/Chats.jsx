import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UsersInbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const userId = localStorage.getItem("user_id");

  const { rideId } = useParams();
  const selectedUser = rideId;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/account/get-messages/${userId}/${rideId}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [userId, rideId]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat/ABC/");

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.addEventListener("error", (event) => {
      console.error("WebSocket error in detail:", event);
    });

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "users") {
        console.log("hereeeeeee");
      } else if (data.type === "message") {
        const newMessage = {
          sender: userId,
          recipient: rideId,
          content: data.message,
          timestamp: data.timestamp,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId, rideId]);

  const sendMessage = () => {
    if (selectedUser && socket && message.trim() !== "") {
      let newMessage = {
        sender: userId,
        recipient: selectedUser,
        content: message,
      };

      if (!messages.some((msg) => msg.content === newMessage.content)) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      try {
        const data = {
          sender: userId,
          recipient: rideId,
          message: message,
        };

        const jsonString = JSON.stringify(data);
        socket.send(jsonString);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("Recipient or socket is not available!");
    }
  };

  return (
    <div className="container relative grid grid-cols-[25%,auto] gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 bg-white shadow-xl rounded-xl p-4 h-auto min-h-[80vh] overflow-y-scroll">
          <h1 className="font-semibold">Chat</h1>
          <div>{/* Render Conversation component here */}</div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white bg-opacity-60 shadow-xl rounded-lg grid grid-rows-[14vh,60vh,13vh]">
          <div className="flex flex-row justify-between items-center rounded-md p-4 hover:bg-gray-300 cursor-pointer">
            <div className="flex flex-row items-center gap-1">
              <div className="flex items-center justify-center bg-rose-500 rounded-full w-12 h-12">
                <span className="font-semibold text-2xl text-white">A</span>
              </div>

              <div className="flex flex-col justify-start items-center text-sm">
                <span className="font-semibold">
                  {messages.map((message, index) => (
                    <li key={index}>{message.content}</li>
                  ))}
                </span>
                <span>Online</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-[875px] h-[380px] absolute top-[90px] overflow-y-scroll ">
            <div className="flex flex-col gap-2 p-6">
              <>
                <div className="text-white p-2.5 rounded-br-[1rem] rounded-tr-[0] max-w-[28rem] w-auto flex flex-col gap-2 self-end rounded-bl-[1rem] rounded-tl-[1rem] bg-gradient-to-r from-sky-500 to-blue-500">
                  <span>hi</span>
                  <span className="text-neutral-300 self-end text-xs">
                    date
                  </span>
                </div>
                <div className="text-white p-2.5 rounded-br-[1rem] rounded-tr-[1rem] max-w-[28rem] w-auto flex flex-col gap-2 self-start rounded-bl-[1rem] rounded-tl-[0] bg-gradient-to-r  from-rose-500 to-red-500">
                  <span>hi</span>
                  <span className="text-neutral-300 self-end text-xs">
                    date
                  </span>
                </div>
              </>
            </div>
          </div>
          <div className="bg-white flex justify-start items-center gap-4 p-2 rounded-md self-start w-full mt-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              onClick={() => sendMessage()}
              className="flex items-center justify-center text-white border-none rounded-xl bg-rose-500 transition-all duration-100 ease-out p-2 cursor-pointer"
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersInbox;
