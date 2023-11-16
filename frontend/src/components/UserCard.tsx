import Image from "next/image"

type Avatar = {
    data: {
    attributes: {
    url?: string | null | undefined;
    };
};
};

type User = {
username?: string | null | undefined;
email?: string | null | undefined;
avatar?: Avatar | null | undefined; // Update this line
} | undefined;

type Props = {
user: User;
pagetype: string;
};

export default function UserCard({ user, pagetype }: Props) {
    const card = user?.username ? (
      <div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
          Hello {user?.username}!
        </div>
        <div>
        </div>
      </div>
    ) : null;
  
    return <section className="flex flex-col gap-4">{card}</section>;
  }