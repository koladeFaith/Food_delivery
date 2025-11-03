import React from "react";

const ProductSkeleton = () => {
  return (
    <li className="my-5 border border-[#e9e8e7] bg-[#fbfbfa] rounded-xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="max-w-lg max-h-lg overflow-hidden">
        <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>
      </div>

      {/* Content placeholder */}
      <div className="mx-4 py-4">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>

        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-8"></div>
        </div>
      </div>
    </li>
  );
};

export default ProductSkeleton;
