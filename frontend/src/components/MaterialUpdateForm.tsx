import React, { useState } from 'react';
import { updateMaterial } from '@/app/api/api';
import { fetchCategories } from "@/app/api/api";
import { useEffect } from 'react';
import Modal from 'react-modal';

const MaterialUpdateForm = ({ materialData, onUpdateSuccess, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
const loadCategories = async () => {
    const categoryData = await fetchCategories();
    if (categoryData) {
    setCategories(categoryData);
    }
};
loadCategories();
}, []);

const [updatedMaterial, setUpdatedMaterial] = useState({
    id: materialData?.id || 0,
    title: materialData?.attributes.title || '',
    description: materialData?.attributes.description || '',
    amount: materialData?.attributes.amount || 0,
    available: materialData?.attributes.available || false,
    dayPrice: materialData?.attributes.dayPrice || 0,
    category: { data: { id: materialData?.attributes.category?.data?.id || 0 } },
});

const handleUpdate = async () => {
const updatedData = await updateMaterial(updatedMaterial);
if (updatedData) {
    onUpdateSuccess(updatedData);
    window.alert('Material updated successfully');
    window.location.reload();
} else {
    console.error('Failed to update material');
}
};

return (
    <form className=" flex gap-5 p-6 ">
        <div className='w-96'>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                type="text"
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                value={updatedMaterial.title}
                onChange={(e) => setUpdatedMaterial({ ...updatedMaterial, title: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input
                type="text"
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                value={updatedMaterial.description}
                onChange={(e) => setUpdatedMaterial({ ...updatedMaterial, description: e.target.value })}
                />
            </div>
            <div className="w-16 mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                <input
                type="number"
                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                value={updatedMaterial.amount}
                onChange={(e) => setUpdatedMaterial({ ...updatedMaterial, amount: parseInt(e.target.value) || 0 })}
                />
            </div>
        </div>
        <div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Day Price</label>
            <input
            type="number"
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            value={updatedMaterial.dayPrice}
            onChange={(e) => setUpdatedMaterial({ ...updatedMaterial, dayPrice: parseInt(e.target.value) || 0 })}
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <select
            value={updatedMaterial.category.data.id}
            onChange={(e) =>
                setUpdatedMaterial({ ...updatedMaterial, category: { data: { id: parseInt(e.target.value) } } })
            }
            className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            >
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.attributes.name}
                </option>
            ))}
            </select>
        </div>
        <div className="mb-2">
            <label className="flex items-center text-gray-700 text-sm font-bold">
            <input
                type="checkbox"
                className="mr-2 leading-tight"
                checked={updatedMaterial.available}
                onChange={(e) => setUpdatedMaterial({ ...updatedMaterial, available: e.target.checked })}
            />
            <span>Available</span>
            </label>
        </div>
        <div className="flex gap-1">
        <button
          type="button"
          className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-green"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      </div>
    </form>
  );
  
};

export default MaterialUpdateForm;
