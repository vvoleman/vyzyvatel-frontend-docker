import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);

  const [usern, setUsern] = useState(
    localStorage.getItem("lastUsername")
      ? JSON.parse(localStorage.getItem("lastUsername"))
      : ""
  );
  const [passwd, setPasswd] = useState("");
  const [usernError, setUsernError] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    document.title = "Přihlášení - Vyzyvatel";
  }, []);

  const handleUsern = (e) => {
    e.preventDefault();

    const validChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_ěščřžýáíéóůúňĚŠČŘŽÝÁÍÉÓŮÚŇ";

    const text = e.target.value;

    let areValid = true;
    text.split("").forEach((char) => {
      if (!validChars.includes(char)) {
        console.log(char);
        areValid = false;
      }
    });

    if (!areValid) return;

    if (e.target.value[0] >= "0" && e.target.value[0] <= "9") return;
    if (e.target.value[e.target.value.length - 1] === " ") return;
    if (e.target.value.length > 16) return;
    if (e.target.value.length <= 4) setUsernError(true);
    else setUsernError(false);

    setUsern(e.target.value);
  };

  const handlePasswd = (e) => {
    e.preventDefault();

    if (e.target.value[e.target.value.length - 1] === " ") return;
    if (e.target.value.length > 30) return;
    if (e.target.value.length < 8) setPasswdError(true);
    else setPasswdError(false);

    setPasswd(e.target.value);
  };

  const handleButton = (e) => {
    e.preventDefault();

    console.log("login");

    if (usernError || passwdError) return;

    if (usern === "") {
      setUsernError(true);
      return;
    }
    if (passwd === "") {
      setPasswdError(true);
      return;
    }
    loginUser(usern, passwd, setServerError);
  };

  return (
    <div className="flex grow justify-center items-center bg-slate-900">
      <div className="w-full sm:rounded-lg shadow sm:border max-w-md  bg-slate-800 border-slate-600">
        <div className="space-y-6 p-7">
          <h1 className="text-xl font-bold leading-tight text-white">
            Přihlášení
          </h1>
          <form className="space-y-6" action="#">
            <div>
              <label htmlFor="username" className="userdata-label">
                Uživatelské jméno
              </label>
              <input
                value={usern}
                type="username"
                name="username"
                id="username"
                className={`userdata-input ${
                  usernError ? "border-rose-800" : ""
                }`}
                placeholder="Pepik420CZ"
                onChange={handleUsern}
              />
              {usernError ? (
                <label className="text-rose-500/90 p-2 text-sm">
                  Uživatelské jméno musí být delší než 4 znaky
                </label>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="userdata-label">
                Heslo
              </label>
              <input
                value={passwd}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`userdata-input ${
                  passwdError ? "border-rose-800" : ""
                }`}
                onChange={handlePasswd}
              />
              {passwdError ? (
                <label className="text-rose-500/90 p-2 text-sm">
                  Heslo je nejméně 8 znaků dlouhé
                </label>
              ) : null}
            </div>
            <button
              onClick={handleButton}
              type="submit"
              className="border-2 border-slate-400/40 w-full text-white bg-primary-600 font-bold rounded-lg text-lg py-2.5 text-center bg-primary-600"
            >
              Přilhásit se
            </button>
            {serverError !== "" ? (
              <div className="flex text-rose-400">{serverError}</div>
            ) : null}
            <p className="text-sm font-light text-gray-400">
              Nemáte účet?{" "}
              <a
                href="./register"
                className="font-medium hover:underline text-primary-500"
              >
                Vytvořit účet
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
