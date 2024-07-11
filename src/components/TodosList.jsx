//rrd imports
import { Link } from "react-router-dom";

//firebase
import { useFirestore } from "../hooks/useFirestore";

//react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiLayerPlus } from "react-icons/bi";
import { PiTimerBold } from "react-icons/pi";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";


function TodosList({ data }) {
  const { deleteTodo } = useFirestore();

  return (
    <>
      <div className="max-container grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 content-center items-center justify- gap-24 mx-auto w-full mt-[40px]">
        {data &&
          data.map((todo) => {
            return (
              <div
                key={todo.id}
                className="relative z-0  card bg-base-100 xl:w-96 md:w-80 shadow-xl border-2 flex items-center pt-[34px] rounded-[24px] h-full justify-between"
              >
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="absolute z-50 bg-red-400 p-2 rounded-t-[18px] rounded-b-[18px] w-[40px] flex justify-center right-3 top-3"
                >
                  <RiDeleteBin5Line className="text-[15px] text-white text-center" />
                </button>
                <Link to={`/recipe/${todo.id}`} key={todo.id}>
                  <div className="px-[30px]">
                    <h3 className="card-title text-[25px] text-bold mb-[10px]">
                      {todo.title}
                    </h3>

                    <p>{todo.method ? `${todo.method.slice(0, 120)} ...` : 'Hech qanday malumot kiritilmagan'}</p>
                    <p className="mt-[30px] flex items-center">
                      <GiMeal />
                      <span className="ml-[5px] font-[700] mr-[2px]">Masalliqlar: </span>{todo.ingredients}
                    </p>
                    <div className="mt-[18px] flex justify-between items-center mb-[32px]">
                      <div className="flex items-center gap-1">
                        <PiTimerBold className="font-[900] text-[15px]" />
                        <div>
                          <span className="font-[900]">Vaqt:</span>
                          <span className="font-[600] text-[15px]">{todo.time} daqiqa</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <IoPricetagsOutline className="font-[900] text-[15px]" />
                        <div>
                          <span className="font-[900]">Narx:</span>
                          <span className="font-[600] text-[15px]">{todo.price} so'm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src={todo.imageURL} alt={todo.title} className="rounded-b-[14px] flex h-[250px] w-full object-cover" />
                </Link>
              </div>
            );
          })}
        <Link
          to="/create"
          className="xl:w-96 md:w-80 min-h-[440px] flex items-center justify-center card bg-base-100  shadow-xl border-2 pt-[14px] rounded-[24px] h-full"
        >
          <button className="border-none flex items-center justify-center flex-col gap-5">
            <BiLayerPlus className="text-[54px]" />
            <p className="text-[20px]">Retsept qo'shish</p>
          </button>
        </Link>
      </div >
    </>
  );
}
export default TodosList;
