import { BUTTONS } from "../assets/SVGs";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-2">
      {/* Previous button */}
      {currentPage > 1 && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {/* Page numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            number === currentPage ? "bg-blue-700" : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {/* Next button */}
      {currentPage < totalPages && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onPageChange(currentPage + 1)}
        >
          {BUTTONS.ARROW_RIGHT}
        </button>
      )}
    </div>
  );
};

export default Pagination;
