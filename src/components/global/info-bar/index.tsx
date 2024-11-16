import VideoRecorderIcon from "@/components/icons/video-recorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Search, UploadIcon } from "lucide-react";

type Props = {};
//TODO implement useSearch hook for this input
const InfoBar = (props: Props) => {
  return (
    <header className="pl-20 md:pl-[256px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search size={25} className="text-[#707070]" />
        <Input
          className="bg-transparent border-none"
          placeholder="Search for people, projects, tags and folders"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button className="bg-[#9d9d9d] flex items-center gap-2">
          <UploadIcon size={20} />{" "}
          <span className="flex items-center gap-2">Upload</span>
        </Button>
        <Button className="bg-[#9d9d9d] flex items-center gap-2">
          <VideoRecorderIcon />{" "}
          <span className="flex items-center gap-2">Record</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;