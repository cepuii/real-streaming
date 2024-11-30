import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";
import { useState } from "react";

type Props = {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommendCard = ({
  author,
  comment,
  reply,
  videoId,
  commentId,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false);

  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1d1d1d] pl-10 border-none"
          : "border-[1px] bg-[#1d1d1d] p-5"
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src={author?.image as string} />
        </Avatar>
        <p className="capitalize text-sm text-[#bdbdbd]">
          {author.firstname} {author.lastname}
        </p>
      </div>
    </Card>
  );
};

export default CommendCard;
