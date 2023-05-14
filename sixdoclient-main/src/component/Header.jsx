import "../css/Header.css";
import { IoIosSearch } from "react-icons/io";
import { BsCartCheck } from "react-icons/bs";
import { React, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getApiProduct from "../api/ProductAPI";
function Header({ setGuest, changeHideLogin, isLoginInstance, handleLogin }) {
  const isAuth = JSON.parse(localStorage.getItem("auth"));
  const navi = useNavigate();
  useEffect(() => {
    if (isAuth) {
      if (isAuth.roleID === 1 || isAuth.roleID === 2) {
        setGuest(false);
        navi("/admin");
      }
    }
  }, []);
  return (
    <div className="header">
      <div className="app-header">
        <HeaderLeft />
        <HeaderRight changeHideLogin={changeHideLogin} isLoginInstance={isLoginInstance} handleLogin={handleLogin} />
      </div>
    </div>
  );
}

function HeaderLeft() {
  return (
    <>
      <div className="app-header-left float-left">
        <a href={"/"}>
          <img className="shop-logo" id="logo-header" src={require("../resour/logo.png")} alt="" />
        </a>
      </div>
    </>
  );
}
function HeaderRight({ changeHideLogin, isLoginInstance, handleLogin }) {
  const [searchList, setSearchList] = useState([]);
  const navigate = useNavigate();

  function removeAuth() {
    localStorage.removeItem("auth");
    handleLogin(false);
  }

  const inputChange = (value) => {
    if (value.length === 0) return setSearchList([]);
    const getProduct = async (value) => {
      const data = await getApiProduct.searchProduct(value);
      setSearchList(data);
    };
    getProduct(value);
  };

  const searchContent = useRef(undefined);
  const handleClickSearch = (item) => {
    localStorage.setItem("productId", item.productId);
    setSearchList([]);
    searchContent.current.value = "";
    navigate("product-item");
  };

  return (
    <>
      <div className="app-header-right float-left">
        <div className="web-option">
          <div className="header-webOpt">
            <div className="header-goForm loGin-after hoverCommon">
              {isLoginInstance ? (
                <LoginAccessed removeAuth={removeAuth} />
              ) : (
                <Login changeHideLogin={changeHideLogin} />
              )}
            </div>
            <div className="header-goForm afterRight-1px header-fb">
              <span>Team TT3</span>
            </div>
          </div>
        </div>
        <div className="navigator-header">
          <div className="input-search">
            <input
              ref={searchContent}
              type="text"
              name="name"
              className="question"
              id="nme"
              onChange={(e) => inputChange(e.target.value.trim())}
              required
              // autoComplete="off"
            />
            <label htmlFor="nme">
              <span>Bạn đang tìm gì?</span>
            </label>
          </div>
          <div>
            <div className={`list-search ${searchList.length === 0 && "display-none"}`}>
              {searchList.map((item) => {
                return (
                  <div key={item.productId} className="list-search-item" onClick={() => handleClickSearch(item)}>
                    <p>{item.productName}</p>
                  </div>
                );
              })}
            </div>
            {/* {searchList.map((item) => (
              <div>{item.productName}</div>
            ))} */}
          </div>
          {/* <a href="/"> */}
          {/* <IoIosSearch
            // onClick={() => {
            //   const search = searchContent.current.value.trim();
            //   if (search.length > 0) {
            //     localStorage.setItem("search", searchContent.current.value.trim());
            //   }
            // }}
            className="search-icon" */
          /* /> */}
          {/* </a> */}
          <a href="/account-bag">
            <BsCartCheck
              onClick={() => {
                localStorage.removeItem("page");
              }}
              className="bag-home"
            />
          </a>
          <div className="total-bag">
            <span>{localStorage.getItem("totalbag")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
function Login({ changeHideLogin }) {
  return <span onClick={() => changeHideLogin()}>Login</span>;
}
function LoginAccessed({ removeAuth }) {
  const account = JSON.parse(localStorage.getItem("auth"));

  const accountNavs = useRef(0);
  function handleAccountNav(opt) {
    if (opt === 1) {
      accountNavs.current.classList.add("active");
    }
    if (opt === 2) {
      accountNavs.current.classList.remove("active");
    }
  }
  return (
    <>
      <span
        className="account-accsessed"
        onMouseOver={function () {
          handleAccountNav(1);
        }}
        onMouseLeave={function () {
          handleAccountNav(2);
        }}
      >
        {account.name}
        <div className="account-navs" ref={accountNavs}>
          <a href="my-order" className="account-nav order">
            Đơn Hàng
          </a>
          <a href="my-profile" className="account-nav account">
            Tài Khoản
          </a>
          <a href="/" className="account-nav account">
            <div
              onClick={function () {
                removeAuth();
              }}
              className="account-nav logout"
            >
              Đăng xuất
            </div>
          </a>
        </div>
      </span>
    </>
  );
}
export default Header;
