import { Link } from 'react-router-dom';
import '../css/Body.css';
import React, { useEffect, useRef, useState } from 'react';
import getApiProduct from '../api/ProductAPI';
import { useNavigate } from 'react-router-dom';

const colorId = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'black',
  5: 'white',
  6: 'pink'
};

const filterId = {
  1: 'DRESS',
  2: 'PAN',
  3: 'SHIRT'
};

function Body({ setGuest }) {
  const isAuth = JSON.parse(localStorage.getItem('auth'));
  const [paginate, setPaginate] = useState({ page: 1, filter: null });
  const [dataProduct, setDataProduct] = useState({ total: null, results: [] });

  const navi = useNavigate();
  useEffect(() => {
    if (isAuth) {
      if (isAuth.roleID === 1) {
        setGuest(false);
        navi('/admin');
      }
      if (isAuth.roleID === 2) {
        setGuest(false);
        navi('/admin');
      }
      if (isAuth.roleID === 3) {
        setGuest(true);
      }
    }
    setGuest(true);
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const data = await getApiProduct.getProductByPage(paginate.page, paginate.filter);
      setDataProduct(data);
    };
    getProduct();
  }, [paginate]);

  const handlePrev = () => {
    if (paginate.page === 1) return;
    setPaginate({
      page: paginate.page - 1,
      filter: paginate.filter
    });
  };

  const hasMore = Math.floor(dataProduct.total / 6) + 1 !== paginate.page;
  const handleNext = () => {
    if (!hasMore) return;
    setPaginate({
      page: paginate.page + 1,
      filter: paginate.filter
    });
  };

  // const handleFilter = (key) => {

  // };

  // useEffect(() => {
  //   let search = localStorage.getItem("search");
  //   if (!search) {
  //     let page = JSON.parse(localStorage.getItem("page"));
  //     console.log(page);
  //     if (page === null) {
  //       page = 1;
  //     }
  //     const getProduct = async () => {
  //       const data = await getApiProduct.getProductByPage(page);
  //       setDataProduct(data.results);
  //     };
  //     getProduct();
  //   }
  // }, []);
  // const btn1 = useRef(1);
  // const btn2 = useRef(2);
  // const btn3 = useRef(3);
  // async function hanldClickBtn(opt) {
  //   if (Number(opt) === 1) {
  //     localStorage.setItem("page", opt);
  //     return;
  //   }
  //   localStorage.setItem("page", opt);
  //   btn1.current.innerHTML = Number(opt) - 1;
  //   btn2.current.innerHTML = Number(opt);
  //   btn3.current.innerHTML = Number(opt) + 1;
  // }
  // async function page1() {
  //   localStorage.removeItem("page");
  //   setDataProduct(await getApiProduct.getProductByPage(1));
  // }
  // useEffect(() => {
  //   const search = localStorage.getItem("search");
  //   if (search) {
  //     const searchProduct = async () => {
  //       localStorage.removeItem("search");
  //       setDataProduct(await getApiProduct.searchProduct(search));
  //     };
  //     searchProduct();
  //   }
  // }, []);
  //

  return (
    <div className="main">
      <div className="container">
        <div className="main-column">
          <div className="row row-1"></div>
          <div className="row row-2">
            <div className="product-category">
              <div className="title-category">category</div>
              <div className="category-opt">
                <div className="item-category hoverCategory" onClick={() => setPaginate({ page: 1, filter: 1 })}>
                  Dress
                </div>
                <div className="item-category hoverCategory" onClick={() => setPaginate({ page: 1, filter: 2 })}>
                  Pan
                </div>
                <div className="item-category hoverCategory" onClick={() => setPaginate({ page: 1, filter: 3 })}>
                  Shirt
                </div>
              </div>
            </div>
            <div className="product-list">
              <div className="title-product">
                {paginate.filter ? filterId[paginate.filter] : 'Tất cả sản phẩm'} ({dataProduct.total} sp)
              </div>
              <div className="product-list-container">
                {dataProduct?.results.map(x => {
                  return (
                    <a
                      href={`product-item`}
                      key={x.productId}
                      onClick={() => {
                        localStorage.setItem('productId', x.productId);
                      }}
                    >
                      <ProductItem item={x} />
                    </a>
                  );
                })}
              </div>
              <div className="next-product-list">
                <div className={`next-btn paginate-btn ${paginate.page === 1 && 'paginate-not-al opacity-5'}`} onClick={handlePrev}>
                  <svg className="svg-icon" viewBox="0 0 20 20">
                    <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>
                  </svg>
                </div>
                <div className="next-btn paginate-not-al">{paginate.page}</div>
                <div className={`next-btn paginate-btn ${!hasMore && 'paginate-not-al opacity-5'}`} onClick={handleNext}>
                  <svg className="svg-icon" viewBox="0 0 20 20">
                    <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
                  </svg>
                </div>
                {/* <a href="/">
                  <div
                    // ref={btn1}
                    onClick={() => {
                      // hanldClickBtn(btn1.current.innerHTML);
                    }}
                    className="next-btn"
                  >
                    {localStorage.getItem("page")
                      ? Number(localStorage.getItem("page")) === 1
                        ? 1
                        : Number(localStorage.getItem("page")) - 1
                      : 1}
                  </div>
                </a>
                <a href="/">
                  <div
                    // ref={btn2}
                    onClick={() => {
                      // hanldClickBtn(btn2.current.innerHTML);
                    }}
                    className="next-btn"
                  >
                    {localStorage.getItem("page")
                      ? Number(localStorage.getItem("page")) === 1
                        ? 2
                        : Number(localStorage.getItem("page"))
                      : 2}
                  </div>
                </a>{" "}
                <a href="/">
                  <div
                    // ref={btn3}
                    onClick={() => {
                      // hanldClickBtn(btn3.current.innerHTML);
                    }}
                    className="next-btn"
                  >
                    {localStorage.getItem("page")
                      ? Number(localStorage.getItem("page")) === 1
                        ? 3
                        : Number(localStorage.getItem("page")) + 1
                      : 3}
                  </div>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductItem({ item, key }) {
  let price = item.shellPrice + '';
  let resultPrice = '';
  let counter = 0;
  for (let i = price.length - 1; i >= 0; i--) {
    if (counter === 3) {
      resultPrice += '.';
      counter = 0;
    }
    resultPrice += price[i];
    counter++;
  }
  let color = item.colorId;
  resultPrice = resultPrice.split('').reverse().join('');
  const thisProduct = useRef(0);
  useEffect(() => {
    thisProduct.current.onmouseover = () => {
      thisProduct.current.childNodes[0].src = 'data:image/jpeg;base64,' + item.productImgs[1].productImg;
    };
    thisProduct.current.onmouseout = () => {
      thisProduct.current.childNodes[0].src = 'data:image/jpeg;base64,' + item.productImgs[0].productImg;
    };
  }, []);
  return (
    <>
      <div className="product-item-container" ref={thisProduct} id={item.productId}>
        <img className="product-image" src={'data:image/jpeg;base64,' + item.productImgs[0]?.productImg} alt=""></img> <span className="product-price">{resultPrice + 'đ'}</span>
        <br></br>
        <p className="product-detail-name">{item.productName}</p>
        <div
          className={
            `product-color ${colorId[color]}`
            // color === 1
            //   ? "product-color red"
            //   : color === 2
            //   ? "product-color blue"
            //   : color === 3
            //   ? "product-color green"
            //   : color === 4
            //   ? "product-color black"
            //   : color === 5
            //   ? "product-color white"
            //   : "product-color pink"
          }
        ></div>
      </div>
    </>
  );
}

export default Body;
