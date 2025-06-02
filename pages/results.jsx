// pages/results.jsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Results() {
  const router = useRouter()
  const { region_id = 715, check_in, check_out, adults = 2 } = router.query

  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!check_in || !check_out) return

    const fetchHotels = async () => {
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ region_id: Number(region_id), check_in, check_out, adults: Number(adults) }),
        })

        const data = await res.json()

        if (res.ok && data.items) {
          setHotels(data.items)
        } else {
          throw new Error(data.error || 'Hiba a hotel adatok betöltésekor.')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [region_id, check_in, check_out, adults])

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
            {hotel.min_price && <p className="text-green-700 font-bold">Ár: {hotel.min_price.amount} {hotel.min_price.currency}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
