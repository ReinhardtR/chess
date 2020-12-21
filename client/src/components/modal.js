import React from "react";

export default function Modal({ children, visible }) {
  return (
    visible && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block bg-white border-2 border-blue-500 rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle w-auto p-4">
            <span className="flex absolute h-4 w-4 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></span>
            </span>
            <div className="flex justify-center items-center space-x-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
