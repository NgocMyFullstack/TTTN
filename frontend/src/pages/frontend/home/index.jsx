import React from "react";
import Menu from "./Menu";
import Slides from "./Slides";
import ProductNew from "./ProductNew";
import LastPost from "./LastPost";
import ProductSale from "./ProductSale";
import ProductHotBuy from "./ProductHotBuy";
import ProductByCategory from "./ProductByCategory";
export default function Home() {
  return (
    <>
      <Menu />
      <Slides />
      <section className="hdl-maincontent">
        <div className="container" style={{ marginTop: 20 }}>
          <ProductHotBuy />
          <ProductNew />
          {/* <ProductSale />
          <ProductByCategory /> */}
        </div>
      </section>
      <LastPost></LastPost>
    </>
  );
}
