import React from "react";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/";
import ErrorBlock from "../components/ErrorBlock/";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/Slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const onClickCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortType,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true }
      );
      navigate(queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, [dispatch]);

  const fetchData = React.useCallback(async () => {
    const categoryParam = categoryId > 0 ? `category=${categoryId}` : "";
    const sortParam = sortType.replace("-", "");
    const orderParam = sortType.includes("-") ? "desc" : "asc";
    const search = searchValue ? `${searchValue}` : "";
    dispatch(
      //@ts-ignore
      fetchPizzas({
        categoryParam,
        sortParam,
        orderParam,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <ErrorBlock />
      ) : (
        <div className="content__items">
          {status !== "success" ? skeleton : pizzas}
        </div>
      )}
      <Pagination onChangePage={onChangePage} />
    </>
  );
};

export default Home;