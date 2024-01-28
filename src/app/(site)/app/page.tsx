import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const user = await getServerSession(authOptions);

  return (
    <div>
      <p>Name - {user?.user?.name}</p>
    </div>
  );
};

export default Page;
