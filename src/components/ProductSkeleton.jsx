import React from "react";

const ProductSkeleton = () => {
  return (
    <li className="my-5 overflow-hidden border border-[#e9e8e7] bg-[#fbfbfa] rounded-xl">
      {/* Image placeholder */}
      <div className="relative w-full h-52 bg-gray-200 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>

      <div className="mx-4 py-4">
        {/* Title line */}
        <div className="relative h-4 bg-gray-200 rounded w-3/4 mb-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
        </div>

        {/* Description lines */}
        <div className="relative h-3 bg-gray-200 rounded w-full mb-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
        </div>
        <div className="relative h-3 bg-gray-200 rounded w-2/3 mb-5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
        </div>

        {/* Price & Button row */}
        <div className="flex justify-between items-center mt-2">
          <div className="relative h-5 bg-gray-200 rounded w-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
          </div>

          <div className="relative h-8 bg-gray-200 rounded w-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductSkeleton;
