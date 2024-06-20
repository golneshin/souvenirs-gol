import { STARS } from "../assets/SVGs"

const Rating = ({ value, rate }) => {
  const RATES = [
    [1, 0.5],
    [2, 1.5],
    [3, 2.5],
    [4, 3.5],
    [5, 4.5]
  ]

  return (
    <div className="flex items-center mt-2.5 mb-5">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {RATES.map((r, index) => 
          <div key={index}>
            {value >= r[0] ? STARS.FULL : value >= r[1] ? STARS.HALF : STARS.EMPTY}
          </div>
        )}
      </div>
      <span 
        className="
          text-xs 
          bg-blue-100 
          text-blue-800 
          dark:bg-blue-200 
          dark:text-blue-800 
          font-semibold 
          px-2.5 py-0.5 
          rounded 
          ms-3
          ">
        {rate}
      </span>
    </div>
  )
}

export default Rating
