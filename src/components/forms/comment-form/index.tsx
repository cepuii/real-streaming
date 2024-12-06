"use client";

import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideo";
import { Send } from "lucide-react";
import { FormEvent } from "react";

type Props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
  lines?: number;
};

const CommentForm = ({
  author,
  videoId,
  close,
  commentId,
  lines = 5,
}: Props) => {
  const { errors, isPending, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  );

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit();
    close?.();
  };

  return (
    <form className="relative w-full" onSubmit={formSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="textarea"
        lines={lines}
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
