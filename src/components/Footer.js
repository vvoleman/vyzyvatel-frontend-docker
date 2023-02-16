import { BsYoutube } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { FaDonate } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex gap-[80px] bg-slate-800 h-[50px] justify-center items-center border-t border-slate-700 text-slate-400 z-10 shadow-xl shadow-black/40">
      <a
        className="flex justify-center items-center hover:text-white transition-all"
        href="https://www.youtube.com/c/MarosoDocumentaries"
        target="_blank"
        rel="noreferrer"
      >
        <BsYoutube className="m-1" size={21} />
        <div className="mb-0.5 font-semibold text-sm">YouTube</div>
      </a>
      <a
        className="flex justify-center items-center hover:text-white transition-all"
        href="https://paypal.me/MarosMeciar"
        target="_blank"
        rel="noreferrer"
      >
        <FaDonate className="m-1" size={20} />
        <div className="font-semibold text-sm">Chci podpořit</div>
      </a>
      <a
        className="flex justify-center items-center hover:text-white transition-all"
        href="https://discord.gg/4y6GAGwJ"
        target="_blank"
        rel="noreferrer"
      >
        <SiDiscord className="m-1" size={20} />
        <div className="font-semibold text-sm">Discord</div>
      </a>
    </footer>
  );
}
