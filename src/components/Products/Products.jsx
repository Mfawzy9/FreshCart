import React, { useEffect, useState } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import MainLoading from "../MainLoading/MainLoading";
import ProductCard from "../ProductCard/ProductCard";
import useAddDeleteCart from "../../Hooks/AddDeleteCart/useAddDeleteCart";
import Title from "../Title/Title";
import useAllProducts from "../../Hooks/AllProducts/useAllProducts";
import { Pagination } from "flowbite-react";
import { Helmet } from "react-helmet";

export default function Products() {
  const { data, isLoading } = useAllProducts();
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setOriginalProducts(data);
      setAllProducts(data);
    }
  }, [data]);

  const { deleteItem, addProduct, currentId, loading } = useAddDeleteCart();

  const cardsPerPage = 12;
  const [showPagination, setShowPagination] = useState(true);
  const [pagintaion, setPagintaion] = useState({
    from: 0,
    to: cardsPerPage,
  });
  const [currentPage, setCurrentPage] = useState(1);

  function handlePagintaion(page) {
    const from = (page - 1) * cardsPerPage;
    const to = page * cardsPerPage;
    setPagintaion({ ...pagintaion, from, to });
    setCurrentPage(page);
  }

  function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setAllProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.brand.name.toLowerCase().includes(searchTerm)
        );
      });
      setAllProducts(filteredProducts);
    }
  }

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="container py-24 min-h-screen">
        <Title title={"All Products"} my={"mt-8"} mx={"mx-auto"} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex items-center max-w-sm mx-auto my-8"
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <fontAwesome.FaSearch />
            </div>
            <input
              onFocus={() => setShowPagination(false)}
              onBlur={(e) =>
                e.target.value.length > 0
                  ? setShowPagination(false)
                  : setShowPagination(true)
              }
              onInput={(e) => {
                e.target.value == ""
                  ? setShowPagination(true)
                  : setShowPagination(false);
                setCurrentPage(1);
                setPagintaion({ from: 0, to: cardsPerPage });
              }}
              onChange={(e) => handleSearch(e)}
              type="search"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search By Brand Or Product Name..."
              required
            />
          </div>
        </form>
        <div className="grid sm:grid-cols-2 min-h-full md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {allProducts
            ?.slice(pagintaion?.from, pagintaion?.to)
            ?.map((product) => {
              return (
                <ProductCard
                  product={product}
                  key={product?.id}
                  loading={loading}
                  currentId={currentId}
                  deleteItem={deleteItem}
                  addProduct={addProduct}
                />
              );
            })}
        </div>
        {showPagination && (
          <div className="flex overflow-x-auto sm:justify-center mt-3">
            <Pagination
              onClick={() => scrollTo(0, 150)}
              color="primary"
              currentPage={currentPage}
              totalPages={Math.ceil(allProducts?.length / cardsPerPage)} // count
              onPageChange={handlePagintaion}
              showIcons
            />
          </div>
        )}
      </div>
    </>
  );
}
