import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import io from "socket.io-client";
import AuthContext from "../context/AuthContext";

import { DEBUG } from "../constants";

const SocketContext = createContext();
const socket = io.connect(process.env.REACT_APP_SOCKETIO_URL);

export default SocketContext;

export const SocketProvider = ({ children }) => {
  const { username } = useContext(AuthContext);

  const [userState, setUserState] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [lobbyState, setLobbyState] = useState(null);

  useEffect(() => {
    DEBUG && console.log("roomCode refreshed: " + roomCode);
  }, [roomCode]);

  useEffect(() => {
    DEBUG && console.log("userState refreshed: " + JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    DEBUG && console.log("lobbyState refreshed: " + JSON.stringify(lobbyState));
  }, [lobbyState]);

  useEffect(() => {
    socket.on("user-update", (data) => {
      setRoomCode(data.roomCode);
      setUserState(data.userState);
    });

    socket.on("room-update", (data) => {
      setLobbyState(data.lobbyState);
    });
  }, [setLobbyState, setRoomCode, setUserState]);

  const login = useCallback(() => {
    socket.emit("login", username, (response) => {
      if (response) {
        DEBUG && console.log("login: " + JSON.stringify(response));
        setRoomCode(response.roomCode);
        setUserState(response.userState);
        if (response.lobbyState) setLobbyState(response.lobbyState);
      }
    });
  }, [username]);

  const cancelRoom = useCallback(() => {
    socket.emit("cancel-room", roomCode, username);
  }, [roomCode, username]);

  const leaveRoom = useCallback(() => {
    socket.emit("leave-room", roomCode, username, (response) => {
      if (response) {
        setRoomCode(response.roomCode);
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
      }
    });
  }, [roomCode, username]);

  const updateRoom = useCallback(
    (isPublic) => {
      socket.emit("update-room", roomCode, username, {
        ...lobbyState,
        public: isPublic,
      });
    },
    [roomCode, username, lobbyState]
  );

  let contextData = {
    socket: socket,

    userState: userState,
    roomCode: roomCode,
    lobbyState: lobbyState,

    setUserState: setUserState,
    setRoomCode: setRoomCode,
    setLobbyState: setLobbyState,

    socketLogin: login,
    socketCancelRoom: cancelRoom,
    socketLeaveRoom: leaveRoom,
    socketUpdateRoom: updateRoom,
  };

  return (
    <SocketContext.Provider value={contextData}>
      {children}
    </SocketContext.Provider>
  );
};
