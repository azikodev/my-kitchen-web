import React, { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct } from "../app/userSlice";

import { GiHotMeal } from "react-icons/gi";
import { MdOutlineTimer } from "react-icons/md";
import { IoPricetagsSharp } from "react-icons/io5";
import { MdOutlineSetMeal } from "react-icons/md";





function SingleProduct() {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);
  const product = data?.find((item) => item.id === params.id);
  const dispatch = useDispatch();

  const [productAmount, setProductAmount] = useState(1);



  return (
    <div>
      {product ? (
        <div className="max-container mt-8">
          <h2 className="text-3xl font-[700]">Retsept haqida to'liq ma'lumot</h2>
          <div className="card shadow-xl p-8 border-[2px] mt-12">
            <div className="grid lg:grid-cols-2 items-center">
              <div>
                <img src={product.imageURL} alt={product.title} className="w-[470px] h-[270px] object-cover rounded-[25px]" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <GiHotMeal className="text-[32px]" />
                    <span>Taom nomi:</span></div>
                  <span className="font-[600] text-info text-xl">{product.title}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <MdOutlineTimer className="text-[32px]" />
                    <span>Tayyorlanadigan vaqt:</span></div>
                  <span className="font-[600] text-success text-xl">{product.time} daqiqa</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <IoPricetagsSharp className="text-[32px]" />
                    <span>Taom narxi:</span></div>
                  <span className="font-[600] text-warning text-xl">{product.price} so'm</span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-[20px] flex gap-4 items-center">
                    <GiHotMeal className="text-[32px]" />
                    <span>Ishlatiladigan masalliqlar:</span></div>
                  <span className="font-[600] text-primary text-xl">{product.ingredients}</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-[#826767] text-[18px] leading-8">{product.method}</p>
          </div>
        </div>
      ) : (
        <p>Yuklanmoqda iltimos kuting...</p>
      )}
    </div>
  );
}

export default SingleProduct;
