"use client";

import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideo";
import { Send } from "lucide-react";

type Props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
};

const CommentForm = ({ author, videoId, close, commentId }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  );

  return (
    <form className="relative w-full" onSubmit={onFormSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="textarea"
        lines={5}
        type="text"
      />
      <Button
        className="p-0 absolute cursor-pointer text-white/50 bg-transparent bottom-2 right-3 hover:bg-transparent hover:text-white/80"
        type="submit"
      >
        <Loader state={isPending}>
          <Send size={18} />
        </Loader>
      </Button>
    </form>
  );
};

export default CommentForm;
