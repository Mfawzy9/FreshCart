import * as fontAwesome from "react-icons/fa"; //fontawesome icons

export default function RatingStars({ rating }) {
  return (
    <>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((rate) => {
          return (
            <fontAwesome.FaStar
              key={rate}
              className={rating >= rate ? " text-yellow-400" : " text-gray-400"}
            />
          );
        })}

        <span className=" py-1 px-2 text-sm rounded bg-blue-300 dark:bg-blue-700/20 flex items-center">
          {rating}
        </span>
      </div>
    </>
  );
}
