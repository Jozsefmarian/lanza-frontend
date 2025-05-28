// src/components/HotelCard.jsx
import React from 'react'

const HotelCard = ({ hotel }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <img
        src={hotel.image || 'https://via.placeholder.com/400x250?text=No+Image'}
        alt={hotel.name}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{hotel.name}</h3>
      <p className="text-gray-600">{hotel.address}</p>
      <p className="text-green-700 font-bold mt-2">{hotel.price} Ft / éj</p>
    </div>
  )
}

export default HotelCard
