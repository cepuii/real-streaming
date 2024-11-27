"use client";

import { getWorkspaceFolders } from "@/actions/workspace";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useMutationDataState } from "@/hooks/useMutationData";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Folder from "./folder";

type Props = { workspaceId: string };

export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: Props) => {
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVariables } = useMutationDataState(["create-folder"]);

  const { data: folders, status } = data as FoldersProps;

  //if (isFetched && folders) {
  //WIP: add redux stuff for folders
  //}
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#bdbdbd]">See all</p>
          <ArrowRight color="#bdbdbd" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
              />
            )}
            {folders.map(({ name, _count, id }) => (
              <Folder key={id} name={name} count={_count.videos} id={id} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
