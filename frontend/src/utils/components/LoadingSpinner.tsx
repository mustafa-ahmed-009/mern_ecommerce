import React from "react";

interface LoadingSpinnerProps {
  size?: number; // Optional size parameter (default: 32)
  color?: string; // Optional color parameter (default: black)
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 32,
  color = "black",
}) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-b-2"
        style={{ width: size, height: size, borderColor: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
