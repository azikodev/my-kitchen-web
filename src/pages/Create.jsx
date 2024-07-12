//rrd imports
import { Form, useActionData } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//firebase
import { useFirestore } from "../hooks/useFirestore";

//components
import { FormInput } from "../components";

//react + hooks
import { useEffect } from "react";


//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let time = formData.get("time");
  let ingredients = formData.get("ingredients");
  let imageURL = formData.get("imageURL");
  let method = formData.get("method");
  let price = formData.get("price");
  return { title, time, ingredients, imageURL, method, price };
};

const onlyNumbers = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

function Create() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);
  const { addTodo } = useFirestore();

  useEffect(() => {
    if (userData) {
      const newTodo = {
        title: userData.title,
        time: userData.time,
        ingredients: userData.ingredients,
        imageURL: userData.imageURL,
        method: userData.method,
        price: userData.price,
        uid: user.uid,
      };
      addTodo(newTodo);
    }
  }, [userData]);

  return (
    <div className="max-container w-[1200px]">
      <div className="w-[550px] p-8 m-auto">
        <Form method="post" className="flex flex-col items-center gap-2 w-[550px]">
          <h2 className="text-3xl font-semibold">Yangi retsept yaratish</h2>
          <FormInput required="required" name="title" type="text" label="Retsept nomi" size="100%" placeholder="Osh" />
          <div className="flex justify-between w-[550px]">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Tayyor boladigan vaqt</span>
              </div>
              <input required placeholder="60" className="input input-bordered w-[270px] input-select-num" name="time" type="number" label="Tayyor bo'ladigan vaqt(m)" onInput={onlyNumbers} />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Narxi(so'm)</span>
              </div>
              <input required placeholder="25000 so'm" className="input input-bordered w-[270px] input-select-num" name="price" type="number" label="Tayyor bo'ladigan vaqt(m)" onInput={onlyNumbers} />
            </label>          </div>
          <FormInput required="required" name="ingredients" type="text" label="Masalliqlar" size="100%" placeholder="Go'sht, tuz, guruch ..." />
          <FormInput required="required" name="imageURL" type="text" label="Rasm URL" size="100%" placeholder="https://picsum.photos/250" />
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Tayyorlash ketma ketligi</span>
            </div>
            <textarea required name="method" type="textarea" label="Tayyorlash usuli" className="textarea mt-2 textarea-bordered textarea-sm  max-w-xl w-full" placeholder="2kg go'shtni qovuring va ...." />
          </label>
          <div className="flex justify-between items-center w-full mt-6">
            <button type="submit" className="btn btn-primary">
              Yaratish
            </button>
            <button type="submit" className="btn btn-primary">
              Ko'rib chiqish
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Create;
