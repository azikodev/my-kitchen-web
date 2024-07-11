import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { changeAmount, removeAll, removeProduct } from "../app/userSlice";


import { MdRemoveShoppingCart } from "react-icons/md";

function Trash() {
  const { calculator } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [prises, setPrises] = useState(0);

  if (calculator.products.length === 0) {
    return (
      <div className="m-auto flex justify-center items-center h-full  max-container">
        <div className="flex  flex-col items-center justify-between h-[300px]">
          <h1 className="font-semibold text-[34px]">Savatda hech qanday retsept mavjud emas :(</h1>
          <div>
            <MdRemoveShoppingCart className="text-[90px]" />
          </div>
          <Link to="/">
            <button className="mt-[20px] text-white  btn btn-accent">
              Asosiy sahifaga qaytish
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-[1220px] m-auto p-4">
        <h1 className="text-[34px] font-semibold">Your Cart</h1>
        <ul>
          {calculator.products.map((product, index) => (
            <li key={index} className="flex justify-between items-center p-2 border-b border-gray-200">
              <div className="flex items-center">
                <img src={product.imageURL} alt={product.title} className="w-20 h-20 object-cover" />
                <div className="ml-4">
                  <h2 className="text-[20px] font-semibold">{product.title}</h2>
                  <p className="text-[16px] text-[#807D7E]">{product.price} so'm</p>
                  <p className="text-[16px] text-[#807D7E]">{product.method.slice(0, 100)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={product.amount}
                  min="1"
                  onChange={(e) => dispatch(changeAmount({ id: product.id, amount: Number(e.target.value) }))}
                  className="w-[50px] text-center border border-gray-200 rounded-md"
                />
                <FaTrashAlt
                  className="ml-4 cursor-pointer text-red-500"
                  onClick={() => dispatch(removeProduct(product.id))}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => dispatch(removeAll())}
          >
            Clear Cart
          </button>
          <h2 className="text-[20px] font-semibold">Total: ${calculator.price}</h2>
        </div>
      </div>
    );
  }
}

export default Trash;
