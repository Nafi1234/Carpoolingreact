// ChatPage.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { v4 as uuid } from "uuid";

import { API_HOST } from "../globals";
import { selectUser, selectIsLoading } from "../reducers/userSlice";
import {
  selectMessages,
  fetchMessages,
  loadMessage,
  selectChatLoading,
  selectChatError,
  setError,
} from "../reducers/chatSlice";

function ChatPage() {
  const dispatch = useCallback(useDispatch(), []);
  const { chatUuid } = useParams();

  const user = useSelector(selectUser);
  const userLoading = useSelector(selectIsLoading);

  const messages = useSelector(selectMessages);
  const chatLoading = useSelector(selectChatLoading);
  const chatError = useSelector(selectChatError);

  const ws = useRef(null);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    ws.current = new WebSocket(`ws://${API_HOST}/ws/chat/${chatUuid}/`);
    ws.current.onerror = (e) => dispatch(setError("Web socket error!"));
    ws.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "error") dispatch(setError(msg.data.message));
      else if (msg.type === "chat_message") dispatch(loadMessage(msg.data));
    };

    dispatch(fetchMessages(chatUuid));

    return () => ws.current.close();
  }, [chatUuid, dispatch]);

  if (userLoading || !ws.current) return <Spinner animation="grow" />;
  if (!user) return <Redirect to="/login" />;

  const sendNewMsg = (e) => {
    e.preventDefault();
    if (newMsg && newMsg.replace(/\s+/g, "") !== "") {
      const messageData = { uuid: uuid(), message: newMsg, received: false };
      ws.current.send(JSON.stringify(messageData));
      dispatch(loadMessage(messageData));
      setNewMsg("");
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && newMsg) sendNewMsg(e);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <div className="text-xl font-bold mb-4">Chat Messages</div>
            <div className="overflow-y-auto max-h-48">
              {chatLoading ? (
                <Spinner animation="grow" />
              ) : (
                messages.map(({ uuid, received, message }) => (
                  <Card
                    key={uuid}
                    className={`mb-2 ${
                      received
                        ? "bg-gray-200"
                        : "bg-blue-500 text-white self-end"
                    } p-2 rounded`}
                  >
                    {message}
                  </Card>
                ))
              )}
            </div>
          </div>

          <Form onSubmit={sendNewMsg}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                style={{ resize: "none" }}
                value={newMsg}
                onKeyDown={onKeyDown}
                onChange={(e) => setNewMsg(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={!newMsg || newMsg.replace(/\s+/g, "") === ""}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Send
            </Button>
          </Form>

          {chatError && <p className="mt-3 text-red-500">{chatError}</p>}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
