import { fetchCategory } from "@/app/api/api";
import MaterialCard from "@/components/MaterialCard";
import React from "react";

const CategoryPage = async ({ params }: { params: { id: number } }) => {
  const categoryData = await fetchCategory(params.id);

  if (!categoryData) {
    return <div>Error loading category data</div>;
  }

  
  return (
    <main className="m-4 p-4">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            {categoryData.attributes.name}
          </h1>
          <div className="flex flex-wrap gap-4"> {/* Voeg een wat grotere ruimte (gap) tussen kaartjes toe */}
              {categoryData.attributes.materials.data.map((product: Material) => (
                  <MaterialCard key={product.id} {...product} />
              ))}
          </div>
    </main>
  );
};

export default CategoryPage;
