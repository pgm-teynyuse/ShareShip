"use client";
import React, { useState, useEffect } from "react";
import { fetchMaterials } from "@/app/api/api";
import MaterialCard from "@/components/MaterialCard";

const MaterialSearch = () => {
const [materials, setMaterials] = useState([]);
const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
const fetchData = async () => {
    try {
    const materialsData = await fetchMaterials();
    setMaterials(materialsData);
    } catch (error) {
    console.error("Error fetching materials:", error);
    }
};

fetchData();
}, []);

// Filter materials based on the search query
const filteredMaterials = materials.filter((material) =>
material.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
<div className="mx-85">
    <div className="mb-6">
    <input
        type="text"
        placeholder="Search materials"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-100 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    />
    </div>

    <div className="flex justify-left flex-wrap gap-5">
    {filteredMaterials.map((product) => (
        <MaterialCard key={product.id} {...product} />
    ))}
    </div>
</div>
);
};

export default MaterialSearch;
