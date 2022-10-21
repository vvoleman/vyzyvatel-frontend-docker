import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import SocketContext from "../context/SocketContext";

import { USER_STATES } from "../constants";

import HomeMenu from "../components/menu/HomeMenu";
import Lobby from "../components/lobby/Lobby";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const { username } = useContext(AuthContext);
  const { userState, socketLogin } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vyzyvatel";
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }

    socketLogin();
  }, [username, navigate, socketLogin]);

  if (!userState) return <LoadingScreen />;

  switch (userState.state) {
    case USER_STATES.MENU:
      return <HomeMenu />;
    case USER_STATES.LOBBY:
      return <Lobby />;
    default:
      return <LoadingScreen />;
  }
}
