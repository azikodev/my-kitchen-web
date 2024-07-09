import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { MdRestaurantMenu } from "react-icons/md";

function TodosList({ data }) {
  const { deleteTodo } = useFirestore();

  return (
    <>
      <div className="my-8 flex items-center gap-[10px] text-[25px] justify-center">
        <span>Retseptlar ro'yhati</span> <MdRestaurantMenu />
      </div>
      {data && data.length > 0 ? (
        <div>
          <h2>Cardlar royhati</h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-24">
            {data.map((todo) => {
              return (
                <div
                  key={todo.id}
                  className="card bg-base-100 w-96 shadow-xl border-2 flex items-center max-w-[250px] px-[24px] py-[8px]"
                >
                  <h3>{todo.title}</h3>
                  <p>{todo.time}</p>
                  <p>{todo.ingredient}</p>
                  <p>{todo.img}</p>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-sm btn-primary"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            <Link to="/create" className="my-8">
              <button className=" btn btn-secondary bg-[green] border-none">Create todos  </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h2>Card yoq</h2>
          <Link to="/create" className="my-8">
            <button className=" btn btn-secondary bg-[green] border-none">Create todos  </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default TodosList;
