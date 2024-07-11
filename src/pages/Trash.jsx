import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { changeAmount, removeAll, removeProduct } from "../app/userSlice";

function Trash() {
  const { calculator } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [prises, setPrises] = useState(0);

  if (calculator.products.length === 0) {
    return (
      <div className="m-auto flex justify-center items-center h-[500px] max-w-[1220px]">
        <div className="flex flex-col text-center justify-center items-center">
          <img src="" alt="" />
          <h1 className="font-semibold text-[34px]">Your cart is empty and sad :(</h1>
          <p className="text-[16px] font-normal text-[#807D7E]">Add something to make it happy!</p>
          <Link to="/">
            <button className="mt-[50px] text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 font-bold w-[250px] h-[61px] bg-[#8A33FD] rounded-[8px]">
              Continue Shopping
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
                  <p className="text-[16px] text-[#807D7E]">{product.method.slice(0,100)}</p>
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
          <h2 className="text-[20px] font-semibold">Total: ${calculator.totalPrice}</h2>
        </div>
      </div>
    );
  }
}

export default Trash;
