"use client"
import React from 'react';
import { useSession } from "next-auth/react";
import { useState } from "react";
import { deleteRequest } from '@/libs/queries/requests'
import Link from 'next/link'

const RequestCard = (request: RentRequest) => {
  const { data: session } = useSession();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteRequest(request.id);
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="flex justify-between w-full items-center  bg-white p-6 rounded-lg shadow-md">
      <div className="w-24">
      <Link href={`/materials/${request.attributes.material.data.id}`}>
      <p className="text-xl font-bold">{request.attributes.material.data.attributes.title}</p>
      </Link>
      <p>{request.attributes.material.data.attributes.owner.data.attributes.username}</p>
      </div>
      <div>
        <span className="font-semibold text-gray-800">Status:</span> {request.attributes.status}
      </div>
      <>
        <button
          onClick={openDeleteModal}
          className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 dark:bg-red-100 dark:hover-bg-red-700 dark:focus:ring-red-800"
        >
          <p>Delete</p>
        </button>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
    </div>
  );
  
  
}

export default RequestCard;