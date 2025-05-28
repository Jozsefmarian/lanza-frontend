// src/components/SearchResult.jsx
import React from 'react'
import HotelCard from './HotelCard'

const SearchResult = ({ hotels }) => {
  if (!hotels?.length) {
    return <p className="text-center text-gray-500">Nincs találat.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}

export default SearchResult
