import { AuthLayout } from "@app/layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <div>Home</div>;
};

Home.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Home;
