"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useFolders";

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkspace,
}: Props) => {
  //WIP: wire up the use move folder
  const {
    errors,
    folders,
    isFetching,
    isFolders,
    isPending,
    onFormSubmit,
    register,
    workspaces,
  } = useMoveVideos(videoId, currentWorkspace!);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((w) => w.id === currentWorkspace);

  return (
    <form className="flex flex-col gap-y-5">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
        <p className="text-[#a4a4a4]">Workspace</p>
        <p className="text-[#a4a4a4] text-sm">This video has no folder</p>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-sm text-[#a4a4a4]">To</h2>
        <Label className="flex flex-col gap-y-2">
          <p className="text-sm">Workspace</p>
          <select className="rounded-xl text-base bg-transparent">
            <option value="something" className="text-[#a4a4a4]">
              workspace
            </option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
