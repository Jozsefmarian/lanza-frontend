import Link from "next/link";

export default function HotelCard({ hotel }) {
  const lowestRate = hotel.rates?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">
        <Link href={`/hotel/${hotel.id}`} className="text-blue-600 hover:underline">
          Hotel ID: {hotel.id}
        </Link>
      </h2>

      {lowestRate ? (
        <p className="text-blue-600 font-bold">
          From: {lowestRate.amount} {lowestRate.currency_code}
        </p>
      ) : (
        <p className="text-gray-500">No rate available</p>
      )}
    </div>
  );
}
