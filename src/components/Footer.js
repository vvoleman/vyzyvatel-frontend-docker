import React from "react";
import { BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="flex bg-slate-800 h-[50px] justify-center items-center border-t border-slate-700 text-slate-400">
      <a
        className="flex justify-center items-center"
        href="https://www.youtube.com/c/MarosoDocumentaries"
        target="_blank"
        rel="noreferrer"
      >
        <BsYoutube className="m-1" size={22} />
        <div className="m-1 mb-1.5">Maroso</div>
      </a>
    </footer>
  );
}
