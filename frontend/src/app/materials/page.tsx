import React from "react";
import MaterialSearch from "@/components/MaterialSearch";

const MaterialsPage = () => {
  return (
    <main className="m-4 p-4">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
        Materials
      </h1>
      <MaterialSearch />
    </main>
  );
};

export default MaterialsPage;
