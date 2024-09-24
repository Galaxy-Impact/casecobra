import React, { FC } from "react";

interface ErrorProps {
  title?: string;
  message?: string;
}

const Error: FC<ErrorProps> = ({
  title = " Something went wrong!",
  message = "We are looking to fix it. Please try again in few minutes.",
}) => {
  return (
    <div className="flex py-20 flex-col justify-center items-center gap-2">
      <h1 className="text-xl font-medium text-gray-800">{title}</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default Error;
