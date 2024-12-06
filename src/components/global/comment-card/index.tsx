"use client";

import CommentForm from "@/components/forms/comment-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";
import { useState } from "react";
//WIP: add reply to replies
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
        <Avatar className="w-5 h-6">
          <AvatarImage src={author?.image as string} />
        </Avatar>
        <p className="capitalize text-sm text-[#bdbdbd]">
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div>
        <p className="text-[#BDBDBD]">{comment}</p>
      </div>
      {!isReply && (
        <div className="flex justify-end mt-3">
          {!onReply ? (
            <Button
              onClick={() => setOnReply(true)}
              className="text-sm rounded-full bg-[#252525] text-white hover:text-black"
            >
              Reply
            </Button>
          ) : (
            <CommentForm
              close={() => setOnReply(false)}
              lines={1}
              videoId={videoId}
              commentId={commentId}
              author={author.firstname + " " + author.lastname}
            />
          )}
        </div>
      )}
      {reply.length > 0 && (
        <div className="flex flex-col gap-y-10 mt-5">
          {reply.map((r) => (
            <CommendCard
              key={r.id}
              isReply
              reply={[]}
              comment={r.comment}
              videoId={videoId}
              author={{
                image: r.User?.image!,
                firstname: r.User?.firstname!,
                lastname: r.User?.lastname!,
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommendCard;
