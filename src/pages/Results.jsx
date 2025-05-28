import React from 'react'
import { useLocation } from 'react-router-dom'

const Results = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const city = params.get('city')

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">Találatok: {city}</h2>
      <p>Itt fogjuk listázni a szállásokat.</p>
    </main>
  )
}

export default Results
