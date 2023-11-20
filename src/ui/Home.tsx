import { useSelector } from "react-redux";

import CreateUser from "../features/user/CreateUser";
import { RootState } from "../store/store";

import Button from "./Button";

function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold  ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <>
          <p className="pb-4">
            Welcome back, <span className="uppercase">{username}</span>
          </p>
          <Button type="button" to="/menu">
            Go to menu
          </Button>
        </>
      )}
    </div>
  );
}

export default Home;
