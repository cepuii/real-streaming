import { getWixContent } from "@/actions/cms";

type Props = {};

const Home = async (props: Props) => {
  const video = await getWixContent();

  return <div>HomePage</div>;
};

export default Home;
