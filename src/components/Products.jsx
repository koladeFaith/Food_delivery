import React from "react";
import product2 from "../images/imgi_2_burger-CybveqoP.jpg";
import product3 from "../images/imgi_3_salad-DtQo6JXa.jpg";
import product4 from "../images/imgi_4_pizza-D_mYsoi4.jpg";
import Product from "./Product";
import { useCart } from "./useCart";
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
const Products = ({ activeTab, query }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const filteredProducts = productData.filter((product) => {
    const matchesTab =
      activeTab === "all" ? true : product.category === activeTab;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesTab && matchesSearch;
  });
  return (
    <>
      <div className="overflow-hidden cursor-pointer">
        <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-10 lg:mx-30 overflow-hidden">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product
                key={product.name}
                productImg={product.productImg}
                name={product.name}
                description={product.description}
                price={product.price}
                soldOut={product.soldOut}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cartItem={cart.find((item) => item.name === product.name)}
              />
            ))
          ) : (
            <p className="col-span-full text-center  mt-[100px] py-6 bg-gray-100 shadow-xl text-gray-500">
              No products found
            </p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Products;
