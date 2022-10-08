import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import io from "socket.io-client";

import HomeMenu from "../components/HomeMenu";
import Lobby from "../components/Lobby";
import USER_STATES from "../global/constants";

const socket = io.connect("http://localhost:3001");

export default function Home() {
  const { username } = useContext(AuthContext);
  const [userState, setUserState] = useState({
    isOwner: true,
    state: USER_STATES.MENU,
  });
  const [roomCode, setRoomCode] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vyzyvatel";
  }, []);

  useEffect(() => {
    console.log("userState: " + JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    const login = () => {
      socket.emit("login", username);
    };

    if (!username) {
      navigate("/login");
      return;
    }

    login();
  }, [username, navigate]);

  if (roomCode)
    return (
      <Lobby
        socket={socket}
        username={username}
        roomCode={roomCode}
        setUserState={setUserState}
        setRoomCode={setRoomCode}
        userState={userState}
      />
    );
  else
    return (
      <HomeMenu
        socket={socket}
        username={username}
        userState={userState}
        setUserState={setUserState}
        setRoomCode={setRoomCode}
      />
    );
}
