import { fetchMaterialRequests } from "@/libs/queries/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import RequestCard from "@/components/RequestCard";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  const RentRequests = await fetchMaterialRequests(session.id);
  console.log(RentRequests);

  return (
    <main className="m-4 p-4">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
        Rent Requests
      </h1>
      <div className="flex flex-wrap gap-4">
        {RentRequests.map((request: RentRequest) => (
          <RequestCard key={request.id} {...request} />
        ))}
      </div>
    </main>
)
};

export default Page;