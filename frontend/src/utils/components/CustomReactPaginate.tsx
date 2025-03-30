import ReactPaginate from "react-paginate";

interface CustomReactPaginateProps {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
  currentPage: number; // Add currentPage
}

const CustomReactPaginate: React.FC<CustomReactPaginateProps> = ({
  pageCount,
  handlePageClick,
  currentPage, // Add currentPage
}) => {
  return (
    <ReactPaginate
      previousLabel={<span className="text-lg">«</span>}
      nextLabel={<span className="text-lg">»</span>}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName="flex space-x-1"
      pageClassName="block border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded"
      pageLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700"
      previousClassName="block border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded"
      previousLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700"
      nextClassName="block border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded"
      nextLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700"
      breakClassName="flex items-center justify-center w-10 h-10 text-gray-700"
      activeClassName="bg-blue-600 text-white border-blue-600"
      forcePage={currentPage - 1} // ReactPaginate uses zero-based index
    />
  );
};

export default CustomReactPaginate;
