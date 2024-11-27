"use client";

import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";

type Props = { workspaceId: string };

const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);
  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1d1d1d] text-[#707070] flex items-center gap-2 p-4 rounded-2xl"
    >
      <FolderPlusDuotine />
      Create a Folder
    </Button>
  );
};

export default CreateFolders;
