import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse delay-200"></div>
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse delay-400"></div>
        <span className="ml-3 text-gray-700 font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;

export const Skeleton = ({ width = "unset", length = 3 }) => {
  const skeletions = Array.from({ length }, (_, idx) => (
    <div
      key={idx}
      className="h-8 w-full bg-gray-300 mb-2.5 rounded animate-skeleton-loading"
    ></div>
  ));

  return (
    <div className="flex flex-col mt-6" style={{ width }}>
      {skeletions}
    </div>
  );
};
