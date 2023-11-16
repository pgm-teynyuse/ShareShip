  "use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { fetchCategories } from "@/app/api/api";

export default function CategoriesDrop() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoryData = await fetchCategories();
      if (categoryData) {
        setCategories(categoryData);
      }
    };
    loadCategories();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div onClick={toggleDropdown}>
        <button>
          <ChevronDownIcon className="h-5" />
        </button>
      </div>
      {isDropdownOpen && (
        <div onMouseLeave={closeDropdown} className="absolute bg-white border rounded-md p-2 flex flex-col" style={{ width: '150px', height: 'auto' }}>
          {categories.map((category) => (
            <div key={category.id}>
              <Link href={`/category/${category.id}`}>{category.attributes.name}</Link> <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

