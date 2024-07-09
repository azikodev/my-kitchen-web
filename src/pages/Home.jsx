import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { TodosList } from "../components";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid], ['createdAt']);


  return (
    <div className="flex items-center flex-col justify-start">

      <div>{data && <TodosList data={data} />}</div>
    </div>
  );
}

export default Home;
