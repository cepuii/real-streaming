import EditVideoForm from "@/components/forms/edit-video";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Modal from "../modal";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

//WIP change UX and make it the same as renaming folders

const EditVideo = ({ description, title, videoId }: Props) => {
  return (
    <Modal
      title="Edit video details"
      description="You can update your video details here!"
      trigger={
        <Button variant={"ghost"}>
          <Edit className="text-[#8c8b8b]" />
        </Button>
      }
    >
      <EditVideoForm
        description={description}
        title={title}
        videoId={videoId}
      />
    </Modal>
  );
};

export default EditVideo;
