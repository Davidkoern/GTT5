
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dyrvbhsxmpbvehqbhtsd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [top3, setTop3] = useState([]);
  const [mostImproved, setMostImproved] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from("scores")
        .select("username, score, timestamp")
        .order("timestamp", { ascending: true });

      if (error) return;

      const userMap = {};

      for (const row of data) {
        if (!userMap[row.username]) userMap[row.username] = [];
        userMap[row.username].push(row);
      }

      const summaries = Object.entries(userMap).map(([name, entries]) => {
        const best = Math.max(...entries.map((e) => e.score));
        const worst = Math.min(...entries.map((e) => e.score));
        const first = entries[0].score;
        const winst = best - first;
        return { name, best, worst, winst };
      });

      const top = summaries
        .sort((a, b) => b.best - a.best)
        .slice(0, 3);

      const improved = summaries.sort((a, b) => b.winst - a.winst)[0];

      setTop3(top);
      setMostImproved(improved);
      setScores(summaries);
    };

    fetchScores();
  }, []);

  return (
    <>
      <Link to="/" className="block text-blue-600 underline mb-4">← Terug naar het spel</Link>
      <div className="p-6 max-w-3xl mx-auto text-[#003082]">
        <h1 className="text-3xl font-bold text-[#FFC917] mb-4">🏆 Leaderboard</h1>

        <h2 className="text-xl font-semibold mt-6 mb-2">Top 3 spelers</h2>
        <ol className="list-decimal pl-6">
          {top3.map((u, i) => (
            <li key={i}><strong>{u.name}</strong>: {u.best} punten</li>
          ))}
        </ol>

        <h2 className="text-xl font-semibold mt-6 mb-2">Meeste snelheidswinst</h2>
        {mostImproved && (
          <p><strong>{mostImproved.name}</strong> leerde het meest: +{mostImproved.winst} punten verbetering</p>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-2">Alle deelnemers</h2>
        <table className="w-full border mt-2">
          <thead>
            <tr className="bg-[#FFC917] text-[#003082]">
              <th className="p-2 text-left">Naam</th>
              <th className="p-2 text-left">Beste</th>
              <th className="p-2 text-left">Slechtste</th>
              <th className="p-2 text-left">Verbetering</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((u, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.best}</td>
                <td className="p-2">{u.worst}</td>
                <td className="p-2">{u.winst}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-center">
          <Link to="/" className="inline-block text-blue-600 underline">Terug naar het spel</Link>
        </div>
      </div>
    </>
  );
}
