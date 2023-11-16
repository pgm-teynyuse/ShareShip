"use client";
import React from "react";
import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { deleteMaterial } from "@/app/api/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ProductCard = (product: Material) => {
  const { data: session } = useSession();
  const isOwner = session && session?.id == product.attributes.owner.data.id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteMaterial(product.id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Card className="w-60 hover:bg-gray-100">
      <div className="relative h-40">
        {product.attributes.cover && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.attributes.cover.data.attributes.url}`}
            alt={product.attributes.title}
            fill
          />
        )}
      </div>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.attributes.title}
        </h5>
        <p>{product.attributes.available ? "In Stock" : "Out of Stock"}</p>
      <div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
          {product.attributes.description}
        </span>
      </div>
      <div className="mb-0 mt-0 flex gap-1 items-left">
        <Link
          href={`/category/${product.attributes.category.data.id}`}
          className="ml-0 mr-1 bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800"
        >
          {product.attributes.category.data.attributes.name}
        </Link>
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          {product.attributes.dayPrice}€
        </span>
      </div>
      <div className="flex items-center justify-between">
      <div>
        <Link href={`/materials/${product.id}`}>
          <button className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-100 dark:hover-bg-cyan-700 dark:focus:ring-cyan-800">
            <p>View</p>
          </button>
        </Link>
        {isOwner && (
          <>
            <button
              onClick={openDeleteModal}
              className="ml-2 rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 dark:bg-red-100 dark:hover-bg-red-700 dark:focus:ring-red-800"
            >
              <p>Delete</p>
            </button>
            {showDeleteModal && (
              <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded">
                  <p>Are you sure you want to delete this material?</p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-700 text-white px-4 py-2 rounded mr-2"
                      onClick={handleDelete}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                      onClick={closeDeleteModal}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
          {product.attributes.owner.data.attributes.username}
        </span>
      </div>
    </Card>
  );
};

export default ProductCard;
