import { authOptions } from "@/libs/authOptions"
import { getServerSession } from "next-auth/next"
import UserCard from "@/components/UserCard"
import UserMenu from "@/components/UserMenu";
import { redirect } from "next/navigation"
import { fetchUser } from "@/app/api/api"

const page = async () => {
    const session = await getServerSession(authOptions)
    console.log("deze",session)

    const userProfile = fetchUser(session);
    console.log('userProfile:', userProfile);

    if (!userProfile) {
        return <h1>No user available</h1>;
    }


    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/profile')
    }


    console.log(session)

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session} pagetype="Profile" />
        </section>
    )

}

export default page;


