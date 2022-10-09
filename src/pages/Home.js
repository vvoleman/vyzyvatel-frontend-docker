import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import io from "socket.io-client";

import USER_STATES from "../global/constants";

import HomeMenu from "../components/HomeMenu";
import Lobby from "../components/Lobby";
import LoadingScreen from "../components/LoadingScreen";

const socket = io.connect("http://localhost:3001");

export default function Home() {
  const { username } = useContext(AuthContext);
  const [userState, setUserState] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [lobbyState, setLobbyState] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vyzyvatel";
  }, []);

  useEffect(() => {
    console.log("roomCode: " + roomCode);
    console.log("userState: " + JSON.stringify(userState));
    console.log("lobbyState: " + JSON.stringify(lobbyState));
  }, [userState, roomCode, lobbyState]);

  useEffect(() => {
    const login = () => {
      socket.emit("login", username, (response) => {
        if (response) {
          console.log("login: " + JSON.stringify(response));
          setRoomCode(response.roomCode);
          setUserState(response.userState);
          if (response.lobbyState) setLobbyState(response.lobbyState);
        }
      });
    };

    if (!username) {
      navigate("/login");
      return;
    }

    login();
  }, [username, navigate]);

  if (!userState) return <LoadingScreen />;

  switch (userState.state) {
    case USER_STATES.MENU:
      return (
        <HomeMenu
          socket={socket}
          username={username}
          userState={userState}
          setUserState={setUserState}
          setRoomCode={setRoomCode}
          setLobbyState={setLobbyState}
        />
      );
    case USER_STATES.LOBBY:
      return (
        <Lobby
          socket={socket}
          username={username}
          roomCode={roomCode}
          setUserState={setUserState}
          setRoomCode={setRoomCode}
          userState={userState}
          lobbyState={lobbyState}
          setLobbyState={setLobbyState}
        />
      );
    default:
      return <LoadingScreen />;
  }
}
