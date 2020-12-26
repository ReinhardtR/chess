import React from "react";
import { ReactComponent as CrossIcon } from "../assets/cross.svg";

export default function Modal({
  errorStyle,
  title,
  handleClick,
  children,
  visible,
}) {
  return (
    visible && (
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={handleClick}
            ></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={`${
              errorStyle ? "border-tertiary" : "border-primary"
            } inline-block bg-white border-2 rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle w-auto p-4`}
          >
            <span className="flex absolute h-4 w-4 top-0 right-0 -mt-1 -mr-1">
              <span
                className={`${
                  errorStyle ? "bg-tertiary" : "bg-primary-gradient"
                } animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`}
              ></span>
              <span
                className={`${
                  errorStyle ? "bg-tertiary" : "bg-primary-gradient"
                } relative inline-flex rounded-full h-4 w-4`}
              ></span>
            </span>
            <div className="text-left flex justify-center items-center">
              {handleClick && (
                <CrossIcon
                  onClick={handleClick}
                  className="text-neutral hover:text-secondary cursor-pointer absolute right-4 top-4 w-4 h-4 fill-current"
                />
              )}

              <div className="text-secondary text-3xl font-bold my-1">
                <div className="text-center">{title}</div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
