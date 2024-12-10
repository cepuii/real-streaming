import { Spinner } from "@/components/global/loader/spinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
