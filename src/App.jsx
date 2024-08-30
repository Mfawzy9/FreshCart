import { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import {
  UserContext,
  UserContextProvider,
} from "./Context/UserContext/UserContext";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext/CartContext";
import CheckOut from "./components/CheckOut/CheckOut";
import Orders from "./components/Orders/Orders";
import WishList from "./components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext/WishListContext";
import { ToastContainer } from "react-toastify";
import Order from "./components/Order/Order";
import OrdersContextProvider from "./Context/OrdersContext/OrdersContext";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { ChakraProvider } from "@chakra-ui/react";
import UserSettings from "./components/UserSettings/UserSettings";
import AddAddress from "./components/AddAddress/AddAddress";
import SaleProducts from "./components/SaleProducts/SaleProducts";
import SectionProducts from "./components/SectionProducts/SectionProducts";
import { motion } from "framer-motion";
import { Offline } from "react-detect-offline";
import { BiNoSignal } from "react-icons/bi";
import PagesAnimation from "./components/PagesAnimation/PagesAnimation";
import PagesAni2 from "./components/PagesAni2/PagesAni2";

const query = new QueryClient({});

const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <PagesAnimation>
            <Home />
          </PagesAnimation>
        ),
      },
      {
        path: "/categories",
        element: (
          <PagesAnimation>
            <Categories />
          </PagesAnimation>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PagesAni2>
            <WishList />
          </PagesAni2>
        ),
      },
      {
        path: "/products",
        element: (
          <PagesAnimation>
            <Products />
          </PagesAnimation>
        ),
      },
      {
        path: "/cart",
        element: (
          <PagesAni2>
            <Cart />{" "}
          </PagesAni2>
        ),
      },
      {
        path: "/userSettings",
        element: (
          <PagesAnimation>
            <UserSettings />
          </PagesAnimation>
        ),
      },
      {
        path: `/:name/Products/:sectionId/:section`,
        element: (
          <PagesAnimation>
            <SectionProducts />
          </PagesAnimation>
        ),
      },
      {
        path: "/saleProducts",
        element: (
          <PagesAni2>
            <SaleProducts />{" "}
          </PagesAni2>
        ),
      },
      {
        path: "/addAddress",
        element: (
          <PagesAni2>
            <AddAddress />{" "}
          </PagesAni2>
        ),
      },
      {
        path: "/checkout/:cartId",
        element: (
          <PagesAni2>
            <CheckOut />{" "}
          </PagesAni2>
        ),
      },
      {
        path: "/allorders",
        element: (
          <PagesAni2>
            <Orders />
          </PagesAni2>
        ),
      },
      {
        path: "/order/:orderId",
        element: (
          <PagesAnimation>
            <Order />{" "}
          </PagesAnimation>
        ),
      },
      {
        path: "/brands",
        element: (
          <PagesAnimation>
            <Brands />{" "}
          </PagesAnimation>
        ),
      },
      {
        path: "/productDetails/:id/:category",
        element: (
          <PagesAnimation>
            <ProductDetails />{" "}
          </PagesAnimation>
        ),
      },
      {
        path: "*",
        element: (
          <PagesAni2>
            <NotFound />{" "}
          </PagesAni2>
        ),
      },
    ],
  },
]);

const unauthRoutes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/signup",
        element: (
          <PagesAni2>
            {" "}
            <SignUp />
          </PagesAni2>
        ),
      },
      {
        path: "/login",
        element: (
          <PagesAnimation>
            <Login />{" "}
          </PagesAnimation>
        ),
      },
      {
        path: "/forgotPassword",
        element: (
          <PagesAni2>
            {" "}
            <ForgotPassword />
          </PagesAni2>
        ),
      },
      { path: "*", element: <Navigate to={"/login"} /> },
      { path: "", element: <Navigate to={"/login"} /> },
    ],
  },
]);

function RouteHandler() {
  const { userLogin } = useContext(UserContext);
  if (userLogin === undefined) {
    return <></>;
  }
  return <RouterProvider router={userLogin ? authRoutes : unauthRoutes} />;
}

function App() {
  return (
    <>
      <ChakraProvider>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <WishListContextProvider>
              <CartContextProvider>
                <OrdersContextProvider>
                  <RouteHandler />

                  <ToastContainer />
                  <Offline>
                    <motion.div
                      className="flex items-center gap-2 rounded-lg fixed bottom-5 left-5 text-white bg-black dark:bg-gray-100 dark:text-black font-bold z-50 p-5"
                      initial={{ y: "100%" }}
                      animate={{ y: "0" }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <BiNoSignal className="text-2xl animate-pulse" /> No
                      internet connection
                    </motion.div>
                  </Offline>
                </OrdersContextProvider>
              </CartContextProvider>
            </WishListContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
