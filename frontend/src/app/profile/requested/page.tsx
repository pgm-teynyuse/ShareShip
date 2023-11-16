import { fetchUserRequests } from "@/libs/queries/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import UserRequests from "@/components/UserRequests";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  const RentRequests = await fetchUserRequests(session.id);
  console.log(RentRequests);

  return (
    <main className="m-4 p-4">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
        Requested
      </h1>
      <div className="flex flex-wrap gap-4">
        {RentRequests.map((request: RentRequest) => (
          <UserRequests key={request.id} {...request} />
        ))}
      </div>
    </main>
)
};

export default Page;