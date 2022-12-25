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

  const [userInfo, setUserInfo] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    if (DEBUG) console.log("userInfo: " + JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    if (DEBUG) console.log("roomInfo: " + JSON.stringify(roomInfo));
  }, [roomInfo]);

  useEffect(() => {
    socket.on("user-update", (data) => {
      setUserInfo(data);
    });

    socket.on("room-update", (data) => {
      setRoomInfo(data);
    });
  }, [setRoomInfo, setUserInfo]);

  const login = useCallback(() => {
    socket.emit("login", username, useremail, (response) => {
      if (response) {
        setUserInfo(response.userInfo);
        setRoomInfo(response.roomInfo);
      }
    });
  }, [username, useremail]);

  const cancelRoom = useCallback(() => {
    socket.emit("cancel-room", username);
  }, [username]);

  const leaveRoom = useCallback(() => {
    socket.emit("leave-room", username, (response) => {
      if (response) {
        setUserInfo(response.userInfo);
        setRoomInfo(response.roomInfo);
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
        setUserInfo(response.userInfo);
        setRoomInfo(response.roomInfo);
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
        setUserInfo(response.userInfo);
        setRoomInfo(response.roomInfo);
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
        setUserInfo(response.userInfo);
        setRoomInfo(response.roomInfo);
        setCodeError(null);
      });
    },
    [username]
  );

  const getPublicRooms = useCallback((setPublicRooms) => {
    socket.emit("public-rooms", (response) => {
      if (response) {
        setPublicRooms(response);
        if (DEBUG) console.log("public rooms: " + JSON.stringify(response));
      }
    });
  }, []);

  const kickPlayer = useCallback(
    (player) => {
      socket.emit("kick-room", username, player);
    },
    [username]
  );

  const startGame = useCallback(() => {
    socket.emit("start-game", username);
  }, [username]);

  let contextData = {
    socket: socket,

    userInfo: userInfo,
    roomInfo: roomInfo,

    setUserInfo: setUserInfo,
    setRoomInfo: setRoomInfo,

    socketLogin: login,
    socketCancelRoom: cancelRoom,
    socketLeaveRoom: leaveRoom,
    socketUpdateRoom: updateRoom,
    socketCreateRoom: createRoom,
    socketJoinRoom: joinRoom,
    socketJoinPublicRoom: joinPublicRoom,
    socketGetPublicRooms: getPublicRooms,
    socketKickPlayer: kickPlayer,
    socketStartGame: startGame,
  };

  return (
    <SocketContext.Provider value={contextData}>
      {children}
    </SocketContext.Provider>
  );
};
