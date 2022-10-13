import React from "react";
import { Gravatar } from "../components/Gravatar.js";

export default function Profile() {
  return (
    <div>
      Profile
      <div>
        <Gravatar
          className="m-2 border-2 border-black rounded-full"
          email="maroso625@seznam.cz"
          size={40}
        />
      </div>
    </div>
  );
}
