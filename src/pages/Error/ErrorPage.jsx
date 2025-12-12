import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Icon */}
      <FaExclamationTriangle className="text-red-500 text-7xl mb-5 animate-bounce" />

      {/* Title */}
      <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-md">
        404
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 mt-3 text-center max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Back to Home
      </Link>

      {/* Decorative Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39 56.44C161.25 77.22 0 0 0 0v120h1200V0s-61.87 32.73-140.16 40.39c-78.29 7.67-147.56-3.11-256.36 5.39-108.8 8.5-194.12 48.5-305.25 50.78-111.13 2.28-177.93-24.92-276.84-39.72z"
            className="fill-blue-600"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ErrorPage;
