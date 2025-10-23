import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useCart } from "./useCart";

const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-100 rounded-2xl p-4 shadow-sm">
    <div className="h-48 bg-gray-300 rounded-xl mb-4 "></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 "></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4 "></div>
    <div className="h-8 bg-gray-300 rounded"></div>
  </div>
);

const Products = ({ activeTab, query }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
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
      <div className="flex flex-col items-center mt-[20px]">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500  border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-gray-500 mb-6">Loading products...</p>

        {/* Skeleton grid */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-10 lg:mx-90 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} className=''/>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-hidden cursor-pointer">
      <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-10 lg:mx-30 overflow-hidden">
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
