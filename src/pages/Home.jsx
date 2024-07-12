//rrd imports
import { Link } from "react-router-dom";

//custom hooks
import { useCollection } from "../hooks/useCollection";

//redux
import { useSelector } from "react-redux";

//componenets
import { TodosList } from "../components";

//react icons
import { BiLayerPlus } from "react-icons/bi";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid], ['createdAt']);

  return (
    <div className="flex items-center flex-col justify-start">
      {data && data.length === 0 ? (
        <div className="text-center my-8">
          <p className="text-3xl">Hali retsept yaratmadingiz :(</p>
          <Link
            to="/create"
            className=" mx-auto md:mx-auto mt-[20px] xl:w-96 w-80 md:w-96 lg:md:w-96  min-h-[440px] flex items-center justify-center card bg-base-100  shadow-xl border-2 pt-[14px] rounded-[24px] h-full"
          >
            <button className="border-none flex items-center justify-center flex-col gap-5">
              <BiLayerPlus className="text-[54px]" />
              <p className="text-[20px]">Retsept qo'shish</p>
            </button>
          </Link>
        </div>
      ) : (
        <div>{data && <TodosList data={data} />}</div>
      )}
    </div>
  );
}

export default Home;
