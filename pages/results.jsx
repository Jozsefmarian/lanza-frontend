"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ResultsPage() {
  const router = useRouter();
  const { regionId, checkIn, checkOut, adults } = router.query;

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchResults = async () => {
      try {
        const res = await fetch("/api/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    region_id: regionId || 715,
    check_in: checkIn,
    check_out: checkOut,
    adults: adults || 2,
  }),
});
        const data = await res.json();
        console.log("API response:", data);

        if (res.ok && data.items) {
          setHotels(data.items);
        } else {
          setError("Nincs találat");
        }
      } catch (err) {
        console.error(err);
        setError("Nem sikerült betölteni az adatokat");
      } finally {
        setLoading(false);
      }
    };

    if (regionId && checkIn && checkOut && adults) {
      fetchResults();
    }
  }, [router.isReady, regionId, checkIn, checkOut, adults]);

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
