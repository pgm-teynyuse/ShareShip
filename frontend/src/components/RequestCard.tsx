"use client"
import React from 'react';
import { UpdateMaterialRequests } from '@/libs/queries/requests';


const RequestCard = (request: RentRequest, { handleUpdateRequest }: { handleUpdateRequest: (request: RentRequest) => void }) => {
  
  type Answer = "accepted" | "declined";

  const handleAcceptOrDecline = async (request: RentRequest, answer: Answer) => {
    const updatedRequest = await UpdateMaterialRequests(request, answer); 
    if (updatedRequest) {
      handleUpdateRequest(updatedRequest);
      window.location.reload();
    } else {
      console.error("Failed to update request");
    }
  };


  return (
    <div className="flex justify-between w-full items-center">
      <div className="w-40">
        <p className="text-xl font-bold">{request.attributes.material.data.attributes.title}</p>
        <p className="text-gray-700">From: {request.attributes.renter.data.attributes.username}</p>
      </div>
      <div className="w-24 text-left">
        <span className="outline text-cyan-700 px-4 py-2 rounded">{request.attributes.status}</span> 
      </div>
      {request.attributes.status !== 'accepted' && (
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-600 transition duration-300"
            onClick={() => handleAcceptOrDecline(request, 'accepted')}
          >
            Accept
          </button>
          {request.attributes.status !== 'declined' && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-600 transition duration-300"
              onClick={() => handleAcceptOrDecline(request, 'declined')}
            >
              Decline
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RequestCard;