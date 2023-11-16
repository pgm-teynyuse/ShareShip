"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchMaterial, updateMaterial } from '@/app/api/api';
import { CreateMaterialRequest } from '@/libs/queries/requests';
import { useSession } from "next-auth/react";
import MaterialUpdateForm from '@/components/MaterialUpdateForm'; 
import { useRouter } from 'next/navigation';


const MaterialDetailPage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [materialData, setMaterialData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const fetchMaterialData = async () => {
    try {
      const response = await fetchMaterial(params.id);

      setMaterialData(response.data.data);
      setIsOwner(response.data.data.attributes.owner.data.id === session?.id);
    } catch (error) {
      console.error('Material fetch failed', error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMaterialData();
      } catch (error) {
        console.error('Error fetching material data:', error);
        // Handle error, e.g., redirect to an error page
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [params.id, session]);
  
  // Render loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }


  const handleUpdateSuccess = (updatedData) => {
    setIsEditing(false);
    setMaterialData(updatedData);
  };

  return (
    <main className="m-4 p-4">
      <div className="flex flex-wrap bg-white  p-6 shadow-md">
        <div className="w-full mb-4 md:mb-0">
          <div className="relative w-80 h-80  mx-auto overflow-hidden">
            {materialData?.attributes.cover && (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${materialData?.attributes.cover.data.attributes.url}`}
                alt={materialData?.attributes.title}
                layout="fill"
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="">
          {isEditing ? (
            <MaterialUpdateForm
              materialData={materialData}
              onUpdateSuccess={handleUpdateSuccess}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <h1 className="text-4xl font-extrabold mb-2 text-black">{materialData?.attributes.title}</h1>
              <Link
                href={`/category/${materialData?.attributes.category.data.id}`}
                className="bg-cyan-500 px-3 py-1.5 text-sm  text-white dark:bg-white dark:text-white inline-block  mb-4"
              >
                {materialData?.attributes.category.data.attributes.name}
              </Link>
              <p className="text-gray-700 mb-4">{materialData?.attributes.description}</p>
              <p className={`text-${materialData?.attributes.available ? 'green' : 'red'}-600 font-medium mb-4`}>
                {materialData?.attributes.available ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="flex flex-wrap mb-4 space-x-4">
                <p className="text-gray-700">Amount: {materialData?.attributes.amount}</p>
                <p className="text-gray-700">Day Price: {materialData?.attributes.dayPrice}</p>
                <p className="text-gray-700">Seller: {materialData?.attributes.owner.data.attributes.username}</p>
              </div>
              <div className="flex space-x-4">
              {isOwner && (
                <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-5 py-2  focus:outline-none focus:shadow-outline-indigo"
                >
                  Edit
                </button>
                </>
              )}
                <button
                  type="button"
                  onClick={() => requestMaterial(materialData?.id)}
                  className="bg-cyan-700 hover:bg-cyan-900 text-white px-5 py-2  focus:outline-none focus:shadow-outline-indigo"
                >
                  Request Material
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
  
  
};

export default MaterialDetailPage;
