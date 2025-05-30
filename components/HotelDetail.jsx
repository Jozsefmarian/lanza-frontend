export default function HotelDetail({ hotel }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{hotel.name}</h1>
      {hotel.main_photo_url && (
        <img
          src={hotel.main_photo_url}
          alt={hotel.name}
          className="w-full h-auto rounded mb-4"
        />
      )}
      <p className="text-gray-700 mb-2">
        <strong>Address:</strong> {hotel.address}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Stars:</strong> {hotel.stars}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Coordinates:</strong> {hotel.latitude}, {hotel.longitude}
      </p>
    </div>
  );
}
