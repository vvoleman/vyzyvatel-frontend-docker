import React, { useState } from "react";

function DropdownItem({ text, url }) {
  return (
    <a href={url}>
      <li className="bg-slate-700 rounded-lg p-2 px-3 border border-slate-400/60 mt-2">
        {text}
      </li>
    </a>
  );
}

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="flex bg-slate-800 text-white h-[60px] justify-start items-center border-b border-slate-700">
      <div className="flex justify-center items-center w-full absolute">
        <div className="text-2xl text-white pb-1 font-semibold">
          Vyzyvatel.cz
        </div>
      </div>
      <button
        className="text-slate-200 shadow-xl border border-slate-400/60 pt-1 pb-2 px-3 absolute rounded-lg ml-2"
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
          <ul>
            <DropdownItem text={"přihlášení"} url={"/login"} />
            <DropdownItem text={"registrace"} url={"/register"} />
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
