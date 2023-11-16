import { useSession } from "next-auth/react";
import { fetchUserMaterial } from "../../api/api";
import MaterialCard from "@/components/MaterialCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  const userMaterial = await fetchUserMaterial(session.id);
  console.log('userMaterial:', userMaterial);
  if (!userMaterial) {
    return <h1>No materials available</h1>;
  }

  return (
    <main className="m-4 p-4">
      <div className="flex gap-1 mb-4">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
        My Materials
      </h1>
      <Link  href="mymaterials/new" className="uppercase py-2 px-4 rounded-lg bg-cyan-700 text-center text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-100 dark:hover-bg-cyan-700 dark:focus:ring-cyan-800">Add New Material</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {userMaterial.map((product: Material) => (
          <MaterialCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
};

export default page;
