import FormGenerator from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { useEditVideo } from "@/hooks/useEditVideo";

type Props = {
  videoId: string;
  title: string;
  description: string;
};

const EditVideoForm = ({ description, title, videoId }: Props) => {
  const { errors, isPending, onFormSubmit, register } = useEditVideo(
    description,
    title,
    videoId
  );

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
      <FormGenerator
        register={register}
        errors={errors}
        name="title"
        inputType="input"
        type="text"
        placeholder="Video title..."
        label="Title"
      />
      <FormGenerator
        register={register}
        errors={errors}
        name="description"
        inputType="textarea"
        type="text"
        placeholder="Video description..."
        label="Description"
        lines={5}
      />
      <Button>Update</Button>
    </form>
  );
};

export default EditVideoForm;
