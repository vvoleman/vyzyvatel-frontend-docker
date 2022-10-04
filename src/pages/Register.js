import React, { useEffect, useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confpasswd, setConfpasswd] = useState("");

  useEffect(() => {
    document.title = "Registrace - Vyzyvatel";
  }, []);

  return (
    <div className="flex grow justify-center items-center bg-slate-900">
      <div className="w-full sm:rounded-lg shadow sm:border max-w-md  bg-slate-800 border-slate-600">
        <div className="space-y-6 p-7">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
            Registrace
          </h1>
          <form className="space-y-6" action="#">
            <div>
              <label htmlFor="username" className="userdata-label">
                Uživatelské jméno
              </label>
              <input
                type="username"
                name="username"
                id="username"
                className="userdata-input"
                placeholder="pepik420cz"
              />
            </div>
            <div>
              <label htmlFor="email" className="userdata-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="userdata-input"
                placeholder="pepa@seznam.cz"
              />
            </div>
            <div>
              <label htmlFor="password" className="userdata-label">
                Heslo
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="userdata-input"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="userdata-label">
                Ověření hesla
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="userdata-input"
              />
            </div>

            <button
              type="submit"
              className="border-2 border-slate-400/40 w-full text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
            >
              Vytvořit účet
            </button>
            <p className="text-sm font-light text-gray-400">
              Už máte účet?{" "}
              <a
                href="./login"
                className="font-medium hover:underline text-primary-500"
              >
                Přilhásit se
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
