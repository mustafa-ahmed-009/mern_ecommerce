import React, { useEffect } from "react";
import CategoryItem from "./HomeViewCategoriesContainerItem";
import TitleAndButton from "../../../../../utils/components/TitleAndButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { CategoriesService } from "../../../../admin/data/services/CategoriesService";
import LoadingSpinner from "../../../../../utils/components/LoadingSpinner";
import ErrorMessage from "../../../../../utils/components/ErroMessage";

const HomeViewCategoriesContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    dispatch(CategoriesService.fetchAllCategories({}));
  }, []);
  if (state.loading) {
    return <LoadingSpinner />;
  }
  if (state.error) {
    return <ErrorMessage message={state.error} />;
  }
  return (
    <div className="mt-2">
      <TitleAndButton title="التصنيفات" pathName="/allcategories" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
        {state.categoriesList.slice(0, 5).map((category) => {
          return <CategoryItem category={category} />;
        })}
      </div>
    </div>
  );
};

export default HomeViewCategoriesContainer;
