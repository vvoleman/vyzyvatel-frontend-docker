import React, { useEffect, useState } from "react";

export default function TextCategories(room) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getRoomString = (room) => {
      let roomsString = "";

      console.log(JSON.stringify(room));

      let first = true;
      room["room"]["categories"].forEach((cat, idx) => {
        if (cat.active === true) {
          if (!first) {
            roomsString += ", ";
          }
          roomsString += cat.name;
          first = false;
        }
      });

      return roomsString;
    };

    if (categories === null) {
      setCategories(getRoomString(room));
    }
  }, [room, categories]);

  return <div>{categories}</div>;
}
