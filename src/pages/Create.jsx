//rrd imports
import { Form, useActionData } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//custom hooks
import { useFirestore } from "../hooks/useFirestore";

//components
import { FormInput } from "../components";

//hook
import { useEffect, useState } from "react";

//toast
import toast from "react-hot-toast";

//react icons
import { IoCreateOutline } from "react-icons/io5";


//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let time = formData.get("time");
  let ingredient = formData.get("ingredient");
  let img = formData.get("img");
  let method = formData.get("method");
  return {
    title,
    time,
    ingredient,
    img,
    method,
  };
};

function Create() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);

  const { addTodo } = useFirestore();
  const [masaliqlar2, setmasaliqlar2] = useState("")
  const [masaliqlar, setmasaliqlar] = useState([])

  useEffect(() => {
    if (userData) {
      const newTodo = {
        title: userData.title,
        time: userData.time,
        ingredient: userData.ingredient,
        img: userData.img,
        method: userData.method,
        uid: user.uid,
      };
      addTodo(newTodo);
    }
  }, [userData]);

  const [images2, setImages2] = useState([]);
  const [images, setImages] = useState("");
  const [Ingredients2, setIngredients2] = useState([]);
  const [Ingredients, setIngredients] = useState("");
  const [prise, setprise] = useState(0);

  useFirestore(Ingredients2, images2);

  const InputValue = () => {
    images2.push(images);
    Ingredients2.push(Ingredients);
  };
  const Toasteeror = () => {
    toast.error("Kamida 3ta masalliq kiriting");
  };
  return (
    <div className="flex justify-center h-[780px] my-14">
      <div>
        <h1 className="text-3xl text-center  flex items-center justify-center gap-4 mb-3"><span>Yangi retsept yaratish</span> <IoCreateOutline />
        </h1>
        <Form method="post" className="sm:w-[484px] w-872 mt-2 flex flex-col gap-[10px]">
          <div className="flex flex-col ">
            <FormInput
              required
              className="input input-bordered w-full h-11 block"
              type="text"
              placeholder="Osh"
              name="title"
              label="Retsept nomi"
            />
          </div>
          <div >
            <FormInput
              required
              className="input input-bordered w-full h-11 block"
              type="number"
              placeholder="Tayyor bo'ladigan vaqt"
              name="time"
              label="Tayyor bo'ladigan vaqt"
              min="2"
              max="3600"
            />
          </div>
          <div>
            <label htmlFor="nation" >
              <div className="label">
                <span className="label-text capitalize">Turni tanlang:</span>
              </div>
              <select name="nation" className="select select-bordered  w-full">
                <option>Uzbek</option>
                <option>Turky</option>
                <option>Russia</option>
                <option>Outher</option>
                <option>Europa</option>
              </select>
            </label>
          </div>
          <div>
            <h3>Masalliqlar</h3>
            <div className="flex items-center gap-2">
              <input
                required
                className="input input-bordered w-full h-11 block"
                type="text"
                placeholder="Guruch, suv, tuz, go'sht"
                name="Ingredients"
                min="3"
                value={Ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <input
                required
                type="button"
                className="btn btn-accent rounded-xl w-14"
                value="+"
                onClick={() => {
                  Ingredients2.push(Ingredients), setIngredients("");
                }}
              />
            </div>
            <h3 className="flex items-center gap-2 mt-[10px]">
              Masalliqlar:
              <span className=" flex text-sm ">
                {Ingredients2.length == 0 ? (
                  <h2 className="border-2 p-1 text-sm rounded-full">
                    Kiritilgan masalliqlar yo'q
                  </h2>
                ) : (
                  <ul className="flex items-center gap-2">
                    {Ingredients2.map((Ingredient) => {
                      return (
                        <li
                          key={Ingredient}
                          className="relative flex items-center"
                        >
                          <div className="w-10 truncate">{Ingredient}</div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </span>
            </h3>
          </div>
          <div>
            <h3>Rasm manzili</h3>
            <div className="flex items-center gap-2">
              <input
                required
                className="input input-bordered w-full h-11 block"
                type="url"
                placeholder="Enter image URL"
                name="images"
                min="13"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              // label="Rasm manzili:"
              />
              <input
                className="btn btn-accent rounded-xl w-14"
                onClick={() => {
                  images2.push(images), setImages("");
                }}
                type="button"
                value="+"
              />
            </div>
            <div className="mt-[12px]">
              <h3 className="flex items-center gap-2">
                Rasmlar:
                <span className=" flex text-sm">
                  {images2.length == 0 ? (
                    <h2 className="border-2 p-1 text-sm rounded-full">
                      Kiritilgan suratlar yo'q
                    </h2>
                  ) : (
                    <ul className="flex items-center gap-2">
                      {images2.map((img) => {
                        return (
                          <li key={img} className="relative flex items-center">
                            <img className="w-20 rounded-md" src={img} alt="" />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </span>
              </h3>
            </div>
          </div>
          <div>
            <h3 className="text-lg">
              Narxi:
              <input
                required
                type="number"
                className="w-[45px] max-w-[100px] "
                onChange={(e) => setprise(e.target.value)}
                value={prise}
                max="10000"
              />
              000 so'm
            </h3>
            <div className="flex items-center gap-2">
              <input
                required
                className="border w-full border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="range"
                name="prise"
                min="1"
                max="10000"
                onChange={(e) => setprise(e.target.value)}
                value={prise}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg">Method:</h3>
            <textarea
              required
              className="border w-full border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block mt-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Method"
              cols="30"
              rows="5"
              minLength="50"
              placeholder="Enter method of meal"
            ></textarea>
          </div>
          <label className="grid grid-cols-2 gap-5 mt-2">
            {Ingredients2.length >= 3 && images2.length >= 3 ? (
              <button onClick={() => InputValue()} className="btn btn-accent">
                Yaratish
              </button>
            ) : (
              <input
                className="btn btn-accent"
                type="button"
                onClick={() => Toasteeror()}
                value="Yaratish"
              />
            )}
            <button className="btn btn-success">Ko'rib chiqish</button>
          </label>
        </Form>
      </div>
    </div>
  );
}

export default Create;
