import CreateFolders from "@/components/global/create-folders";
import CreateWorkspace from "@/components/global/create-workspace";
import Folders from "@/components/global/folders";
import Videos from "@/components/global/videos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: { workspaceId: string };
};
//TODO 7:30:02 / 16:53:09
const Page = ({ params }: Props) => {
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="p-7[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="p-7[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkspace />
            <CreateFolders workspaceId={params.workspaceId} />
          </div>
        </div>
        <section>
          <TabsContent value="videos">
            <Folders workspaceId={params.workspaceId} />
            <Videos
              folderId={params.workspaceId}
              workspaceId={params.workspaceId}
              videosKey="user-videos"
            />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default Page;
