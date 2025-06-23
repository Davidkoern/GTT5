// App.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [step, setStep] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== "Keek op de Week") {
      setError("Wachtwoord klopt niet");
    } else {
      setError("");
      setStep("uitleg");
    }
  };

  const handleStart = () => {
    setStep("spel");
  };

  return (
    <div className="p-6 text-[#003082]">
      {step === "login" && (
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">SneltoetsTrein</h1>
          <input
            type="text"
            placeholder="Jouw naam"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-[#FFC917] text-[#003082] px-4 py-2 rounded"
          >
            Inloggen
          </button>
        </form>
      )}

      {step === "uitleg" && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Welkom {username}!</h2>
          <p className="mb-4">
            In dit spel oefen je 20 sneltoetsen. Je begint met een oefenronde.
            Daarna volgt een echte ronde waarin je punten verdient.
          </p>
          <h3 className="font-semibold mb-2">Sneltoetsen die je gaat oefenen:</h3>
          <ul className="list-disc pl-6 mb-4 text-sm">
            <li>Ctrl + C – Kopiëren</li>
            <li>Ctrl + V – Plakken</li>
            <li>Ctrl + X – Knippen</li>
            <li>Ctrl + Z – Ongedaan maken</li>
            <li>Alt + Tab – Venster wisselen</li>
            <li>Ctrl + A – Alles selecteren</li>
            <li>Windows + L – Vergrendelen</li>
            <li>Windows + D – Bureaublad tonen</li>
            <li>Ctrl + F – Zoeken</li>
            <li>Ctrl + R – Antwoorden (Outlook)</li>
            <li>Ctrl + N – Nieuwe e-mail</li>
            <li>Ctrl + 1 – Naar mail (Outlook)</li>
            <li>Ctrl + 2 – Naar agenda (Outlook)</li>
            <li>Ctrl + Backspace – Vorig woord verwijderen</li>
            <li>Ctrl + Links/Rechts – Cursor per woord bewegen</li>
            <li>Ctrl + Y – Actie herhalen</li>
            <li>Ctrl + Shift – Open in nieuw venster (Outlook)</li>
            <li>Shift + PageUp/PageDown – Halve pagina scrollen</li>
            <li>Ctrl + End – Naar einde document</li>
            <li>Ctrl + Enter – E-mail verzenden</li>
          </ul>
          <button
            onClick={handleStart}
            className="bg-[#FFC917] text-[#003082] px-4 py-2 rounded"
          >
            Start de oefening
          </button>
        </div>
      )}

      {step === "spel" && (
        <div>
          {/* Jouw spelcomponent komt hier */}
          <p>🎮 Hier komt je spel. Laat me weten als je wilt dat ik het ook hier invoeg.</p>
        </div>
      )}
    </div>
  );
};

export default App;
