import { acceptInvite } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = { params: { inviteId: string } };
//TODO 10:01:01 / 16:53:09
const InvitePage = async ({ params: { inviteId } }: Props) => {
  const invite = await acceptInvite(inviteId);

  if (invite.status === 403) {
    return redirect("/");
  }

  if (invite.status === 401) {
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Not authorized</h2>
        <p>You are not authorized to accept this invite</p>
      </div>
    );
  }

  if (invite?.status === 200) return redirect("/auth/callback");
};

export default InvitePage;