import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import io from "socket.io-client";
import AuthContext from "../context/AuthContext";

import { DEBUG, ROOM_STATES } from "../constants";

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
    updateSocket();
  }, [username, useremail]);

  useEffect(() => {
    socket.on("user-update", (data) => {
      setUserInfo(data);
    });

    socket.on("room-update", (data) => {
      setRoomInfo(data);
    });

    socket.on("connect", () => {
      console.log("inside connect userInfo", userInfo);
      if (roomInfo && roomInfo.socket === socket.id) {
        console.log(roomInfo.socket, socket.id);
        return;
      }

      updateSocket();
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, [setRoomInfo, setUserInfo, userInfo]);

  const updateSocket = () => {
    const name = username
      ? username
      : JSON.parse(localStorage.getItem("username"));

    const email = useremail
      ? useremail
      : JSON.parse(localStorage.getItem("email"));

    console.log("updateSocked", name, email, username, useremail);

    if (!name || !email) {
      console.log("username or email is null", name, email);
      return;
    }

    socket.emit("update-socket", name, email, (response) => {
      if (response) {
        setUserInfo(response.userInfo);
        setRoomInfo(response.roomInfo);
      }
    });
  };

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

  const answerQuestion = useCallback(
    (answer, auto) => {
      socket.emit("answer-question", username, answer, auto);
    },
    [username]
  );

  const answerPickRegion = useCallback(
    (answer) => {
      socket.emit("answer-pick-region", username, answer);
    },
    [username]
  );

  const answerAttackRegion = useCallback(
    (answer) => {
      socket.emit("answer-attack-region", username, answer);
    },
    [username]
  );

  let contextData = {
    socket: socket,

    userInfo: userInfo,
    roomInfo: roomInfo,

    setUserInfo: setUserInfo,
    setRoomInfo: setRoomInfo,

    socketCancelRoom: cancelRoom,
    socketLeaveRoom: leaveRoom,
    socketUpdateRoom: updateRoom,
    socketCreateRoom: createRoom,
    socketJoinRoom: joinRoom,
    socketJoinPublicRoom: joinPublicRoom,
    socketGetPublicRooms: getPublicRooms,
    socketKickPlayer: kickPlayer,

    socketStartGame: startGame,

    socketAnswerQuestion: answerQuestion,
    socketAnswerPickRegion: answerPickRegion,
    socketAnswerAttackRegion: answerAttackRegion,
  };

  return (
    <SocketContext.Provider value={contextData}>
      {children}
    </SocketContext.Provider>
  );
};
