import React from "react";
import product2 from "../images/imgi_2_burger-CybveqoP.jpg";
import product3 from "../images/imgi_3_salad-DtQo6JXa.jpg";
import product4 from "../images/imgi_4_pizza-D_mYsoi4.jpg";
import Product from "./Product";
const productData = [
  {
    productImg: product2,
    name: "Classic Burger",
    description:
      "Juicy beef patty with fresh lettuce, tomato, cheese, and our special sauce",
    price: 9.99,
    soldOut: false,
    category: "main",
  },
  {
    productImg: product2,
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce with grilled chicken, croutons, and parmesan cheese",
    price: 12.99,
    soldOut: false,
    category: "main",
  },
  {
    productImg: product3,
    name: "Margherita Pizza",
    description:
      "Fresh mozzarella, tomato sauce, and basil on our hand-tossed dough",
    price: 14.99,
    soldOut: false,
    category: "main",
  },
  {
    productImg: product4,
    name: "Bacon Cheeseburger",
    description:
      "Double beef patty with crispy bacon, cheddar cheese, and barbecue sauce",
    price: 15.99,
    soldOut: false,
    category: "main",
  },
  {
    productImg: product4,
    name: "Bacon Cheeseburgerss",
    description:
      "Double beef patty with crispy bacon, cheddar cheese, and barbecue sauce",
    price: 15.99,
    soldOut: false,
    category: "salad",
  },
  {
    productImg: product4,
    name: "Bacon Cheeseburgerrr",
    description:
      "Double beef patty with crispy bacon, cheddar cheese, and barbecue sauce",
    price: 15.99,
    soldOut: false,
    category: "salad",
  },
];
const Products = ({ activeTab }) => {
  return (
    <>
      <div className="overflow-hidden cursor-pointer">
        <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-25 overflow-hidden">
          {activeTab === "all" &&
            productData.map((product) => (
              <Product
                key={product.name}
                productImg={product.productImg}
                name={product.name}
                description={product.description}
                price={product.price}
                soldOut={product.soldOut}
              />
            ))}
          {activeTab === "main" &&
            productData
              .filter((product) => product.category === "main")
              .map((product) => (
                <Product
                  key={product.name}
                  productImg={product.productImg}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  soldOut={product.soldOut}
                />
              ))}
          {activeTab === "salad" &&
            productData
              .filter((product) => product.category === "salad")
              .map((product) => (
                <Product
                  key={product.name}
                  productImg={product.productImg}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  soldOut={product.soldOut}
                />
              ))}
        </ul>
        ;
      </div>
    </>
  );
};

export default Products;
