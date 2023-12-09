import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const userId = localStorage.getItem("user_id");
  const { rideId } = useParams();
  const selectedUser = rideId;
  const isMessageProcessed = useRef(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/chat/get-messages/${userId}/${rideId}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
        console.log("here giving the message", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [userId, rideId]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat/ABC/");

    newSocket.onopen = () => {
      isMessageProcessed.current = false;
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
      console.log("<<<<<<<<<>>>>>>>>>>>>>>>>>>>", data);

      if (data.type === "users") {
        console.log("hereeeeeee");
      } else if (data.type === "message") {
        console.log("giving the data", data);
        console.log("///////////////////////", data.sender);
        const newMessage = {
          sender: data.sender.id,
          recipient: rideId,
          content: data.message,
        };
        console.log("Here giving the  newmessage", newMessage);
        // Check if the message is not already present in the state
        if (newSocket.readyState === WebSocket.OPEN) {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%", WebSocket.OPEN);
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@", newSocket.readyState);

          if (
            !isMessageProcessed.current &&
            !messages.some(
              (msg) =>
                msg.sender === newMessage.sender &&
                msg.recipient === newMessage.recipient &&
                msg.content === newMessage.content
            )
          ) {
            isMessageProcessed.current = true;
            console.log("entering in the console for the times");
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId, rideId, messages]);

  const sendMessage = () => {
    console.log("sendMessage called");

    if (selectedUser && socket && message.trim() !== "") {
      console.log("Sending message:", message);

      try {
        const data = {
          sender: userId,
          recipient: rideId,
          message: message,
        };

        const jsonString = JSON.stringify(data);
        console.log("Sending JSON:", jsonString);
        socket.send(jsonString);
        console.log("her give nwe", userId);
        setMessage("");

        /*{setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: userId,
            recipient: rideId,
            content: message,
          },
        ]);

        setMessage("");*/
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("Recipient or socket is not available!");
    }
  };

  useEffect(() => {
    console.log("Updated messages in the state:", messages, userId);
  }, [messages]);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-4">
        <h1 className="text-white text-2xl font-bold text-center">Chat</h1>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col space-y-2 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${(() => {
                console.log("her msg.sender", msg.sender, "userId", userId);
                return msg.sender == userId
                  ? "self-end justify-end"
                  : "self-start justify-end";
              })()} bg-${
                msg.sender == userId ? "blue-500" : "gray-200"
              } text-white rounded-lg p-2 flex items-center`}
            >
              <span className="material-icons mr-2"></span>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatComponent;
