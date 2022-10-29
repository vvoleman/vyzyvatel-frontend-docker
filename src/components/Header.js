import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Gravatar } from "./Gravatar";
import { BiLogInCircle } from "react-icons/bi";

function DropdownItemLink({ text, url, margin }) {
  return (
    <a href={url}>
      <li
        className={`bg-slate-700 rounded-lg p-1.5 px-3 border border-slate-400/60 ${margin}`}
      >
        {text}
      </li>
    </a>
  );
}

function DropdownItemButton({ text, func }) {
  return (
    <button
      onClick={func}
      className="bg-slate-700 rounded-lg p-1.5 px-3 border border-slate-400/60 my-1"
    >
      {text}
    </button>
  );
}

export default function Header() {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const { username, useremail, logoutUser } = useContext(AuthContext);

  return (
    <nav className="flex bg-slate-800 text-white h-[60px] justify-start items-center border-b border-slate-700">
      <div className="flex justify-center items-center w-full absolute">
        <div className="sm:text-2xl text-lg text-white pb-1 font-semibold">
          <a href="/"> Vyzyvatel.cz </a>
        </div>
      </div>
      <div className="flex justify-end items-center w-full absolute">
        <div
          className={`text-md p-3 ${
            username ? "text-white/95" : "text-white/60"
          }`}
        >
          {username ? username : "nepřihlášen"}
        </div>
        <button
          onClick={() => {
            setAccountDropdownOpen(!accountDropdownOpen);
          }}
        >
          {useremail ? (
            <Gravatar
              className="sm:mr-5 mr-1 border-2 border-green-500 rounded-full"
              email={useremail}
              size={34}
            />
          ) : (
            <BiLogInCircle className="sm:mr-5 mr-1" size={30} />
          )}
        </button>
      </div>
      {accountDropdownOpen ? (
        <div
          className="absolute top-[60px] right-0 bg-slate-800 px-2 py-1.5 rounded-bl-md border-b border-l border-slate-700"
          onMouseLeave={() => {
            setAccountDropdownOpen(false);
          }}
        >
          {username ? (
            <ul>
              <DropdownItemButton text={"odhlásit"} func={logoutUser} />
            </ul>
          ) : (
            <ul>
              <DropdownItemLink text={"přihlášení"} url={"/login"} />
              <DropdownItemLink
                text={"registrace"}
                url={"/register"}
                margin={"mt-2"}
              />
            </ul>
          )}
        </div>
      ) : null}
    </nav>
  );
}

/*
      <button
        className="text-slate-200 shadow-xl border border-slate-400/60 pt-1 pb-2 px-3 absolute rounded-lg sm:ml-3 ml-1"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        menu
      </button>
*/
