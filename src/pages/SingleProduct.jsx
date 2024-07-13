import React, { useState } from "react";

// custom hooks
import { useCollection } from "../hooks/useCollection";

//redux
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addProduct } from "../app/cartSlice";

//react icons
import { GiHotMeal } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { IoPricetagsSharp } from "react-icons/io5";
import { MdOutlineHomeWork } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";

//react hot toast
import { Toaster, toast } from "sonner";

function SingleProduct() {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);
  const product = data?.find((item) => item.id === params.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productAmount, setProductAmount] = useState(1);

  const setAmount = (type) => {
    if (type === "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type === "increase") {
      setProductAmount((prev) => prev + 1);
    }
  };

  const addToBag = () => {
    const newProduct = {
      ...product,
      amount: productAmount,
    };

    dispatch(addProduct(newProduct));
    toast.success(<div>{productAmount} ta taom savatchaga qo'shildi</div>);
    navigate("/trash");
  };

  return (
    <div>
      {product ? (
        <div className="max-container mt-8">
          <div className="text-3xl font-[700] flex items-center gap-3">
            <p>Retsept haqida to'liq ma'lumot</p>
            <RiFileEditLine />
          </div>
          <div className="card shadow-xl p-8 border-[2px] mt-12">
            <div className="grid lg:grid-cols-2 items-center">
              <div>
                <img src={product.imageURL} alt={product.title} className="w-[470px] h-[270px] object-cover rounded-[25px]" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <GiHotMeal className="text-[32px]" />
                    <span>Taom nomi:</span>
                  </div>
                  <span className="font-[600] text-info text-xl">{product.title}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <MdOutlineTimer className="text-[32px]" />
                    <span>Tayyorlanadigan vaqt:</span>
                  </div>
                  <span className="font-[600] text-success text-xl">{product.time} daqiqa</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <IoPricetagsSharp className="text-[32px]" />
                    <span>Taom narxi:</span>
                  </div>
                  <span className="font-[600] text-warning text-xl">{product.price} so'm</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <GiHotMeal className="text-[32px]" />
                    <span>Ishlatiladigan masalliqlar:</span>
                  </div>
                  <span className="font-[600] text-primary text-xl">{product.ingredients}</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-[#826767] text-[18px] leading-8">{product.method}</p>
            <div className="flex justify-between mt-12">
              <div>
                <Link to="/" className="btn btn-accent ">
                  <button className="flex gap-2 items-center">
                    <MdOutlineHomeWork className="text-[20px]" />
                    <p className="">Asosiy sahifaga qaytish</p>
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-2 sm:mb-0 mb-10">
                <button
                  onClick={() => setAmount("decrease")}
                  className="btn btn-secondary"
                  disabled={productAmount === 1}
                >
                  -
                </button>
                <h3>{productAmount}</h3>
                <button
                  onClick={() => setAmount("increase")}
                  className="btn btn-secondary"
                >
                  +
                </button>
                <button onClick={addToBag} className="btn btn-primary flex items-center gap-3">
                  Sotib olish
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Yuklanmoqda iltimos kuting...</p>
      )}
    </div>
  );
}

export default SingleProduct;
