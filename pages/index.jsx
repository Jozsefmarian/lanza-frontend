import Head from "next/head";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lanzaventura | Hotel Booking</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <SearchForm />
      </main>
    </>
  );
}
