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
  const { username, useremail } = useContext(AuthContext);

  const [userState, setUserState] = useState(null);
  const [lobbyState, setLobbyState] = useState(null);

  useEffect(() => {
    DEBUG && console.log("userState refreshed: " + JSON.stringify(userState));
  }, [userState]);

  useEffect(() => {
    DEBUG && console.log("lobbyState refreshed: " + JSON.stringify(lobbyState));
  }, [lobbyState]);

  useEffect(() => {
    socket.on("user-update", (data) => {
      setUserState(data);
    });

    socket.on("room-update", (data) => {
      setLobbyState(data);
    });
  }, [setLobbyState, setUserState]);

  const login = useCallback(() => {
    socket.emit("login", username, useremail, (response) => {
      if (response) {
        DEBUG && console.log("login: " + JSON.stringify(response));
        setUserState(response.userState);
        if (response.lobbyState) setLobbyState(response.lobbyState);
      }
    });
  }, [username, useremail]);

  const cancelRoom = useCallback(() => {
    socket.emit("cancel-room", username);
  }, [username]);

  const leaveRoom = useCallback(() => {
    socket.emit("leave-room", username, (response) => {
      if (response) {
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
      }
    });
  }, [username]);

  const updateRoom = useCallback(
    (newLobbyState) => {
      socket.emit("update-room", username, newLobbyState);
    },
    [username]
  );

  const createRoom = useCallback(() => {
    socket.emit("create-room", username, (response) => {
      if (response) {
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
      }
    });
  }, [username]);

  const joinRoom = useCallback(
    (roomCode, setCodeError) => {
      socket.emit("join-room", roomCode, username, (response) => {
        if (response === "404") {
          setCodeError("chybný kód");
          return;
        } else if (response === "full") {
          setCodeError("hra je plná");
          return;
        } else if (response === "banned") {
          setCodeError("v této hře nejste vítán/a");
          return;
        }
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
        setCodeError(null);
      });
    },
    [username]
  );

  const joinPublicRoom = useCallback(
    (roomCode, setCodeError) => {
      socket.emit("join-room", roomCode, username, (response) => {
        if (response === "404") {
          setCodeError("chybný kód");
          return;
        } else if (response === "full") {
          setCodeError("hra je plná");
          return;
        } else if (response === "banned") {
          setCodeError("v této hře nejste vítán/a");
          return;
        }
        setUserState(response.userState);
        setLobbyState(response.lobbyState);
        setCodeError(null);
      });
    },
    [username]
  );

  const getPublicRooms = useCallback((setPublicRooms) => {
    socket.emit("public-rooms", (response) => {
      if (response) {
        setPublicRooms(response);
      }
    });
  }, []);

  const kickPlayer = useCallback(
    (player) => {
      socket.emit("kick-room", username, player);
    },
    [username]
  );

  let contextData = {
    socket: socket,

    userState: userState,
    lobbyState: lobbyState,

    setUserState: setUserState,
    setLobbyState: setLobbyState,

    socketLogin: login,
    socketCancelRoom: cancelRoom,
    socketLeaveRoom: leaveRoom,
    socketUpdateRoom: updateRoom,
    socketCreateRoom: createRoom,
    socketJoinRoom: joinRoom,
    socketJoinPublicRoom: joinPublicRoom,
    socketGetPublicRooms: getPublicRooms,
    socketKickPlayer: kickPlayer,
  };

  return (
    <SocketContext.Provider value={contextData}>
      {children}
    </SocketContext.Provider>
  );
};
