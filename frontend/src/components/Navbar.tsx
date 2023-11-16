"use server"
import { useState } from "react";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import UserMenu from "@/components/UserMenu";
import CategoriesDrop from "@/components/CategoriesDrop";
import Link from "next/link";
import {
ArrowPathRoundedSquareIcon,
Bars3Icon,
ChevronDownIcon,
} from "@heroicons/react/24/outline"; 


export default async function App() {
const session = await getServerSession(authOptions);

return (
<div className="navBar">
    <nav>
    <div className="flex justify-between w-full">
        <div className="flex mx-auto">
        {/* Primary menu and logo */}
        <div className="flex space-x-4 items-center gap-8 my-12">
            {/* Logo */}
            <div>
            <Link href="/" className="logo flex gap-1 font-bold text-gray-700 items-center">
                <ArrowPathRoundedSquareIcon className="h-8 w-8 text-primary" />
                <span>ShareShip</span>
            </Link>
            </div>
            {/* Primary navigation links */}
            <div className="hidden lg:flex items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/materials">
                <p>Materials</p>
            </Link>
            <div className="flex -ml-7 mt-0.5"><CategoriesDrop /></div>
            <Link href="/contact">Contact</Link>
            </div>
            {session ? (               
            <UserMenu user={session?.user} />
            ) : (
            <div className="flex space-x-4">
            <Link  href="/register" className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-100 dark:hover-bg-cyan-700 dark:focus:ring-cyan-800">Register</Link>
            <Link  href="/api/auth/signin" className="rounded-lg bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-100 dark:hover-bg-cyan-700 dark:focus:ring-cyan-800">Sign In</Link>
            </div>
			)}
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
            <button>
                <Bars3Icon className="h-6" />
            </button>
            </div>
        </div>
        </div>
    </div>
    {/* Mobile navigation ${!toggleMenu ? "h-0" : "h-full"} */}
    <div className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700`}>
        <div className="px-8">
        <div className="flex flex-col gap-8 font-bold tracking-wider">
            <Link className="border-l-4 border-gray-600" href="/">Home</Link>
            <Link href="/materials">Materials</Link>
            <Link href="/rentals">Rentals</Link>
            <Link href="/contact">Contact</Link>
        </div>
        </div>
    </div>
    </nav>
</div>
);
}

