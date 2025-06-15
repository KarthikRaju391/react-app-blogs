import React from 'react';

export const BlogCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 mt-5 p-5 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="w-3/4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
    </div>
  </div>
);

export const BlogListSkeleton = ({ count = 5 }) => (
  <div className="blog-lists">
    <div className="flex justify-between items-center mb-6">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <BlogCardSkeleton key={index} />
    ))}
  </div>
);

export const BlogContentSkeleton = () => (
  <div className="col-span-3 w-full md:w-3/4 lg:w-1/2 mx-auto mt-11 animate-pulse">
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
    <div className="flex items-center mb-4">
      <div className="w-1 h-5 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
    </div>
    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      ))}
    </div>
  </div>
);