export default function TextCategories({ room }) {
  let roomsString = "";

  let first = true;
  room.categories.forEach((cat, idx) => {
    if (cat.active === true) {
      if (!first) {
        roomsString += ", ";
      }
      roomsString += cat.name;
      first = false;
    }
  });

  return roomsString;
}
