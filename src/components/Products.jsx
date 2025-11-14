import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useCart } from "./useCart";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ activeTab, query }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://food-delivery-backend-do2h.onrender.com/api/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter by tab and search query
  const filteredProducts = products.filter((product) => {
    const matchesTab =
      activeTab === "all" ? true : product.category === activeTab;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        {/* Skeleton grid */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-10 lg:mx-90 w-[85%] mt-[20px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} className="" />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-hidden cursor-pointer mt-[20px]">
      <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-10 lg:mx-30 overflow-hidden w-[85%]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product
              key={product._id}
              productImg={product.image}
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
          <p className="col-span-full text-center mt-[100px] py-6 bg-gray-100 shadow-xl text-gray-500">
            No products found
          </p>
        )}
      </ul>
    </div>
  );
};

export default Products;
