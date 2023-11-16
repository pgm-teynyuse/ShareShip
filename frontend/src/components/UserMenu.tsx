"use client"
import Link from "next/link";
import { useState } from "react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    } from "@heroicons/react/24/outline"; 



type User = {
  username?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | undefined;

type Props = {
  user: User;
};

export default function UserMenu({ user }: Props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
setIsDropdownOpen(!isDropdownOpen);
};

const closeDropdown = () => {
  setIsDropdownOpen(false);
};

  return (
    <div className="hidden lg:flex gap-3">
      <div className="relative">
        <div className="flex gap-1 items-center">
        <button  onClick={toggleDropdown}>
            <div className="flex gap-1 items-center"> 
            <UserCircleIcon className="h-6 w-6" />
            <p>{user?.email}</p>
                <ChevronDownIcon className="h-5 w-5 text-primary" />
            </div>
          </button>
        </div>
                  {isDropdownOpen && ( 
                  <div onMouseLeave={closeDropdown} className="absolute z-10 top-8 left-5 bg-white border rounded-md p-2 flex flex-col" style={{ width: '150px', height: 'auto' }}>
                  <Link href="/profile">Profile</Link>
                  <Link href="/profile/mymaterials">My materials</Link>
                  <Link href="/profile/rentrequests">Rent requests</Link>
                  <Link href="/profile/requested">Requests</Link>
                  <Link href="/api/auth/signout">Sign Out</Link>
                  </div>
                  )}
            </div>
      </div>
  );
}
