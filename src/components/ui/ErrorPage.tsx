import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 active:scale-95"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;