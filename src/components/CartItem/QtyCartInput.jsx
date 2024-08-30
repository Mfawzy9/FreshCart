import React, { useContext, useState } from "react";

import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import * as bootstrapIcons from "react-icons/bs"; //bootstrap icons
import { CartContext } from "../../Context/CartContext/CartContext";
import { Bounce, toast } from "react-toastify";

export default function QtyCartInput(product) {
  const { updateProductQuantity } = useContext(CartContext);
  const [count, setCount] = useState(product?.product?.count);

  const [qtyLoading, setQtyLoading] = useState(false);

  const errorToast = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  //update Count
  async function updateCount(productId, count) {
    setQtyLoading(true);
    const response = await updateProductQuantity(productId, count);
    setQtyLoading(false);
  }

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          product?.product?.count == count
            ? toast.error(`it's already ${count} !`, errorToast)
            : count <= 0
            ? toast.error("Enter a logical number 😠!", errorToast)
            : updateCount(product?.product?.product?.id, count);
        }}
        className="flex items-center gap-3"
      >
        <h4 className="text-sm  font-semibold">Qty:</h4>
        <div className="flex items-center max-w-[8rem]">
          <button
            type="button"
            disabled={count <= 1}
            onClick={(e) => setCount(count - 1)}
            id="decrement-button"
            className="flex items-center disabled:cursor-not-allowed disabled:dark:bg-slate-600 disabled:dark:hover:bg-slate-600 disabled:bg-gray-300 bg-gray-100 hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-blue-700 dark:border-gray-600 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none "
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            onKeyDown={(e) => {
              e.key === "0" && count === "" ? e.preventDefault() : null;
            }}
            onChange={(e) => setCount(e.target.value)}
            type="number"
            value={count}
            id="quantity-input"
            inputMode="numeric"
            className=" bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="button"
            onClick={(e) => setCount(count + 1)}
            id="increment-button"
            className="flex items-center disabled:cursor-not-allowed disabled:dark:bg-slate-600 disabled:dark:hover:bg-slate-600 disabled:bg-gray-300 bg-gray-100 hover:bg-blue-700 dark:bg-slate-700 dark:hover:bg-blue-700 dark:border-gray-600 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none "
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        <button
          disabled={qtyLoading}
          type="submit"
          className="disabled:cursor-not-allowed disabled:bg-blue-800 group relative bg-blue-700 inline-flex items-center justify-center p-0.5  text-sm font-medium text-white rounded-lg group hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
        >
          <span className="absolute -top-2 -right-2 justify-center items-center flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-800 dark:bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-800 dark:bg-white" />
          </span>
          <span className="relative px-3 py-2 transition-all ease-in duration-200  rounded-md ">
            {qtyLoading ? (
              <fontAwesome.FaSpinner className="animate-spin" />
            ) : (
              <bootstrapIcons.BsFillCartCheckFill className="text-2xl" />
            )}
          </span>
          <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
            <div className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
              <div className=" bg-gray-700  py-2 px-2.5 rounded-md">
                <p className="whitespace-nowrap text-white">Save Quantity</p>
              </div>
              <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-700" />
            </div>
          </div>
        </button>
      </form>
    </div>
  );
}
