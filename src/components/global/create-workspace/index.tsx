"use client";

import { getWorkSpaces } from "@/actions/workspace";
import WorkspaceForm from "@/components/forms/workspace-form";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import { Button } from "@/components/ui/button";
import { useQueryData } from "@/hooks/useQueryData";
import Modal from "../modal";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = useQueryData(["user-workspaces"], getWorkSpaces);

  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

  if (plan.subscription?.plan === "PRO")
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share video in private with yourself"
        trigger={
          <Button className="bg-[#1d1d1d] text-[#707070] flex items-center gap-2 p-4 rounded-2xl">
            <FolderPlusDuotine />
            Create Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );

  return <></>;
};

export default CreateWorkspace;
