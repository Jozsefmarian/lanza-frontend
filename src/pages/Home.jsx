import React from 'react'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Találj szállást a Lanzaventura oldalán!</h1>
        <SearchForm />
      </div>
    </main>
  )
}

export default Home
