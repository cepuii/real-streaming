"use client";

import { getFolderInfo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { FolderProps } from "@/types/index.type";

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData(["folder-info"], () => getFolderInfo(folderId));

  const { data: folder } = data as FolderProps;

  return (
    <div className="flex items-center">
      <h2 className="text-[#bdbdbd] text-2xl">{folder.name}</h2>
      {/*<p className="">{folder._count.videos} videos</p>*/}
    </div>
  );
};

export default FolderInfo;
