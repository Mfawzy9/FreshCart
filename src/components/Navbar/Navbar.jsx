import React, { useContext } from "react";
import * as fontAwesome from "react-icons/fa"; //fontawesome icons
import Logo from "../../assets/logo.png";
import { Dropdown, Navbar, Tooltip } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { CartContext } from "../../Context/CartContext/CartContext.jsx";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { WishListContext } from "../../Context/WishListContext/WishListContext.jsx";
import { OrdersContext } from "../../Context/OrdersContext/OrdersContext.jsx";

export default function NavBar() {
  const navigate = useNavigate();

  // Authentication
  const {
    userLogin,
    setUserLogin,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    toggleDarkMode,
    isDarkMode,
  } = useContext(UserContext);

  //  Cart
  const { productsCount } = useContext(CartContext);
  //wishlist
  const { wishListCount } = useContext(WishListContext);
  //orders
  const { ordersCount } = useContext(OrdersContext);

  function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserLogin(null);
    setUserName(null);
    setUserEmail(null);
    navigate("/");
  }

  return (
    <>
      <Navbar
        rounded
        className="fixed p-5 top-0 left-0 right-0 z-40 px-0 sm:px-2 shadow-lg shadow-blue-700/30"
      >
        <Link to="/" className="flex items-center mr-1 sm:mr-3">
          <img src={Logo} className="mr-2 h-6 sm:h-9" alt="App Logo" />
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            Fresh Cart
          </span>
        </Link>

        <div className="flex md:order-2 items-center">
          <Dropdown
            arrowIcon={false}
            inline
            className="rounded-lg"
            label={
              <>
                {userLogin ? (
                  <span className="ms-1 w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center font-bold text-xl text-white">
                    {userName.charAt(0)}
                  </span>
                ) : (
                  <fontAwesome.FaUserCircle className="text-4xl rounded-full ms-1 outline outline-transparent hover:outline-gray-500" />
                )}
              </>
            }
          >
            {userLogin != null && (
              <>
                <Dropdown.Header className="flex flex-col gap-2">
                  <span className="text-sm flex items-center gap-2 font-medium ">
                    <fontAwesome.FaUser /> {userName}
                  </span>
                  <span className="truncate text-sm flex items-center gap-2">
                    <fontAwesome.FaEnvelope /> {userEmail}
                  </span>
                </Dropdown.Header>
                <div className="flex flex-col px-3">
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    className="acc-link flex items-center gap-2 p-2 hover:text-white transition-all duration-300"
                    to="/userSettings"
                  >
                    <fontAwesome.FaUserCog className="text-xl" />
                    My Account
                  </Link>
                </div>
                <Dropdown.Divider />
                <div className="flex flex-col px-3">
                  <span
                    className="cursor-pointer acc-link p-2 hover:text-white transition-all duration-300 flex items-center gap-1 hover:bg-red-800 hover:[box-shadow:0_0_10px_#9b1c1c]"
                    onClick={logOut}
                  >
                    <VscSignOut className="text-xl" />
                    Log Out
                  </span>
                </div>
              </>
            )}
            {userLogin == null && (
              <div className="flex flex-col gap-1 py-1">
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={"/login"}
                  className="flex flex-col px-3"
                >
                  <span className="cursor-pointer acc-link px-4 py-2 hover:text-white transition-all duration-300 flex items-center">
                    <VscSignIn className="text-xl me-2" />
                    Login
                  </span>
                </Link>
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={"/signup"}
                  className="flex flex-col px-3"
                >
                  <span className="cursor-pointer acc-link px-4 py-2 hover:text-white transition-all duration-300 flex items-center hover:bg-green-700 hover:[box-shadow:0_0_10px_#046c4e]">
                    <fontAwesome.FaUserPlus className="[font-size:18px] me-2" />
                    Signup
                  </span>
                </Link>
              </div>
            )}
          </Dropdown>

          <DarkModeSwitch
            style={{ marginBottom: "" }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={25}
            moonColor="black"
            sunColor="white"
            className="mx-2"
          />
          <Navbar.Toggle className="nav-toggler" />
        </div>

        <>
          <Navbar.Collapse className="mr-auto text-center md:text-start navs ">
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/"
              className="nav-link transition-all duration-[0.3s] p-2 lg:px-3 m-1 md:mx-[4px!important] lg:mx-[7px!important] hover:text-white"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/categories"
              className="nav-link transition-all duration-[0.3s] p-2 lg:px-3 m-1 md:mx-[4px!important] lg:mx-[5px!important] hover:text-white"
            >
              Categories
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/products"
              className="nav-link transition-all duration-[0.3s] p-2 lg:px-3 m-1 md:mx-[4px!important] lg:mx-[5px!important] hover:text-white"
            >
              Products
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/brands"
              className="nav-link transition-all duration-[0.3s] p-2 lg:px-3 m-1 md:mx-[4px!important] lg:mx-[5px!important] hover:text-white"
            >
              Brands
            </NavLink>
          </Navbar.Collapse>

          <Navbar.Collapse className="ml-auto mr-1 text-center md:text-start navs ">
            {userLogin != null && (
              <div className="icons flex justify-center self-center gap-4 md:gap-2 ">
                <Tooltip content="Orders" placement="bottom">
                  <NavLink
                    onClick={() => window.scrollTo(0, 0)}
                    to="/allorders"
                    className=" hover:text-white block nav-link relative transition-all duration-[0.3s] p-1 m-1 md:mx-[0px!important] text-2xl"
                  >
                    <fontAwesome.FaLuggageCart />
                    {ordersCount ? (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-2 dark:border-gray-900">
                        {ordersCount}
                      </div>
                    ) : null}
                  </NavLink>
                </Tooltip>
                <Tooltip content="Wishlist" placement="bottom">
                  <NavLink
                    onClick={() => window.scrollTo(0, 0)}
                    to="/wishlist"
                    className=" hover:text-white block nav-link relative transition-all duration-[0.3s] p-1 m-1 md:mx-[0px!important] text-2xl"
                  >
                    <fontAwesome.FaHeart />
                    {wishListCount ? (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3  -end-2 dark:border-gray-900">
                        {wishListCount}
                      </div>
                    ) : null}
                  </NavLink>
                </Tooltip>
                <Tooltip content="Cart" placement="bottom">
                  <NavLink
                    onClick={() => window.scrollTo(0, 0)}
                    to="/cart"
                    className="block hover:text-white nav-link relative transition-all duration-[0.3s] p-1 m-1 md:mx-[0px!important] text-2xl"
                  >
                    <fontAwesome.FaShoppingCart />
                    {productsCount ? (
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3  -end-2 dark:border-gray-900">
                        {productsCount}
                      </div>
                    ) : null}
                  </NavLink>
                </Tooltip>
              </div>
            )}
          </Navbar.Collapse>
        </>
      </Navbar>
    </>
  );
}
