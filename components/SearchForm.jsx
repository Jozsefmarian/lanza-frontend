import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchForm() {
  const router = useRouter();
  const [regionId, setRegionId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push({
      pathname: "/results",
      query: { regionId, checkIn, checkOut, adults },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Find your hotel</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Region ID (e.g. 2764 for Budapest)"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          className="border p-2 rounded"
          min="1"
          max="6"
          required
        />
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Search Hotels
      </button>
    </form>
  );
}
