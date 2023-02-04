import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const facts = [
  "Šimpanzi se mohou naučit říkat 'ahoj'.",
  "Krokodýli se mohou smát.",
  "Sloni mohou mít přátelství s jinými druhy zvířat, jako jsou například psy.",
  "Mravenci jsou schopni počítat a udržovat si informace.",
  "Delfíni si mohou povídat svými vlastními 'slovy'.",
  "Lišky mohou běhat až 60 km/h.",
  "Tigři jsou dobří plavci a mohou se potápět hluboko pod vodu.",
  "Hroši mohou být velmi laskaví a ochranářští vůči svým mláďatům.",
  "Medvědi mohou tancovat a kopat do rytmu hudby.",
  "Veverky mohou být velmi nápadité a vynalézavé při hledání jídla.",
  "Žirafy mohou dosáhnout výšky až 6 metrů.",
  "Zebry jsou výjimečné tím, že každá má jedinečný otisk svého pruhu.",
  "Koně mohou vidět všechny čtyři nohy svého koně současně, když se dívají přímo před sebe.",
  "Jeleni mohou skákat přes ploty vysoké až 3 metry.",
  "Nosorožci jsou schopni běhat rychlostí až 55 km/h.",
  "Lvi spí většinou 20 hodin denně.",
  "Pavouci mohou cítit světlo pomocí speciálního orgánu na nohách.",
  "Opice mohou udržovat pevný objekt pouze jednou rukou a používat druhou ruku k jiným činnostem.",
  "Sloni mohou být hodně vášniví a truchliví, když ztratí svého člena stáda.",
  "Krokodýli mohou být schopni plakat skutečné slzy.",
  "Pštrosi mohou běhat rychlostí až 40 km/h.",
];

export default function LoadingScreen() {
  const [timer, setTimer] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [factNumber, setFactNumber] = useState(
    Math.floor(Math.random() * facts.length)
  );
  const loading = useRef(false);
  const [loadingText, setLoadingText] = useState(
    "Zkrať si čekání tímto zajímavým faktem:"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.1);
      if (timer > 0.5) {
        loading.current = true;
      }
      if (timer > 3) {
        setShowFact(true);
      }
      if (timer > 30) {
        setLoadingText(
          "Asi spadl server. Kontaktuj mě prosím na Discordu: Maroso#0271"
        );
      }
    }, 100);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex grow justify-center items-center bg-slate-900 text-white/50">
      {showFact === true ? (
        <div className="absolute top-[30%] text-base text-white/70">
          <div className="text-sm mb-1 text-center">{loadingText}</div>
          <div className="mt-1 mb-3 text-white/80">{facts[factNumber]}</div>
          <div className="flex justify-center items-center">
            <button
              className="border rounded p-1 py-0.5 text-sm opacity-60 border-slate-400/80 hover:opacity-100"
              onClick={() => {
                setFactNumber(
                  factNumber === facts.length - 1 ? 0 : factNumber + 1
                );
              }}
            >
              chci další fakt
            </button>
          </div>
        </div>
      ) : null}
      {loading.current ? (
        <AiOutlineLoading size={120} className="sm:mr-5 mr-1 animate-spin" />
      ) : null}
    </div>
  );
}
