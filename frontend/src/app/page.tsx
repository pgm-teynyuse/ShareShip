'use client'
import Link from 'next/link'

export default function Home() {
    return (
<main className="m-4 p-8 bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded-md shadow-md relative">

    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        ShareShip
    </h1>
    <p className="text-lg leading-relaxed">
        Blast off into a world of possibilities with ShareShip – your ultimate sharing platform! Rent or share high-quality materials for every occasion.
    </p>
    <p>
    From tools to outdoor gear, join the space-sharing community and transform the way you access and share resources!
    </p>

    <button className="bg-white hover:bg-gray-100  text-gray-900 font-semibold py-2 px-4 rounded mt-4">
        <Link href="/materials">Explore the Galaxy
        </Link>
    </button>
</main>

    );
}

