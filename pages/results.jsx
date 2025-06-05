"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ResultsPage() {
  const router = useRouter();
  const { region_id, check_in, check_out, adults } = router.query;

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const s = region_id || 715;
    const t = check_in;
    const n = check_out;
    const r = adults || 2;

    if (s && t && n && r) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/search?region_id=${s}&check_in=${t}&check_out=${n}&adults=${r}`);
          const data = await res.json();
          console.log("API response:", data);
          if (res.ok && data.items) {
            setHotels(data.items);
          } else {
            setError("Nincs találat");
          }
        } catch (err) {
          console.error("Hiba a fetch közben:", err);
          setError("Nem sikerült lekérdezni");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [router.isReady, region_id, check_in, check_out, adults]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Találatok</h1>
      {loading && <p>Töltés...</p>}
      {error && <p className="text-red-600">Hiba: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <div key={hotel.hid} className="border rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold">{hotel.name}</h2>
            <p>ID: {hotel.hid}</p>
            {hotel.min_price && (
              <p className="text-green-700 font-bold">
                Ár: {hotel.min_price.amount} {hotel.min_price.currency}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
