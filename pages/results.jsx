import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";

export default function ResultsPage() {
  const router = useRouter();
  const { regionId, checkIn, checkOut, adults } = router.query;

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (regionId && checkIn && checkOut && adults) {
      const fetchHotels = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/search?regionId=${regionId}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`
          );
          const data = await res.json();
          if (data.hotels) {
            setHotels(data.hotels);
          } else {
            console.error("No hotels in response:", data);
          }
        } catch (err) {
          console.error("Failed to fetch hotels:", err);
        }
        setLoading(false);
      };

      fetchHotels();
    }
  }, [regionId, checkIn, checkOut, adults]);

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {loading ? (
        <p>Loading hotels...</p>
      ) : hotels.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </main>
  );
}
