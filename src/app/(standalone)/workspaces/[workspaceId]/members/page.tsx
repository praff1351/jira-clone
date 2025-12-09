import { getCurrent } from "@/features/auth/queries";
import { Memberslist } from "@/features/workspaces/components/members-list";
import { redirect } from "next/navigation";

const WorkspaceIdMembersPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="w-full lg:max-w-xl">
      <Memberslist />
    </div>
  );
};

export default WorkspaceIdMembersPage;
