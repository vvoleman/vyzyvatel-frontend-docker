import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

function DropdownItemLink({ text, url }) {
  return (
    <a href={url}>
      <li className="bg-slate-700 rounded-lg p-2 px-3 border border-slate-400/60 mt-2">
        {text}
      </li>
    </a>
  );
}

function DropdownItemButton({ text, func }) {
  return (
    <button
      onClick={func}
      className="bg-slate-700 rounded-lg p-2 px-3 border border-slate-400/60 mt-2"
    >
      {text}
    </button>
  );
}

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const { username, logoutUser } = useContext(AuthContext);

  return (
    <nav className="flex bg-slate-800 text-white h-[60px] justify-start items-center border-b border-slate-700">
      <div className="flex justify-center items-center w-full absolute">
        <div className="sm:text-2xl text-lg text-white pb-1 font-semibold">
          Vyzyvatel.cz
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
          <BsPersonCircle size={25} className="sm:mr-5 mr-1" />
        </button>
      </div>
      <button
        className="text-slate-200 shadow-xl border border-slate-400/60 pt-1 pb-2 px-3 absolute rounded-lg sm:ml-3 ml-1"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        menu
      </button>
      {dropdownOpen ? (
        <div
          className="top-[60px] left-[0px] absolute bg-slate-700/50 px-2 py-2 rounded-br-lg border-b border-r border-slate-700"
          onMouseLeave={() => {
            setDropdownOpen(false);
          }}
        >
          {username ? <ul></ul> : <ul></ul>}
        </div>
      ) : null}
      {accountDropdownOpen ? (
        <div
          className="absolute top-[60px] right-0 bg-slate-700/50 px-2 py-2 rounded-bl-lg border-b border-l border-slate-700"
          onMouseLeave={() => {
            setDropdownOpen(false);
          }}
        >
          {username ? (
            <ul>
              <DropdownItemButton text={"odhlásit"} func={logoutUser} />
            </ul>
          ) : (
            <ul>
              <DropdownItemLink text={"přihlášení"} url={"/login"} />
              <DropdownItemLink text={"registrace"} url={"/register"} />
            </ul>
          )}
        </div>
      ) : null}
    </nav>
  );
}
