import React, { useEffect } from "react";
import CategoryItem from "../../home/presentation/components/categories/HomeViewCategoriesContainerItem";
import CategiesPageitems from "./components/CategiesPageitems";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, AppStore, RootState } from "../../../redux/store";
import { CategoriesService } from "../../home/data/services/CategoriesService";
import LoadingSpinner from "../../../utils/components/LoadingSpinner";
import ErrorMessage from "../../../utils/components/ErroMessage";

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesList, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(CategoriesService.fetchAllCategories());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />; // Display a loading spinner while data is being fetched
  }

  if (error) {
    return <ErrorMessage message={error} />; // Display an error message if there's an error
  }

  return (
    <div className="flex flex-col justify-between items-center gap-4">
      <CategiesPageitems categories={categoriesList} />
      <div className="join">
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="2"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="3"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="4"
        />
      </div>
    </div>
  );
};

export default CategoriesPage;