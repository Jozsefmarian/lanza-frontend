import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city) return
    navigate(`/results?city=${encodeURIComponent(city)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="Város (pl. Budapest)"
        className="w-full px-4 py-2 border rounded"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
      >
        Keresés
      </button>
    </form>
  )
}

export default SearchForm
