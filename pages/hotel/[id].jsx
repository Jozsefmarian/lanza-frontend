import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HotelDetail from "../../components/HotelDetail";

export default function HotelPage() {
  const router = useRouter();
  const { id } = router.query;

  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchHotel = async () => {
      const res = await fetch(`/api/hotel?hid=${id}`);
      const data = await res.json();
      setHotel(data?.hotel);
    };
    fetchHotel();
  }, [id]);

  if (!hotel) return <p className="p-4">Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <HotelDetail hotel={hotel} />
    </main>
  );
}
