import { getWixContent } from "@/actions/cms";
import VideoCard from "@/components/global/videos/video-card";

type Props = {};

const Home = async (props: Props) => {
  const videos = await getWixContent();
  return (
    <div className="grid grid-col1 lg:grid-cols-2 gap-5">
      {videos.status === 200
        ? videos.data?.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              workspaceId={video.workSpaceId!}
            />
          ))
        : ""}
    </div>
  );
};

export default Home;
