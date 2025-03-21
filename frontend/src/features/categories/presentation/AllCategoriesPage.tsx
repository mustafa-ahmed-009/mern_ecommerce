import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { CategoriesService } from "../../admin/data/services/CategoriesService";
import LoadingSpinner from "../../../utils/components/LoadingSpinner";
import ErrorMessage from "../../../utils/components/ErroMessage";
import CustomReactPaginate from "../../../utils/components/CustomReactPaginate";
import CategiesPageitems from "./components/CategiesPageitems";

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesList, loading, error, paginationData } = useSelector(
    (state: RootState) => state.categories
  );
  const categoryPageLimit = 5;
  useEffect(() => {
    dispatch(
      CategoriesService.fetchAllCategories({
        page: 1, // Fetch the first page initially
        limit: categoryPageLimit,
      })
    );
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    dispatch(
      CategoriesService.fetchAllCategories({
        page: selectedItem.selected + 1, // Convert to one-based index
        limit: categoryPageLimit,
      })
    );
  };

  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <CategiesPageitems categories={categoriesList} />
      <CustomReactPaginate
        pageCount={paginationData.numberOfPages}
        handlePageClick={handlePageChange}
        currentPage={paginationData.currentPage}
      />
    </div>
  );
};

export default CategoriesPage;
