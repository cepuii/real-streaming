import ChangeVideoLocation from "@/components/forms/change-video-location";
import { Move } from "lucide-react";
import Modal from "../modal";

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      description="This action move video into definite place"
      title="Move to new Workspace/Folder"
      trigger={<Move size={20} fill="#a4a4a4" className="text-[#a4a4a4]" />}
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentWorkspace={currentWorkspace}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default CardMenu;
