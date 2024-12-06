import { getVideoComments } from "@/actions/user";
import CommentForm from "@/components/forms/comment-form";
import { TabsContent } from "@/components/ui/tabs";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoCommentProps } from "@/types/index.type";
import CommendCard from "../comment-card";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQueryData(["video-comments"], () =>
    getVideoComments(videoId)
  );

  const { data: comments } = data as VideoCommentProps;

  return (
    <TabsContent value="Activity">
      <CommentForm author={author} videoId={videoId} />
      {comments.map((comment) => (
        <CommendCard
          key={comment.id}
          comment={comment.comment}
          author={{
            image: comment.User?.image!,
            firstname: comment.User?.firstname!,
            lastname: comment.User?.lastname!,
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
        />
      ))}
    </TabsContent>
  );
};

export default Activities;
