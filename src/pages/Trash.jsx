import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { removeAll, removeProduct, changeAmount } from "../app/cartSlice";

//rrd imports
import { Link } from "react-router-dom";

//react icons
import { FaTrashAlt } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoHome } from "react-icons/io5";

function Trash() {
  const { calculator } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = calculator.products.reduce((sum, product) => sum + (product.price * product.amount), 0);
    setTotalPrice(total);
  }, [calculator.products]);

  if (calculator.products.length === 0) {
    return (
      <div className="m-auto flex justify-center items-center h-full max-container">
        <div className="flex flex-col items-center justify-between h-[300px]">
          <div className="flex items-center gap-4 font-semibold text-[34px]">
            <span>Savatda hech qanday retsept mavjud emas</span>
            <MdRemoveShoppingCart />
          </div>
          <img src="https://uzum.uz/static/img/shopocat.490a4a1.png" className="w-[150px]" alt="Empty Cart" />
          <p>Bosh sahifadagi retseptlardan harid qilishni boshlang</p>
          <Link to="/">
            <button className="mt-[20px] text-white btn btn-info">
              <p>Bosh sahifa</p>
              <IoHome />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1220px] m-auto p-4">
      <div>
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
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        changeAmount({
                          id: product.id,
                          type: "decrease",
                        })
                      )
                    }
                    className="btn btn-primary"
                    disabled={product.amount === 1}
                  >
                    -
                  </button>
                  <h3>{product.amount}</h3>
                  <button
                    onClick={() =>
                      dispatch(
                        changeAmount({
                          id: product.id,
                          type: "increase",
                        })
                      )
                    }
                    className="btn btn-primary"
                  >
                    +
                  </button>
                </div>
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
            Savatni tozalash
          </button>
          <h2 className="text-[20px] font-semibold">Umumiy qiymat: {totalPrice.toLocaleString()} so'm</h2>
        </div>
      </div>
    </div>
  );
}

export default Trash;
